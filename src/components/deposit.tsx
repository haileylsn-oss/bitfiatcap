// import React from "react";

// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  
  const DepositsPage = () => {
    const currentDate = formatDate(new Date()); // Get today's date
const [userAmount, setUserAmount] = useState<number>(0);
  // const [userImage, setUserImage] = useState<string>("");
  // const [showBalance, setShowBalance] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");


    useEffect(() => {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserAmount(user.amount || 0);
        console.log(userAmount)
        // setUserImage(user.profilePicture || "default-avatar.jpg");
        setUserName(user.firstName || "User");
      }
    }, []);
    

  return (
    <>
    
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">Deposits</h1>

      {/* Current Deposits Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Account Overview
        </h2>
        {/* Deposit Cards */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="material-icons text-blue-500">check_circle</span>
              </div>
              <div className="ml-4">
                <p className="text-xl font-semibold">$998.00</p>
                <p className="text-sm text-gray-500">Jan 1 2020 - {currentDate}</p>
              </div>
            </div>
            <button className="text-green-500 font-medium">Deposited</button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-icons text-red-500">pie_chart</span>
              </div>
              <div className="ml-4">
              <p className="text-xl font-semibold">$1,000,000.00</p>

                <p className="text-sm text-gray-500">July 3 2025</p>
              </div>
            </div>
            <button className="text-green-500 font-medium">Deposited</button>
          </div>
        </div>
      </div>

      {/* Savings Goals Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
         {userName}'s Interest rate
        </h2>
        {/* Savings Goal Card */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="material-icons text-red-500">savings</span>
              </div>
              <div className="ml-4">
              <p className="text-xl font-semibold">$998.00</p>

                <p className="text-sm text-gray-500">
                    1% weekly
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button className="flex-1 bg-orange-100 text-orange-500 py-2 px-4 rounded-lg font-medium mr-2">
          + Moneybox
        </button>
        <button className="flex-1 bg-purple-900 text-white py-2 px-4 rounded-lg font-medium">
          + Deposit
        </button>
      </div>
    </div>
   
   <BottomNav/>
   <BottomNav2/>
    
    </>
  );
};

export default DepositsPage;
