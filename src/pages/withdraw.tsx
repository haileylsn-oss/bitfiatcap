import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUniversity, FaCheckCircle } from "react-icons/fa";
import BottomNav2 from "./bottomnav2";
import { getUsers, updateUser } from "../backend/api";
import log from "../assets/logo.png";

interface WithdrawalForm {
  method: string;
  name: string;
  bank: string;
  accountNumber: string;
  routingNumber: string;
  amount: string;
  note: string;
}

const Withdrawal: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const [withdrawal, setWithdrawal] = useState<WithdrawalForm>({
    method: "",
    name: "",
    bank: "",
    accountNumber: "",
    routingNumber: "",
    amount: "",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [withdrawalSubmitted, setWithdrawalSubmitted] = useState(false);
  const [submittedAmount, setSubmittedAmount] = useState(0);

  // --------------------------------------------------
  // FORMAT MONEY
  // --------------------------------------------------

  const formatAmountForHistory = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // --------------------------------------------------
  // LOAD LOGGED-IN USER
  // --------------------------------------------------

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);
      setUserName(parsedUser.firstName || "User");
      setUserImage(
        parsedUser.profilePicture || "default-avatar.jpg"
      );

      setWithdrawal((prev) => ({
        ...prev,
        name: `${parsedUser.firstName || ""} ${
          parsedUser.lastName || ""
        }`.trim(),
      }));
    } catch (error) {
      console.error("Failed to load logged-in user:", error);
      navigate("/login");
    }
  }, [navigate]);

  // --------------------------------------------------
  // HANDLE INPUT
  // --------------------------------------------------

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setWithdrawal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // HANDLE AMOUNT
  // --------------------------------------------------

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");

    if (parts.length > 2) {
      return;
    }

    if (parts[1]?.length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    setWithdrawal((prev) => ({
      ...prev,
      amount: value,
    }));
  };

  // --------------------------------------------------
  // SUBMIT WITHDRAWAL
  // --------------------------------------------------

  const handleWithdrawal = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const withdrawalAmount = Number(withdrawal.amount);

    if (!withdrawal.method) {
      alert("Please select a withdrawal method.");
      return;
    }

    if (!withdrawal.name.trim()) {
      alert("Please enter the account holder name.");
      return;
    }

    if (!withdrawal.bank.trim()) {
      alert("Please enter the bank name.");
      return;
    }

    if (!withdrawal.accountNumber.trim()) {
      alert("Please enter the account number.");
      return;
    }

    if (!withdrawal.routingNumber.trim()) {
      alert("Please enter the routing number.");
      return;
    }

    if (!withdrawal.amount || withdrawalAmount <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    const availableBalance = Number(user?.amount ?? 0);

    if (withdrawalAmount > availableBalance) {
      alert("The withdrawal amount exceeds your available balance.");
      return;
    }

    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      alert("Your session has expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      setSubmitting(true);

      const currentUser = JSON.parse(storedUser);

      // --------------------------------------------------
      // GET LATEST USERS
      // --------------------------------------------------

      const users = await getUsers();

      // --------------------------------------------------
      // FIND LOGGED-IN USER
      // --------------------------------------------------

      const index = users.findIndex(
        (u: any) => u.email === currentUser.email
      );

      if (index === -1) {
        alert("User account could not be found.");
        return;
      }

      // --------------------------------------------------
      // CREATE PENDING TRANSACTION
      // SAME FORMAT AS YOUR EXISTING HISTORY
      // --------------------------------------------------

      const newHistoryEntry = {
        date: new Date().toISOString().split("T")[0],
        amount: withdrawalAmount,
        description: "Withdrawal Request",
        type: "pending",
        formattedAmount:
          formatAmountForHistory(withdrawalAmount),
      };

      // --------------------------------------------------
      // UPDATE USER
      // --------------------------------------------------

      const existingHistory = Array.isArray(
        currentUser.history
      )
        ? currentUser.history
        : [];

      const updatedUser = {
        ...currentUser,

        history: [
          newHistoryEntry,
          ...existingHistory,
        ],
      };

      // --------------------------------------------------
      // UPDATE BACKEND
      // --------------------------------------------------

      await updateUser(index, updatedUser);

      // --------------------------------------------------
      // UPDATE LOCAL STORAGE
      // --------------------------------------------------

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      setSubmittedAmount(withdrawalAmount);

      // Clear form amount/note
      setWithdrawal((prev) => ({
        ...prev,
        amount: "",
        note: "",
      }));

      // Show success
      setWithdrawalSubmitted(true);
    } catch (error) {
      console.error(
        "Failed to submit withdrawal:",
        error
      );

      alert(
        "Unable to submit your withdrawal request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // AVAILABLE BALANCE
  // --------------------------------------------------

  const availableBalance = Number(user?.amount ?? 0);

  return (
    <>
      {/* ------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------ */}

      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <FaArrowLeft />
            <span className="font-medium">
              Back
            </span>
          </button>

          <img
            src={log}
            alt="Logo"
            className="h-9 w-auto object-contain"
          />

          <div className="flex items-center gap-2">
            <img
              src={userImage}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
              onError={(e) => {
                e.currentTarget.src =
                  "default-avatar.jpg";
              }}
            />

            <span className="hidden sm:block text-sm font-semibold text-gray-700">
              {userName}
            </span>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* MAIN CONTENT */}
      {/* ------------------------------------------------ */}

      <main className="min-h-screen bg-gray-50 pb-32">

        <div className="max-w-6xl mx-auto px-4 py-6">

          {/* PAGE TITLE */}

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Withdraw Funds
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Request a withdrawal from your available
              account balance.
            </p>
          </div>

          {/* ------------------------------------------------ */}
          {/* BALANCE CARD */}
          {/* ------------------------------------------------ */}

          <div className="bg-blue-900 rounded-2xl p-5 sm:p-6 text-white shadow-md mb-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-blue-200 text-sm">
                  Available Balance
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  {formatAmountForHistory(
                    availableBalance
                  )}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <FaUniversity className="text-xl" />
              </div>

            </div>

            <p className="text-xs text-blue-200 mt-4">
              Withdrawal requests are subject to verification
              before completion.
            </p>

          </div>

          {/* ------------------------------------------------ */}
          {/* WITHDRAWAL FORM */}
          {/* ------------------------------------------------ */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* FORM */}

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-7">

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Withdrawal Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Enter the details for the account you want
                  to receive your funds.
                </p>
              </div>

              <form onSubmit={handleWithdrawal}>

                {/* WITHDRAWAL METHOD */}

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Withdrawal Method
                  </label>

                  <select
                    name="method"
                    value={withdrawal.method}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                  >
                    <option value="">
                      Select withdrawal method
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>

                    <option value="Wire Transfer">
                      Wire Transfer
                    </option>
                  </select>
                </div>

                {/* NAME */}

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Holder Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={withdrawal.name}
                    onChange={handleInputChange}
                    placeholder="Enter account holder name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* BANK */}

                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Name
                  </label>

                  <input
                    type="text"
                    name="bank"
                    value={withdrawal.bank}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* ACCOUNT + ROUTING */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Number
                    </label>

                    <input
                      type="text"
                      name="accountNumber"
                      value={withdrawal.accountNumber}
                      onChange={handleInputChange}
                      placeholder="Enter account number"
                      inputMode="numeric"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Routing Number
                    </label>

                    <input
                      type="text"
                      name="routingNumber"
                      value={withdrawal.routingNumber}
                      onChange={handleInputChange}
                      placeholder="Enter routing number"
                      inputMode="numeric"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                </div>

                {/* AMOUNT */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Withdrawal Amount
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>

                    <input
                      type="text"
                      name="amount"
                      value={withdrawal.amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      inputMode="decimal"
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />

                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Available:
                    {" "}
                    {formatAmountForHistory(
                      availableBalance
                    )}
                  </p>

                </div>

                {/* NOTE */}

                <div className="mb-6">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note
                    <span className="font-normal text-gray-400">
                      {" "}
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    name="note"
                    value={withdrawal.note}
                    onChange={handleInputChange}
                    placeholder="Add a note for this withdrawal"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none"
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Processing Withdrawal..."
                    : "Submit Withdrawal Request"}
                </button>

              </form>

            </div>

            {/* ------------------------------------------------ */}
            {/* SIDE INFORMATION */}
            {/* ------------------------------------------------ */}

            <div className="space-y-5">

              {/* SECURITY */}

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaUniversity className="text-blue-800" />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Withdrawal Information
                    </h3>

                    <p className="text-xs text-gray-500">
                      Please review before submitting
                    </p>
                  </div>

                </div>

                <div className="space-y-3 text-sm text-gray-600">

                  <div className="flex gap-2">
                    <span className="text-blue-700">✓</span>
                    <span>
                      Make sure your account details are
                      correct.
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-blue-700">✓</span>
                    <span>
                      Withdrawal requests are recorded as
                      pending.
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="text-blue-700">✓</span>
                    <span>
                      Your available balance is not reduced
                      until the request is completed.
                    </span>
                  </div>

                </div>

              </div>

              {/* SUMMARY */}

              <div className="bg-gray-100 rounded-2xl p-5">

                <h3 className="font-bold text-gray-900 mb-4">
                  Request Summary
                </h3>

                <div className="space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Method
                    </span>

                    <span className="font-medium text-gray-800 text-right">
                      {withdrawal.method || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Account Holder
                    </span>

                    <span className="font-medium text-gray-800 text-right">
                      {withdrawal.name || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Bank
                    </span>

                    <span className="font-medium text-gray-800 text-right">
                      {withdrawal.bank || "—"}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 flex justify-between gap-4">

                    <span className="text-gray-500">
                      Amount
                    </span>

                    <span className="font-bold text-blue-900">
                      {withdrawal.amount
                        ? formatAmountForHistory(
                            Number(withdrawal.amount)
                          )
                        : "$0.00"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      {/* ------------------------------------------------ */}
      {/* SUBMITTING MODAL */}
      {/* ------------------------------------------------ */}

      {submitting && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">

            <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-800 rounded-full animate-spin mx-auto mb-5" />

            <h3 className="text-lg font-bold text-gray-900">
              Processing Withdrawal
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Please wait while your withdrawal request is
              being submitted.
            </p>

          </div>

        </div>
      )}

      {/* ------------------------------------------------ */}
      {/* SUCCESS MODAL */}
      {/* ------------------------------------------------ */}

      {withdrawalSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex flex-col items-center text-center">

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">

                <FaCheckCircle className="text-4xl text-green-600" />

              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Withdrawal Submitted
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Your withdrawal request for{" "}
                <strong className="text-gray-800">
                  {formatAmountForHistory(
                    submittedAmount
                  )}
                </strong>{" "}
                has been submitted successfully.
              </p>

              <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-5 text-left">

                <p className="text-sm font-semibold text-yellow-800">
                  Status: Pending
                </p>

                <p className="text-xs text-yellow-700 mt-1">
                  Your withdrawal is pending verification.
                  You can view the transaction in your
                  transaction history.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full mt-5 bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Go to Dashboard
              </button>

              <button
                type="button"
                onClick={() =>
                  setWithdrawalSubmitted(false)
                }
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Make Another Request
              </button>

            </div>

          </div>

        </div>
      )}

      <BottomNav2 />
    </>
  );
};

export default Withdrawal;