import { useState, useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleRight,  FaSearch } from 'react-icons/fa';
import axios from "axios";
import {
  // FaSyncAlt,
  // FaEye,
  // FaEyeSlash,
  // FaArrowUp,
  FaSignOutAlt,
  // FaShoppingBasket,
  FaShoppingCart,
  FaEnvelope,
} from "react-icons/fa";

import lol from '../assets/logo.png'
import log1 from '../assets/background.jpg'
import { Plus } from "lucide-react";

import person from '../assets/person_1.jpg'
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";
import SupportBot from "../components/support";
import CoinGeckoWidget from "../components/coingecko";




interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}




const Dashboard = () => {
  const navigate = useNavigate();

  // const [visibleTransactions, setVisibleTransactions] = useState(4);
  const [userAmount, setUserAmount] = useState<number>(0);
  const [userImage, setUserImage] = useState<string>("");
  // const [showBalance, setShowBalance] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [subType, setSubType] = useState<string>("");
  // const [userEmail, setUserEmail] = useState<string>("");
  const [userLastName, setLastName] = useState<string>("");
  const [useMidname, setMiddleName] = useState<string>("");
  const [AcctNum, setAcctNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
const [showViewModal, setShowViewModal] = useState(false);
const [btcRate, setBtcRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
 const [cryptoData, setCryptoData] = useState<Crypto[]>([]);


    useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
  }, []);



 useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await res.json();
        setBtcRate(data.bitcoin.usd);
      } catch (error) {
        console.error("Failed to fetch BTC rate:", error);
      }
    };

    fetchBTCPrice();
  }, []);


  const btcValue = btcRate ? (userAmount / btcRate).toFixed(8) : null;


  console.log(userImage,subType,userLastName,useMidname)

  // Fetch logged-in user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserAmount(user.amount || 0);
      setUserImage(user.profilePicture || person);
      setUserName(user.firstName || "");
      setLastName(user.lastName || "");
      setMiddleName(user.middleName || "");
      setAccountType(user.accountType || "Nll");
      setSubType(user.accountSubType || "");
      // setUserEmail(user.email || "");
      setAcctNumber(user.accountNumber || "");
    }
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  if (isLoading) {
    return (
           <div className="flex flex-col items-center justify-center min-h-screen z-10 ">
  <div className="bg-white   p-6 w-80 flex flex-col items-center">
    <img
      src={lol} // replace with your actual image path
      alt="Loading illustration"
      className="w-'200px h-32 object-contain mb-4"
    />
    
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-red-500 border-dotted rounded-full animate-spin"></div>
      {/* <p className="text-sm text-gray-600">Loading...</p> */}
    </div>
  </div>
</div>
    );
  }


 
  return (
    <>
      <div className=" flex flex-col ">
           <div className="bg-white relative mb-8">
      {/* Top Navigation */}
      <div className="flex justify-between items-center px-4 py-2 border-b">
        {/* Hamburger */}
        <div className="flex flex-col items-center cursor-pointer">
          {/* <FaBars className="text-xl" /> */}
          <span className="text-[10px] text-gray-600">Menu</span>
        </div>

        {/* Top Right Icons */}
        <div className="flex gap-5 text-gray-500 text-xl items-center">
          {/* Inbox */}
        <Link to='/inbox'> 
        <div className="relative flex flex-col items-center cursor-pointer hover:text-black">
            <FaEnvelope />
            <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
            <span className="text-[10px] mt-1">Inbox</span>
          </div>
        </Link>  
          {/* Products */}
          <div className="flex flex-col items-center cursor-pointer hover:text-black">
            <FaShoppingCart />
            <span className="text-[10px] mt-1">Products</span>
          </div>
          {/* Log Out */}
          <div className="flex flex-col items-center cursor-pointer hover:text-black">
            <FaSignOutAlt />
            <span className="text-[10px] mt-1" onClick={handleLogout}>Log Out</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center border-b px-4">
        <div>
          
        </div>
        <div className="text-blue-700 text-center border-b-2 border-blue-700  m-auto font-medium  py-2 px-4 text-[15px]">
          Accounts
        </div>
        <div className="text-gray-500 text-center m-auto py-2 px-4 text-[15px]">Dashboard</div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="How can we help?"
            className="w-full p-3 pl-10 rounded-full bg-gray-100 text-sm focus:outline-none"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Floating Red Button */}
      {/* <div className="\ right-4 bg-red-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
        <FaBars className="text-white text-lg" />
      </div> */}
    </div>

   




       
<div className="py-2 space-y-6 w-[90%] mx-auto font-sans">
  {/* Current Balance */}
<div className="relative rounded-xl overflow-hidden shadow-md w-full">
      {/* Background image + dark overlay */}
      <div className="absolute inset-0">
        <img
          src={log1}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white p-5 py-[100px] flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Current Balance</p>
          <h3 className="text-3xl font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(userAmount)}
          </h3>

          {btcValue && (
            <p className="text-sm mt-2 text-white opacity-90">
              ≈ {btcValue} BTC 
            </p>
          )}
        </div>
        <button className="bg-white text-blue-600 p-2 rounded-full shadow-sm">
          <Plus />
        </button>
      </div>
    </div>


  {/* Upcoming Payments */}
 
</div>


<div className="py-6">
  <CoinGeckoWidget/> 
</div>
     

     {/* <div className="grid grid-cols-2 gap-2 p-2 lg:flex lg:flex-wrap lg:gap-3">
  <button
    className="flex items-center text-red-600 p-2 bg-purple-50 rounded-lg shadow w-full lg:w-[48%]"
    onClick={() => navigate("/send")}
  >
    <div className="bg-purple-100 p-2 rounded-lg">
      <span className="material-icons">send</span>
    </div>
    <p className="ml-2 text-sm font-semibold">Send Money</p>
  </button>

  <button
    className="flex items-center text-pink-600 p-2 bg-pink-50 rounded-lg shadow w-full lg:w-[48%]"
    onClick={() => navigate("/deposit")}
  >
    <div className="bg-red-500 p-2 rounded-lg">
      <span className="material-icons text-white">add</span>
    </div>
    <p className="ml-2 text-sm font-semibold">Add Money</p>
  </button>

  <button
    className="flex items-center text-yellow-600 p-2 bg-yellow-50 rounded-lg shadow w-full lg:w-[48%]"
    onClick={() => navigate("/loan")}
  >
    <div className="bg-yellow-100 p-2 rounded-lg">
      <span className="material-icons">account_balance_wallet</span>
    </div>
    <p className="ml-2 text-sm font-semibold">Loan</p>
  </button>

  <button
    className="flex items-center text-green-600 p-2 bg-green-50 rounded-lg shadow w-full lg:w-[48%]"
    onClick={() => navigate("/overview")}
  >
    <div className="bg-green-100 p-2 rounded-lg">
      <span className="material-icons">help</span>
    </div>
    <p className="ml-2 text-sm font-semibold">Need Help?</p>
  </button>
</div> */}


<SupportBot/>

 

        {/* Main Content */}
        <div className="p-4 space-y-4 bg-gray-100 ">
      {/* Welcome and Rewards */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <div className="flex justify-between"> 
          <p className="text-lg font-bold">Hello, {userName}</p>
           <span className="text-xl text-gray-400">&gt;</span>
        </div>
        <hr />
        

       <div className="flex gap-2 items-center">
  <div><FaArrowAltCircleRight className="text-blue-600" /></div>
  <div>
    <p className="font-medium">BitFiat Capital Mining Plan</p>
    <p className="text-sm text-gray-500">Start earning crypto daily with automated mining solutions</p>
  </div>
  <span className="text-xl text-gray-400">&gt;</span>
</div>


        <div className="flex justify-between items-center pt-2">
          <p className="font-medium">My Rewards</p>
          <span className="text-xl text-gray-400">&gt;</span>
        </div>
      </div>

      {/* Bank Balance */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
  {/* Header */}
  <div className="bg-blue-800 text-white px-5 py-3 text-xl font-semibold">
    BitFiat Capital
  </div>

  {/* Main Content */}
  <div className="p-4">
    <p className="text-sm text-gray-500">Crypto Wallet – BTC-5542</p>
    <div className="flex justify-between items-center mt-1">
      <p className="text-2xl font-bold">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(userAmount)}
      </p>

      <button
        onClick={() => setShowViewModal(true)}
        className="text-sm text-blue-800 font-semibold bg-blue-100 px-3 py-1 rounded-full"
      >
        VIEW
      </button>
    </div>
  </div>

  {/* Footer Link */}
  <div className="text-center text-blue-800 text-sm py-2 font-bold border-t cursor-pointer hover:bg-blue-50">
    OPEN NEW INVESTMENT
  </div>
</div>

    <div className="bg-white rounded-xl shadow overflow-hidden">
  {/* Card Body */}
  <div className="p-4">
    {/* Account Type */}
    <p className="text-sm text-gray-500">{accountType}</p>

    {/* Subtype and View Button */}
    <div className="flex justify-between items-center mt-1">
      <p className="text-2xl font-bold text-blue-900">{subType}</p>
      <button
        onClick={() => setShowViewModal(true)}
        className="text-sm text-blue-800 font-semibold bg-blue-100 px-3 py-1 rounded-full hover:bg-blue-200 transition"
      >
        VIEW
      </button>
    </div>
  </div>

  {/* Open New Investment CTA */}
  <div className="text-center text-blue-800 text-sm py-2 font-bold border-t cursor-pointer hover:bg-blue-50 transition">
    OPEN NEW INVESTMENT
  </div>
</div>


      {showViewModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4">
    <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-xl relative">
      <button
        onClick={() => setShowViewModal(false)}
        className="absolute top-2 right-4 text-gray-500 text-xl hover:text-black"
      >
        &times;
      </button>

      <h2 className="text-xl font-bold text-center mb-6">CURRENT INVESTMENT</h2>

      <div className="mb-6 text-sm text-gray-700">
        <p>Welcome, {userName} {userLastName}</p>
        <p>USER ID: <strong>{AcctNum}</strong></p>
        {/* <p>Routine Number: <strong>233293939</strong></p> */}
        <p>Account Balance: <strong>${userAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></p>
        {/* <p>Last Deposit Date: <strong>July 11, 2025</strong></p> */}
        <p> Reference Number: <strong>2234-WN7823490</strong></p>
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
              <td className="border px-3 py-2">2025-07-03</td>
              <td className="border px-3 py-2 text-green-600"> Investment</td>
              <td className="border px-3 py-2">
  {new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(userAmount)}
</td>

              <td className="border px-3 py-2 text-green-600">Success</td>
            </tr>
          </tbody>
        </table>
      </div>

     <p className="text-xs text-gray-500 text-center">
  This dashboard displays the most up-to-date status of your earnings with BitFiat Capital's Crypto Mining Program.<br />
  Your mining contribution has been securely verified and processed on our blockchain network. For assistance or to request a payout, please contact your assigned account manager.
</p>

    </div>
  </div>
)}


      {/* Open Savings CTA */}

     
    </div>



      </div>

      <div>
        
      </div>

<div className="p-5 bg-gray-100"> 
  
  <div className="bg-white rounded-xl shadow p-8 mb-5 px-5 py-3 ">
        <h2 className="text-xl font-bold">Cash Flow Monitor</h2>
        <p className="text-sm text-gray-600 mt-1">
          Get a comprehensive look at your day-to-day business.
        </p>
        <div className="mt-4 border-t pt-3">
          <p className="text-blue-800 text-sm  text-center font-bold cursor-pointer">VIEW CASH FLOW</p>
        </div>
      </div>
  <div className="bg-white rounded-xl shadow p-8  mb-[100px] px-5 py-3">
        <h2 className="text-xl font-bold">Link Your Accounts</h2>
        <p className="text-sm text-gray-600 mt-1">
         Access your Personal and Small Business accounts from this page.
        </p>
        <div className="mt-4 border-t pt-3">
          <p className="text-blue-800 text-sm  text-center font-bold cursor-pointer">CREATE LINK</p>
        </div>
      </div>

      <CoinGeckoWidget/>

      <div className="lg:w-2/3 mt-6  mb-[100px] lg:mt-0">
            {/* Cryptocurrency List */}
            <h2 className="text-gray-700 font-medium mb-4 px-4 lg:px-0">
              Top Cryptocurrencies
            </h2>
            <div className="space-y-4 px-4 lg:px-0">
              {loading ? (
                <p className="text-center text-gray-500">Loading crypto data...</p>
              ) : (
                cryptoData.map((coin) => (
                  <div
                    key={coin.id}
                    className="bg-white shadow-lg p-4 rounded-lg flex items-center justify-between hover:shadow-xl transition"
                  >
                    <div className="flex items-center">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-10 w-10 mr-4"
                      />
                      <div>
                        <p className="font-semibold">{coin.name}</p>
                        <p className="text-sm text-gray-500">
                          {coin.symbol.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 font-bold">
                        ${coin.current_price.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm ${
                          coin.price_change_percentage_24h > 0
                            ? "bg-green-500 text-white p-1"
                            : "text-[#fff] bg-red-500 p-1 "
                        }`}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>


 

</div>
    
     
     
     


{/* <StatComponent /> */}
<BottomNav/>
<BottomNav2/>

{/* <Blog/> */}
    </>
  );
};

export default Dashboard;
