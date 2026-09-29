import  { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import SupportBot from "../components/support";
import { fetchHistoryForLoggedUser, Transaction } from "../backend/api";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";




const TransactionHistory = () => {
  const [userAmount, setUserAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userLastName, setLastName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(10);


   useEffect(() => {
    const loadData = async () => {
      const storedUser = localStorage.getItem("loggedInUser");
      if (!storedUser) return;

      try {
        const user = JSON.parse(storedUser);
        setUserAmount(user.amount || 0);
        setUserName(user.firstName || "");
        setLastName(user.lastName || "");

         const history = await fetchHistoryForLoggedUser(user.email);
setTransactions(history);
setLoading(false);


      } catch (err) {
        console.error("Failed to load user data or history:", err);
         setLoading(false);
      }
    };

    loadData();
  }, []);

  // const inflow = allTransactions
  //   .filter((t) => t.type === "Credit")
  //   .reduce((sum, t) => sum + t.amount, 0);

  // const outflow = allTransactions
  //   .filter((t) => t.type === "Debit")
  //   .reduce((sum, t) => sum + t.amount, 0);


  const formatAmount = (amount: number | string) => {
  // If it's already formatted with $, return it as it is
  if (typeof amount === "string" && amount.includes("$")) {
    return amount;
  }

  // Remove commas and any other non-numeric characters except decimal point
  const numericAmount = Number(
    String(amount).replace(/,/g, "").replace(/[^\d.-]/g, "")
  );

  if (isNaN(numericAmount)) {
    return amount;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};



  return (
    <>
       <div className="max-w-5xl mx-auto bg-white rounded-xl  overflow-hidden mt-8 p-4 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold">ADV PLUS </h2>
        <p className="text-2xl md:text-3xl font-bold mt-2">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(userAmount)}
        </p>
        <p className="text-sm text-gray-500">Available balance</p>
      </div>

      <div className="mt-4">
        <h3 className="text-gray-600 font-semibold text-sm md:text-base mb-2">RECENT TRANSACTIONS</h3>
       {loading ? (
  <div className="space-y-4 mb-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="animate-pulse space-y-2 border-b pb-2 mb-8">
        <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
        <div className="flex justify-between items-center mt-1">
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
) : transactions.length === 0 ? (
  <p className="text-sm text-gray-500 text-center">No transactions found.</p>
) : (
  <div className="space-y-4 mb-8">
  {[...transactions].slice(0, visibleCount).map((tx, index) => (


      <div
        key={index}
        className="border-b pb-2 cursor-pointer hover:bg-gray-50 transition mb-8"
        onClick={() => setSelectedTransaction(tx)}
      >
        <p className="text-xs text-gray-500">{tx.date}</p>
        <p className="text-sm font-medium text-gray-800">{tx.description}</p>
        <div className="flex justify-between items-center mt-1">
       <span
  className={`font-semibold ${
    tx.type === "debit"
      ? "text-red-500"
      : tx.type === "pending"
      ? "text-yellow-400"
      : "text-green-600"
  }`}
>
  {formatAmount(tx.amount)}
</span>
       {tx.type === "pending" ? (
  <p className="text-sm text-yellow-400">
    Kindly contact support
  </p>
) : (
  <p>
    
  </p>
)}     </div>
      </div>

      
    ))}

    {visibleCount < transactions.length && (
  <div className="text-center mt-4">
    <button
      onClick={() => setVisibleCount(prev => prev + 10)}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Load More
    </button>
  </div>
)}

  </div>
)}

      </div>

      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4 md:px-8">
          <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-xl relative">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-2 right-4 text-gray-500 text-xl hover:text-black"
            >
              &times;
            </button>

            <div className="mb-6 text-sm md:text-base text-gray-700">
              <p>Welcome, {userName} {userLastName}</p>
              <p>
                Account Balance: <strong>${userAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
              </p>
              <p>Transaction Date: <strong>{selectedTransaction.date}</strong></p>
              
             <p
  className={`font-medium mt-2 ${
    selectedTransaction.type.toLowerCase() === "pending"
      ? "text-yellow-400"
      : selectedTransaction.type.toLowerCase() === "debit"
      ? "text-red-600"
      : "text-green-600"
  }`}
>
  Status:{" "}
  {selectedTransaction.type.toLowerCase() === "pending"
    ? "Transaction Pending Kindly Contact Support"
    : selectedTransaction.type.toLowerCase() === "debit"
    ? "Payment Sent"
    : "Funds Available for Payout"}
</p>  </div>

            <div className="overflow-x-auto">
              <table className="w-full border text-sm md:text-base text-left mb-6">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="border px-3 py-2">Date</th>
                    <th className="border px-3 py-2">Description</th>
                    <th className="border px-3 py-2">Amount</th>
                    <th className="border px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">{selectedTransaction.date}</td>
                    <td className="border px-3 py-2">{selectedTransaction.description}</td>
                    <td className="border px-3 py-2">
                     <span
  className={
    selectedTransaction.type === "debit"
      ? "text-red-600"
      : selectedTransaction.type === "pending"
      ? "text-yellow-500"
      : "text-green-600"
  }
>
  {formatAmount(selectedTransaction.amount)}
</span>
                    </td>
                   <td className="border px-3 py-2">
  {selectedTransaction.type.toLowerCase() === "debit"
    ? "Debit"
    : selectedTransaction.type.toLowerCase() === "pending"
    ? "Pending"
    : "Deposit"}
</td>

                  </tr>
                </tbody>
              </table>
{/* <div className="max-w-2xl mb-[100px] mx-auto bg-red-50 border border-red-300 rounded-2xl p-6 shadow-md mt-10">
  <h2 className="text-xl font-bold text-red-700 mb-4">Error Notice: Returned Check</h2>
  
  <p className="text-gray-700 mb-4">
    We regret to inform you that your check in the amount of 
    <span className="font-semibold">$7,500</span> was returned due to a  
    <span className="font-semibold"> bank processing error</span>. Please note that this issue did not occur as a result of your actions.
  </p>

  <p className="text-gray-700 mb-4">
    To resolve this matter, the check must be <span className="font-semibold">re-issued</span>. Once re-issued, it will take approximately 
    <span className="font-semibold">7–10 business days</span> for the receiver to obtain the funds.
  </p>

  <p className="text-gray-700 mb-4">
    At this time, the <span className="font-semibold">$7,500</span> is not available in your account. The bank will automatically 
    <span className="font-semibold">re-deposit</span> the $7,500 to the receiver within 
    <span className="font-semibold">7–10 business days</span>.
  </p>

  <p className="text-gray-700">
    We sincerely apologize for the inconvenience and appreciate your patience as this issue is corrected.
  </p>
</div> */}
            </div>
          </div>
        </div>
      )}

      {/* <StickyBottomNav /> */}
    </div>

    
<BottomNav/>
<BottomNav2/>
   
    </>
  );
};

export default TransactionHistory;
