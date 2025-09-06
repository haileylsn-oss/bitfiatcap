import  { useEffect, useState } from "react";
import BottomNav from "./stickyNav";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard } from "react-icons/fa";
import BottomNav2 from "./bottomnav2";
import log from '../assets/logo.png'

const SendMoney = () => {
  const [amount, setAmount] = useState("");
  const [userImage, setUserImage] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [receiver, setReceiver] = useState({
    name: "",
    bank: "",
    accountNumber: "",
    routingNumber: "",
    amount: "",
    purpose: "",
    senderAccount: "",
    comment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver({ ...receiver, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setError(true); // Simulating a transaction failure
    }, 3000);
  };


  


  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAmount(parsedUser.amount); // Set initial amount
      setUserImage(parsedUser.profilePicture || "default-avatar.jpg"); // Use parsedUser instead of user
      setUserName(parsedUser.firstName || "User"); // Use parsedUser instead of user
      console.log(amount)
    } else {
      setUserImage("default-avatar.jpg"); 
      setUserName("User"); 
    }
  }, []);
  


  return (
    <>
      <div className="">
        {/* Header */}
        <div className="bg-red-800  text-white p-4 flex justify-between items-center sticky top-0 z-10">
 {user && (
            <img
              src={userImage}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
          )}
        <h1 className="text-lg text-white font-thin">
  {userName ? `${userName}${userName.endsWith("'") ? "" : "'s"} Dashboard` : "Dashboard"}
</h1>

        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 lg:px-6 mt-8">
          {/* Left Section */}
          <div className="lg:w-1/3 space-y-6">
            {/* Total Balance Section */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-gray-700 font-medium">Total Balance</h2>
                <button className="bg-red-100 text-red-600 p-2 rounded-lg">
                  <span className="material-icons">content_copy</span>
                </button>
              </div>
              <h1 className="text-3xl font-bold mt-2">
                ${user?.amount.toLocaleString()}
              </h1>
            </div>
          </div>
        </div>

        <hr />

      
      </div>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">
            {/* Header */}
            <header className="w-full flex items-center justify-between py-4 border-b lg:max-w-md">
              <button className="text-xl text-gray-600" onClick={() => navigate(-1)}>
                <FaArrowLeft />
              </button>
              <h1 className="text-lg font-semibold">New Transfer</h1>
              <div className="w-8"></div>
            </header>
      
            {/* Payment Form */}
            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-gray-700 text-lg font-medium mb-4">Transfer Details</h2>
      
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* From */}
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-red-600 text-xl" />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">Debit Card</p>
                      <p className="text-xs text-gray-500">**** **** **** 4900</p>
                    </div>
                  </div>
                  <button className="text-red-500 text-sm">Change</button>
                </div>
      
                {/* Recipient Details */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Receiver Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={receiver.name}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Bank Name</label>
                  <input
                    type="text"
                    name="bank"
                    placeholder="Enter bank name"
                    value={receiver.bank}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Enter account number"
                    value={receiver.accountNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Bank Routing Number (ABA)</label>
                  <input
                    type="text"
                    name="routingNumber"
                    placeholder="Enter routing number"
                    value={receiver.routingNumber}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                {/* Amount */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Transfer Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={receiver.amount}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                    required
                  />
                </div>
      
                {/* Purpose of Payment (Optional) */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <label className="text-sm text-gray-600">Purpose of Payment (Optional)</label>
                  <input
                    type="text"
                    name="purpose"
                    placeholder="Enter purpose (optional)"
                    value={receiver.purpose}
                    onChange={handleInputChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                  />
                </div>
      
             
      
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-red-800 text-white py-3  text-lg font-medium hover:bg-black transition"
                >
                  Send Money
                </button>
              </form>
            </div>
      
            {/* Loading Overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-xl font-medium animate-pulse"><img src={log} alt="" /></div>
              </div>
            )}
      
           {error && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
      <h2 className="text-lg font-semibold text-red-600">Transfer Access Restricted</h2>

      <p className="text-gray-600 mt-2">Tier-2 Compliance Required
</p>
      <p className="text-gray-600 mt-2 text-sm">Outbound transfers from this account are currently unavailable.

Per U.S....

</p>
 <Link to="/error">
          <button className="w-full mb-6 mt-6 px-4 py-2 bg-gray-200 text-red-800 rounded-lg hover:bg-gray-300 transition">
            Read More
          </button>
        </Link>
      <div className="mt-4 space-y-2">
        <button
          onClick={() => setError(false)}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Close
        </button>

       
      </div>
    </div>
  </div>
)}
          </div>

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default SendMoney;
