import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav2 from "./bottomnav2";
import qr from "../assets/qe.jpg";

const PaymentOptions: React.FC = () => {
  const [method, setMethod] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const address = "bc1qut872uvf448xzjd0egvae45sw9kkwzcgjp8hkq";

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-blue-300 text-left text-sm mt-6">
        <h2 className="text-blue-800 font-bold text-lg mb-2">
          🚀 Secure Your Crypto Mining Investment
        </h2>

        <p className="text-gray-700 mb-4">
          You’re one step away from activating your mining plan with <strong>Bitfiat Capital</strong>.
        </p>

        <p className="text-gray-700 mb-4">
          To proceed, please complete your investment by making a secure payment using one of the approved options below.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-yellow-800 mb-1">Investment Confirmation:</p>
          {/* <p>
            To activate your <strong>Crypto Mining Investment Plan</strong>, please make a one-time contribution of{" "}
            <span className="font-semibold text-yellow-700">$107,544.00 USD</span> or its BTC equivalent.
          </p> */}
          <p className="mt-2">
            This deposit funds your mining hardware allocation, operational fees, and ensures immediate access to live earnings.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-gray-800 mb-1">💼 Investment Summary:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Plan Status: <span className="text-red-600 font-semibold">Pending Payment</span></li>
            <li>Plan Type: <strong>Crypto Mining</strong></li>
            <li>Network Allocation: <span className="text-blue-700 font-semibold">24h Hashrate Lease</span></li>
            <li>Reference ID: <code className="bg-gray-100 px-1 rounded">BFC-MIN-009832</code></li>
          </ul>
        </div>

        <p className="text-gray-700 mb-4">
          Once payment is confirmed, your mining wallet will be connected to our pool and rewards will reflect live on your dashboard.
        </p>

        <p className="text-xs text-gray-500 mb-6">
          ⛏️ Powered by Bitfiat Capital's global mining infrastructure across North America and Europe.
        </p>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-100 mb-[100px] p-6 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold text-center text-blue-800 mb-4">Choose Payment Method</h1>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          >
            <option value="">-- Select Payment Method --</option>
            <option value="bitcoin">Bitcoin</option>
            {/* <option value="wire">Wire Transfer</option> */}
          </select>

          {/* Bitcoin Payment */}
          {method === "bitcoin" && (
            <div className="bg-yellow-50 p-4 rounded-md flex flex-col gap-4 border border-yellow-300 text-sm">
              <p>Send your Bitcoin payment to the wallet address below:</p>
              <div className="flex justify-center">
                <img src={qr} alt="QR Code" className="w-[200px]" />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="text"
                  readOnly
                  value={address}
                  className="font-mono text-red-700 bg-gray-100 border border-gray-300 rounded px-3 py-1 w-full"
                />
                <button
                  onClick={handleCopy}
                  className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

       

          <button
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
