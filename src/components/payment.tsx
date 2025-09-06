import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowCircleLeft,
  FaPiggyBank,
  FaBitcoin,
  FaChartLine,
  FaHandHoldingUsd,
  FaLandmark,
  FaHandshake,
  FaHome,
} from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";

import axios from "axios";







type Investment = {
  id: number;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
};


const investments = [
  {
    id: 1,
    name: "Savings Account",
    icon: <FaPiggyBank />,
    color: "text-pink-600",
    description:
      "A savings account lets you safely store money and earn a small interest over time.",
  },
  {
    id: 2,
    name: "Cryptocurrency",
    icon: <FaBitcoin />,
    color: "text-yellow-500",
    description:
      "Invest in digital currencies like Bitcoin or Ethereum. High risk, high reward.",
  },
  {
    id: 3,
    name: "Stocks & ETFs",
    icon: <FaChartLine />,
    color: "text-green-600",
    description:
      "Buy shares of companies or ETFs for long-term growth and dividends.",
  },
  {
    id: 4,
    name: "Mutual Funds",
    icon: <FaHandHoldingUsd />,
    color: "text-indigo-600",
    description:
      "Pooled investments managed by professionals. Good for diversification.",
  },
  {
    id: 5,
    name: "Government Bonds",
    icon: <FaLandmark />,
    color: "text-blue-500",
    description:
      "Low-risk fixed-income securities issued by governments.",
  },
  {
    id: 6,
    name: "Real Estate",
    icon: <FaHome />,
    color: "text-orange-500",
    description:
      "Invest in residential or commercial properties for rental income and growth.",
  },
  {
    id: 7,
    name: "Partnerships",
    icon: <FaHandshake />,
    color: "text-purple-600",
    description:
      "Invest in or partner with businesses to share in their profits.",
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [formData, setFormData] = useState({ name: "", amount: "", method: "" });


  const TELEGRAM_BOT_TOKEN = "7209378307:AAFwbPLs8HnjDfzAfg19PGdQMxdtQLCumlc";
const TELEGRAM_CHAT_ID = "7139332395";

const sendToTelegram = async (name: string, amount: string, investmentType: string) => {
  const message = `
🚀 *New Investment Request* 🚀

👤 Name: ${name}
💼 Investment Type: ${investmentType}
💰 Amount: $${amount}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });
    // alert("Details sent to Telegram successfully.");
  } catch (err) {
    console.error("Telegram Error:", err);
    
  }
};



 const handleProceed = () => {
  const { name, amount } = formData;

  if (!name || !amount || !selectedInvestment) {
    alert("Please fill out all fields.");
    return;
  }

  sendToTelegram(name, amount, selectedInvestment.name); // ✅ Call the function properly

  // Then navigate or do whatever is next
  navigate("/payment", { state: formData });
};


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center px-4 py-6">
        <header className="w-full flex items-center justify-between py-4 border-b max-w-4xl">
          <button
            className="text-2xl text-purple-600 hover:text-purple-800 transition"
            onClick={() => navigate(-1)}
          >
            <FaArrowCircleLeft />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Investment Options</h1>
          <div className="w-8" />
        </header>

        <div className="w-full max-w-4xl mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {investments.map((item) => (
            <div
              key={item.id}
              className="bg-white backdrop-blur-sm bg-opacity-80 border border-gray-100 shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => setSelectedInvestment(item)}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 ${item.color}`}
                >
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-800">{item.name}</span>
              </div>
              <AiOutlineInfoCircle className="text-gray-400 hover:text-gray-600 text-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal with form */}
      {selectedInvestment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-gray-800">{selectedInvestment.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{selectedInvestment.description}</p>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount to Invest"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
            >
              <option value="">Select Payment Method</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="Wire Transfer">Wire Transfer</option>
            </select>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedInvestment(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleProceed}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default PaymentPage;
