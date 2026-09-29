
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBitcoin,
  FaCheckCircle,
} from "react-icons/fa";
import BottomNav2 from "./bottomnav2";
import { getUsers, updateUser } from "../backend/api";
import log from "../assets/logo.png";

interface CryptoForm {
  crypto: string;
  walletAddress: string;
  amount: string;
}

const BuyCrypto: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const [form, setForm] = useState<CryptoForm>({
    crypto: "Bitcoin",
    walletAddress: "",
    amount: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAmount, setSubmittedAmount] = useState(0);

  const formatAmountForHistory = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

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
    } catch (error) {
      console.error("Failed to load logged-in user:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");

    const parts = value.split(".");

    if (parts.length > 2) return;

    if (parts[1]?.length > 2) {
      value = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    setForm((prev) => ({
      ...prev,
      amount: value,
    }));
  };

  const handleBuyCrypto = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const purchaseAmount = Number(form.amount);

    if (!form.crypto) {
      alert("Please select a cryptocurrency.");
      return;
    }

    if (!form.walletAddress.trim()) {
      alert("Please enter the wallet address.");
      return;
    }

    if (!form.amount || purchaseAmount <= 0) {
      alert("Please enter a valid purchase amount.");
      return;
    }

    const availableBalance = Number(user?.amount ?? 0);

    if (purchaseAmount > availableBalance) {
      alert("The purchase amount exceeds your available balance.");
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

      const users = await getUsers();

      const index = users.findIndex(
        (u: any) => u.email === currentUser.email
      );

      if (index === -1) {
        alert("User account could not be found.");
        return;
      }

      const newHistoryEntry = {
        date: new Date().toISOString().split("T")[0],
        amount: purchaseAmount,
        description: `Buy ${form.crypto}`,
        type: "pending",
        formattedAmount:
          formatAmountForHistory(purchaseAmount),
      };

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

      await updateUser(index, updatedUser);

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
      setSubmittedAmount(purchaseAmount);

      setForm({
        crypto: "Bitcoin",
        walletAddress: "",
        amount: "",
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit crypto purchase:", error);

      alert(
        "Unable to submit your crypto purchase. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const availableBalance = Number(user?.amount ?? 0);

  return (
    <>
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 transition"
          >
            <FaArrowLeft />
            <span className="font-medium">Back</span>
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
                e.currentTarget.src = "default-avatar.jpg";
              }}
            />

            <span className="hidden sm:block text-sm font-semibold text-gray-700">
              {userName}
            </span>
          </div>

        </div>
      </div>

      <main className="min-h-screen bg-gray-50 pb-32">
        <div className="max-w-6xl mx-auto px-4 py-6">

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Buy Crypto
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Purchase cryptocurrency using your account balance.
            </p>
          </div>

          {/* BALANCE */}
          <div className="bg-blue-900 rounded-2xl p-5 sm:p-6 text-white shadow-md mb-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-blue-200 text-sm">
                  Available Balance
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  {formatAmountForHistory(availableBalance)}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <FaBitcoin />
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-7">

              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Crypto Purchase
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Select the cryptocurrency and enter your wallet address.
                </p>
              </div>

              <form onSubmit={handleBuyCrypto}>

                {/* CRYPTO */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cryptocurrency
                  </label>

                  <select
                    name="crypto"
                    value={form.crypto}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
                  >
                    <option value="Bitcoin">
                      Bitcoin (BTC)
                    </option>

                    <option value="Ethereum">
                      Ethereum (ETH)
                    </option>

                    <option value="USDT">
                      Tether (USDT)
                    </option>

                    <option value="USDC">
                      USD Coin (USDC)
                    </option>

                    <option value="BNB">
                      BNB
                    </option>

                    <option value="Solana">
                      Solana (SOL)
                    </option>

                    <option value="XRP">
                      XRP
                    </option>
                  </select>
                </div>

                {/* WALLET */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Wallet Address
                  </label>

                  <input
                    type="text"
                    name="walletAddress"
                    value={form.walletAddress}
                    onChange={handleInputChange}
                    placeholder="Enter wallet address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>

                {/* AMOUNT */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>

                    <input
                      type="text"
                      name="amount"
                      value={form.amount}
                      onChange={handleAmountChange}
                      placeholder="0.00"
                      inputMode="decimal"
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Available:{" "}
                    {formatAmountForHistory(availableBalance)}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-800 transition disabled:opacity-50"
                >
                  {submitting
                    ? "Processing Purchase..."
                    : `Buy ${form.crypto}`}
                </button>

              </form>
            </div>

            {/* SUMMARY */}
            <div className="bg-gray-100 rounded-2xl p-5 h-fit">

              <h3 className="font-bold text-gray-900 mb-4">
                Purchase Summary
              </h3>

              <div className="space-y-3 text-sm">

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Crypto
                  </span>

                  <span className="font-medium text-gray-800">
                    {form.crypto}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Wallet
                  </span>

                  <span className="font-medium text-gray-800 text-right break-all">
                    {form.walletAddress || "—"}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-500">
                    Amount
                  </span>

                  <span className="font-bold text-blue-900">
                    {form.amount
                      ? formatAmountForHistory(
                          Number(form.amount)
                        )
                      : "$0.00"}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* PROCESSING */}
      {submitting && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">

            <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-800 rounded-full animate-spin mx-auto mb-5" />

            <h3 className="text-lg font-bold text-gray-900">
              Processing Purchase
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Please wait while your crypto purchase is being submitted.
            </p>

          </div>
        </div>
      )}

      {/* SUCCESS */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

            <div className="flex flex-col items-center text-center">

              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                Purchase Submitted
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Your{" "}
                <strong className="text-gray-800">
                  {form.crypto}
                </strong>{" "}
                purchase of{" "}
                <strong className="text-gray-800">
                  {formatAmountForHistory(submittedAmount)}
                </strong>{" "}
                has been submitted.
              </p>

              <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-5 text-left">
                <p className="text-sm font-semibold text-yellow-800">
                  Status: Pending
                </p>

                <p className="text-xs text-yellow-700 mt-1">
                  The purchase has been added to your transaction history
                  as pending.
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
                onClick={() => setSubmitted(false)}
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Buy Again
              </button>

            </div>
          </div>
        </div>
      )}

      <BottomNav2 />
    </>
  );
};

export default BuyCrypto;