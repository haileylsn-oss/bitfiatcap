import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";
import SupportBot from "../components/support";

interface Transaction {
  type: "Credit" | "Debit";
  amount: number;
  date: string;
  label: string;
  icon: string;
}

const TransactionHistory: React.FC = () => {
  const [userAmount, setUserAmount] = useState<number>(0);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userLastName, setLastName] = useState<string>("");
  const [AcctNum, setAcctNumber] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserAmount(user.amount || 0);
      setUserName(user.firstName || "");
      setLastName(user.lastName || "");
      setAcctNumber(user.accountNumber || "");

      // Static sample transactions (no random generation)
      setAllTransactions([
       
        {
          type: "Credit",
          amount: userAmount,
          label: "BitFiat Investment",
          icon: "🧾",
          date: "2025-11-07 04:43:00",
        }, 
        
      ]);
    }
  }, []);

  const inflow = allTransactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const outflow = allTransactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <div className="p-6 min-h-screen bg-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Link to="/dashboard">
            <button className="text-purple-600 text-xl">&larr;</button>
          </Link>
          <h1 className="text-lg font-bold text-black"> Recent Transactions </h1>
          <button className="text-purple-600 text-xl">&#x21bb;</button>
        </div>

        {/* Summary */}
       <div className="grid grid-cols-2 gap-4 mb-6">
  <div className="bg-white p-4 rounded-xl shadow-md">
    <h2 className="text-sm text-gray-500">Inflow</h2>
    <p className="text-xl font-bold text-green-600">
      +
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(inflow)}
    </p>
  </div>
  <div className="bg-white p-4 rounded-xl shadow-md">
    <h2 className="text-sm text-gray-500">Outflow</h2>
    <p className="text-xl font-bold text-red-600">
      -
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(outflow)}
    </p>
  </div>
</div>


        {/* All Transactions (Credit & Debit) */}
        <div className="space-y-4">
          {allTransactions.map((transaction, index) => (
            <div
              key={index}
              onClick={() => setSelectedTransaction(transaction)}
              className="cursor-pointer bg-white p-4 rounded-xl shadow-md hover:bg-gray-50 transition-all flex justify-between items-center"
            >
              <div className="flex gap-3 items-start">
                <span className="text-xl">{transaction.icon}</span>
                <div>
                  <p className={`font-semibold ${transaction.type === "Credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.label}
                  </p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
              </div>
            <p
  className={`font-bold text-lg ${
    transaction.type === "Credit" ? "text-green-600" : "text-red-600"
  }`}
>
  {transaction.type === "Credit" ? "+" : "-"}
  {new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(transaction.amount)}
</p>

            </div>
          ))}
        </div>
      </div>

      {/* Transaction Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-xl relative">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-2 right-4 text-gray-500 text-xl hover:text-black"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-center mb-6">CKT Reserved & Trust Bank</h2>

            <div className="mb-6 text-sm text-gray-700">
              <p>Welcome, {userName} {userLastName}</p>
              <p>Account Number: <strong>{AcctNum}</strong></p>
              <p>Account Balance: <strong>${userAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
              <p>Last Deposit Date: <strong>July 11, 2025</strong></p>
              <p>Deposit Reference Number: <strong>2234-WN7823490</strong></p>
              <p className="text-green-600 font-semibold mt-2">Status: Funds Available for Payout</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm text-left mb-6">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border px-3 py-2">Date</th>
                    <th className="border px-3 py-2">Type</th>
                    <th className="border px-3 py-2">Amount</th>
                    <th className="border px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
 <tr>
              <td className="border px-3 py-2">2025-11-07</td>
              <td className="border px-3 py-2 ">Deposit</td>
              <td className="border px-3 py-2">$300.00</td>
              <td className="border px-3 py-2 ">Success</td>
            </tr>
                    <tr>
              <td className="border px-3 py-2">2025-11-07</td>
              <td className="border px-3 py-2 ">Deposit</td>
              <td className="border px-3 py-2">$15,000.00</td>
              <td className="border px-3 py-2 ">Success</td>
            </tr>

                   
                    <tr>
              <td className="border px-3 py-2">2025-08-05</td>
              <td className="border px-3 py-2 ">Deposit</td>
              <td className="border px-3 py-2">$15,000.00</td>
              <td className="border px-3 py-2 ">Success</td>
            </tr>

                      <tr>
              <td className="border px-3 py-2">2025-07-05</td>
              <td className="border px-3 py-2 ">Interest (1%)</td>
              <td className="border px-3 py-2">$998.25</td>
              <td className="border px-3 py-2 ">Success</td>
            </tr>

                  <tr>
              <td className="border px-3 py-2">2025-07-03</td>
              <td className="border px-3 py-2">Service Fee</td>
              <td className="border px-3 py-2">$45.00</td>
              <td className="border px-3 py-2">Success</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">2025-07-03</td>
              <td className="border px-3 py-2">Tax</td>
              <td className="border px-3 py-2">$30.00</td>
              <td className="border px-3 py-2">Success</td>
            </tr>
            <tr>
              <td className="border px-3 py-2">2025-07-03</td>
              <td className="border px-3 py-2">Maintenance</td>
              <td className="border px-3 py-2">$100.00</td>
              <td className="border px-3 py-2">Success</td>
            </tr>

             <tr>
              <td className="border px-3 py-2">2025-07-03</td>
              <td className="border px-3 py-2">Deposit</td>
              <td className="border px-3 py-2">$1,000,000.00</td>
              <td className="border px-3 py-2">Success</td>
            </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 text-center">
              This dashboard reflects the most current status of your winnings under the Camellia K Talachi Mega Bonus Program.<br />
              Your deposit has been securely processed by CKT National Reserve. If you have any questions or would like to request a payout, please contact your claim specialist directly.
            </p>
          </div>
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
      <SupportBot/>
    </>
  );
};

export default TransactionHistory;
