import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav2 from "./bottomnav2";
import qr from "../assets/qe.jpg";
import { getUsers, updateUser } from "../backend/api";

const PaymentOptions: React.FC = () => {
  const [method, setMethod] = useState("");
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const navigate = useNavigate();

  const address = "bc1qut872uvf448xzjd0egvae45sw9kkwzcgjp8hkq";

  // --------------------------------------------------
  // COPY BITCOIN ADDRESS
  // --------------------------------------------------

  const handleCopy = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy address:", error);
      });
  };

  // --------------------------------------------------
  // FORMAT AMOUNT
  // --------------------------------------------------

  const formatAmountForHistory = (value: number) => {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // --------------------------------------------------
  // AMOUNT INPUT
  // --------------------------------------------------

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = value.split(".");

    if (parts.length > 2) {
      return;
    }

    setAmount(value);
  };

  // --------------------------------------------------
  // SUBMIT BITCOIN PAYMENT
  // --------------------------------------------------

  const handlePaymentSubmitted = async () => {
    const paymentAmount = Number(amount);

    if (!amount || paymentAmount <= 0) {
      alert("Please enter the amount you sent.");
      return;
    }

    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      alert("Your session has expired. Please log in again.");
      return;
    }

    try {
      setSubmitting(true);

      const user = JSON.parse(storedUser);

      // Get latest users from backend
      const users = await getUsers();

      // Find currently logged-in user
      const index = users.findIndex(
        (u: any) => u.email === user.email
      );

      if (index === -1) {
        alert("User account could not be found.");
        return;
      }

      // --------------------------------------------------
      // CREATE PENDING TRANSACTION
      // --------------------------------------------------

      const newHistoryEntry = {
        date: new Date().toISOString().split("T")[0],

        amount: paymentAmount,

        description: "Bitcoin Investment Payment",

        type: "pending",

        formattedAmount:
          formatAmountForHistory(paymentAmount),
      };

      // --------------------------------------------------
      // UPDATE USER
      // --------------------------------------------------

      const updatedUser = {
        ...user,

        history: [
          newHistoryEntry,
          ...(user.history || []),
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

      // Clear amount
      setAmount("");

      // Show success message
      setPaymentSubmitted(true);
    } catch (error) {
      console.error(
        "Failed to submit Bitcoin payment:",
        error
      );

      alert(
        "Unable to submit your payment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ------------------------------------------------ */}
      {/* INVESTMENT INFORMATION */}
      {/* ------------------------------------------------ */}

      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-blue-300 text-left text-sm mt-6">

        <h2 className="text-blue-800 font-bold text-lg mb-2">
          🚀 Secure Your Crypto Mining Investment
        </h2>

        <p className="text-gray-700 mb-4">
          You’re one step away from activating your mining
          plan with{" "}
          <strong>Bitfiat Capital</strong>.
        </p>

        <p className="text-gray-700 mb-4">
          To proceed, please complete your investment by
          making a secure payment using one of the approved
          options below.
        </p>

        {/* Confirmation */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">

          <p className="font-semibold text-yellow-800 mb-1">
            Investment Confirmation:
          </p>

          <p className="mt-2">
            This deposit funds your mining hardware
            allocation, operational fees, and ensures
            immediate access to live earnings.
          </p>

        </div>

        {/* Investment Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">

          <p className="font-semibold text-gray-800 mb-1">
            💼 Investment Summary:
          </p>

          <ul className="list-disc list-inside text-gray-700 space-y-1">

            <li>
              Plan Status:{" "}
              <span className="text-red-600 font-semibold">
                Pending Payment
              </span>
            </li>

            <li>
              Plan Type:{" "}
              <strong>Crypto Mining</strong>
            </li>

            <li>
              Network Allocation:{" "}
              <span className="text-blue-700 font-semibold">
                24h Hashrate Lease
              </span>
            </li>

            <li>
              Reference ID:{" "}
              <code className="bg-gray-100 px-1 rounded">
                BFC-MIN-009832
              </code>
            </li>

          </ul>

        </div>

        <p className="text-gray-700 mb-4">
          Once payment is confirmed, your mining wallet
          will be connected to our pool and rewards will
          reflect live on your dashboard.
        </p>

        <p className="text-xs text-gray-500 mb-2">
          ⛏️ Powered by Bitfiat Capital's global mining
          infrastructure across North America and Europe.
        </p>

      </div>

      {/* ------------------------------------------------ */}
      {/* PAYMENT METHODS */}
      {/* ------------------------------------------------ */}

      <div className="bg-gray-100 mb-[100px] p-6 flex justify-center items-center">

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

          <h1 className="text-xl font-bold text-center text-blue-800 mb-4">
            Choose Payment Method
          </h1>

          {/* Payment Method */}
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
              setPaymentSubmitted(false);
            }}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-600"
          >

            <option value="">
              -- Select Payment Method --
            </option>

            <option value="bitcoin">
              Bitcoin
            </option>

          </select>

          {/* ------------------------------------------------ */}
          {/* BITCOIN PAYMENT */}
          {/* ------------------------------------------------ */}

          {method === "bitcoin" && (
            <div className="bg-yellow-50 p-4 rounded-md flex flex-col gap-4 border border-yellow-300 text-sm">

              <p className="font-medium text-gray-800">
                Send your Bitcoin payment to the wallet
                address below:
              </p>

              {/* QR CODE */}
              <div className="flex justify-center">

                <img
                  src={qr}
                  alt="Bitcoin QR Code"
                  className="w-[200px] h-[200px] object-contain"
                />

              </div>

              {/* WALLET ADDRESS */}
              <div className="flex items-center space-x-2 mt-2">

                <input
                  type="text"
                  readOnly
                  value={address}
                  className="font-mono text-red-700 bg-gray-100 border border-gray-300 rounded px-3 py-2 w-full text-xs"
                />

                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-blue-800 text-white px-3 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>

              </div>

              {/* ------------------------------------------------ */}
              {/* AMOUNT SENT */}
              {/* ------------------------------------------------ */}

              {!paymentSubmitted && (
                <div className="border-t border-yellow-200 pt-4 mt-2">

                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Amount Sent
                  </label>

                  <div className="relative">

                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>

                    <input
                      type="text"
                      inputMode="decimal"
                      value={amount}
                      onChange={handleAmountChange}
                      placeholder="Enter amount sent"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"
                    />

                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Enter the amount you sent to the Bitcoin
                    address above.
                  </p>

                  {/* ------------------------------------------------ */}
                  {/* PAYMENT BUTTON */}
                  {/* ------------------------------------------------ */}

                  <button
                    type="button"
                    onClick={handlePaymentSubmitted}
                    disabled={submitting}
                    className="w-full mt-4 bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >

                    {submitting
                      ? "Submitting Payment..."
                      : "I Have Made the Payment"}

                  </button>

                </div>
              )}

              {/* ------------------------------------------------ */}
              {/* PAYMENT SUCCESS */}
              {/* ------------------------------------------------ */}

              {paymentSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">

                      <span className="text-xl text-green-600">
                        ✓
                      </span>

                    </div>

                    <div>

                      <p className="text-green-700 font-semibold">
                        Payment Submitted
                      </p>

                      <p className="text-xs text-gray-600 mt-1">
                        Your payment of{" "}
                        <strong>
                          {formatAmountForHistory(
                            Number(
                              // amount has been cleared after
                              // successful submission, so use
                              // the transaction amount below
                              0
                            )
                          )}
                        </strong>{" "}
                        has been submitted for verification.
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Go to Dashboard
                  </button>

                </div>
              )}

            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* CLOSE WINDOW */}
          {/* ------------------------------------------------ */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full mt-6 px-5 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg hover:bg-blue-200 transition"
          >
            Close Window
          </button>

        </div>

      </div>

      <BottomNav2 />
    </>
  );
};

export default PaymentOptions;