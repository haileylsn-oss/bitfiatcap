import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./stickyNav";
import { FiSettings } from "react-icons/fi";
import BottomNav2 from "./bottomnav2";
import lol from "../assets/logo.png";
import {
  fetchHistoryForLoggedUser,
  Transaction,
} from "../backend/api";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    profilePicture: string;
    amount: number;
    email?: string;
  } | null>(null);

  const navigate = useNavigate();

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : "";

  const [activeModal, setActiveModal] = useState<string | null>(null);

  // ==============================
  // STATEMENT STATES
  // ==============================

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [statementLoading, setStatementLoading] = useState(false);

  // Current month by default
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const date = new Date();

    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
  });

  // ==============================
  // LOAD USER
  // ==============================

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse logged in user:", error);
      }
    }
  }, []);

  // ==============================
  // LOAD TRANSACTION HISTORY
  // ==============================

  useEffect(() => {
    const loadHistory = async () => {
      if (!user?.email) return;

      setStatementLoading(true);

      try {
        const history = await fetchHistoryForLoggedUser(user.email);

        setTransactions(history);
      } catch (error) {
        console.error("Failed to load transaction history:", error);
        setTransactions([]);
      } finally {
        setStatementLoading(false);
      }
    };

    loadHistory();
  }, [user?.email]);

  // ==============================
  // FORMAT AMOUNT
  // ==============================

  const formatAmount = (amount: number | string) => {
    const numericAmount = Number(
      String(amount)
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "")
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

  // ==============================
  // FILTER STATEMENTS BY MONTH
  // ==============================

  const filteredTransactions = transactions.filter((transaction) => {
    if (!transaction.date) return false;

    return transaction.date.startsWith(selectedMonth);
  });

  // ==============================
  // STATEMENT TOTALS
  // ==============================

  const totalDebit = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() === "debit"
    )
    .reduce((total, transaction) => {
      const amount = Number(
        String(transaction.amount)
          .replace(/,/g, "")
          .replace(/[^\d.-]/g, "")
      );

      return total + (isNaN(amount) ? 0 : amount);
    }, 0);

  const totalDeposits = filteredTransactions
    .filter(
      (transaction) =>
        transaction.type?.toLowerCase() !== "debit" &&
        transaction.type?.toLowerCase() !== "pending"
    )
    .reduce((total, transaction) => {
      const amount = Number(
        String(transaction.amount)
          .replace(/,/g, "")
          .replace(/[^\d.-]/g, "")
      );

      return total + (isNaN(amount) ? 0 : amount);
    }, 0);

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    setIsLoading(true);

    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  // ==============================
  // MODAL
  // ==============================

  const Modal = ({
    title,
    content,
    onClose,
  }: {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-semibold mb-4">
          {title}
        </h2>

        <div className="mb-4">
          {content}
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-sm border-2 border-black text-black px-3 py-1 rounded hover:bg-black hover:text-white"
        >
          X
        </button>

      </div>
    </div>
  );

  // ==============================
  // LOADING SCREEN
  // ==============================

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen z-10">

        <div className="bg-white p-6 w-80 flex flex-col items-center">

          <img
            src={lol}
            alt="Loading illustration"
            className="w-[200px] h-32 object-contain mb-4"
          />

          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-red-500 border-dotted rounded-full animate-spin"></div>
          </div>

        </div>

      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-4 md:px-8 lg:px-16">

        <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl overflow-hidden">

          {/* HEADER */}
          <header className="bg-[#000] text-white py-6 md:py-8">

            <h1 className="text-2xl md:text-3xl font-semibold p-2">
              <FiSettings className="text-2xl" />
            </h1>

          </header>

          {/* PROFILE IMAGE */}
          <div className="flex justify-center relative -mt-12">

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-500 shadow-md">

              <img
                src={
                  user?.profilePicture ||
                  "/src/assets/default-avatar.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

          <div className="p-6 md:p-8 space-y-8">

            {/* ==============================
                PROFILE SETTINGS
            ============================== */}

            <div>

              <h2 className="text-sm font-bold text-gray-700 mb-4">
                Profile Settings
              </h2>

              <ul className="space-y-4">

                {[
                  {
                    key: "profile",
                    name: fullName || "User",
                    sub: "Profile Settings",
                    action: "Edit",
                  },
                  {
                    key: "limits",
                    name: "Account Limits",
                    sub: "View account limits",
                    action: "View",
                  },
                  {
                    key: "statements",
                    name: "Statements & Reports",
                    sub: "View your monthly transaction history.",
                  },
                  {
                    key: "referrals",
                    name: "Referrals",
                    sub: "View your referral information.",
                  },
                  {
                    key: "support",
                    name: "24/7 Help Center",
                    sub: "Have an issue? Speak to our team.",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => setActiveModal(item.key)}
                  >

                    <div className="flex items-center space-x-3">

                      <FiSettings className="text-2xl" />

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {item.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.sub}
                        </p>
                      </div>

                    </div>

                    {item.action && (
                      <button className="text-purple-500 text-sm font-semibold">
                        {item.action}
                      </button>
                    )}

                  </li>
                ))}

              </ul>

            </div>

            {/* ==============================
                MODALS
            ============================== */}

            {activeModal && (
              <Modal
                title={(() => {
                  switch (activeModal) {
                    case "profile":
                      return "Edit Profile";

                    case "limits":
                      return "Account Limits";

                    case "statements":
                      return "Statements & Reports";

                    case "referrals":
                      return "Referrals";

                    case "support":
                      return "Help Center";

                    default:
                      return "";
                  }
                })()}

                content={(() => {

                  // ==============================
                  // PROFILE
                  // ==============================

                  switch (activeModal) {

                    case "profile":
                      return (
                        <div>

                          <p>
                            Edit your profile info here.
                          </p>

                          <img
                            src={user?.profilePicture}
                            alt=""
                            className="w-[100px] rounded-full h-[100px] border-4 border-purple-500 m-auto mt-5"
                          />

                          <div className="mt-5">
                            <label className="text-sm font-medium">
                              First Name
                            </label>

                            <input
                              type="text"
                              value={user?.firstName || ""}
                              className="border-2 mt-2 px-2 py-2 w-full"
                              readOnly
                            />
                          </div>

                          <div className="mt-4">
                            <label className="text-sm font-medium">
                              Last Name
                            </label>

                            <input
                              type="text"
                              value={user?.lastName || ""}
                              className="border-2 mt-2 px-2 py-2 w-full"
                              readOnly
                            />
                          </div>

                        </div>
                      );

                    // ==============================
                    // ACCOUNT LIMIT
                    // ==============================

                    case "limits":
                      return (
                        <>
                          <p className="text-xl font-bold">
                            {(
                              (user?.amount ?? 0) * 0.01
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            Current account limit
                          </p>

                          <button className="bg-black text-white px-4 py-2 mt-3 hover:bg-transparent hover:border-2 hover:border-black hover:text-black">
                            Upgrade Limit
                          </button>
                        </>
                      );

                    // ==============================
                    // STATEMENTS
                    // ==============================

                    case "statements":
                      return (
                        <div className="space-y-5">

                          {/* MONTH FILTER */}

                          <div className="bg-gray-50 border rounded-lg p-4">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Select Month
                            </label>

                            <input
                              type="month"
                              value={selectedMonth}
                              onChange={(e) =>
                                setSelectedMonth(e.target.value)
                              }
                              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                            />

                          </div>

                          {/* SUMMARY */}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            <div className="bg-red-50 border border-red-100 rounded-lg p-4">

                              <p className="text-xs text-gray-500">
                                Total Debit
                              </p>

                              <p className="text-lg font-bold text-red-600">
                                {formatAmount(totalDebit)}
                              </p>

                            </div>

                            <div className="bg-green-50 border border-green-100 rounded-lg p-4">

                              <p className="text-xs text-gray-500">
                                Total Deposits
                              </p>

                              <p className="text-lg font-bold text-green-600">
                                {formatAmount(totalDeposits)}
                              </p>

                            </div>

                          </div>

                          {/* HISTORY */}

                          {statementLoading ? (

                            <div className="py-10 text-center">

                              <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-3"></div>

                              <p className="text-sm text-gray-500">
                                Loading statement...
                              </p>

                            </div>

                          ) : filteredTransactions.length === 0 ? (

                            <div className="text-center py-10">

                              <p className="text-sm text-gray-500">
                                No transactions found for this month.
                              </p>

                            </div>

                          ) : (

                            <div className="space-y-3">

                              {filteredTransactions.map(
                                (transaction, index) => {

                                  const transactionType =
                                    transaction.type?.toLowerCase();

                                  return (
                                    <div
                                      key={index}
                                      className="border rounded-lg p-4 hover:bg-gray-50 transition"
                                    >

                                      <div className="flex justify-between items-start gap-4">

                                        <div>

                                          <p className="text-xs text-gray-400">
                                            {transaction.date}
                                          </p>

                                          <p className="text-sm font-semibold text-gray-800 mt-1">
                                            {transaction.description}
                                          </p>

                                        </div>

                                        <p
                                          className={`font-bold whitespace-nowrap ${
                                            transactionType ===
                                            "debit"
                                              ? "text-red-600"
                                              : transactionType ===
                                                "pending"
                                              ? "text-yellow-500"
                                              : "text-green-600"
                                          }`}
                                        >
                                          {formatAmount(
                                            transaction.amount
                                          )}
                                        </p>

                                      </div>

                                      <div className="mt-3">

                                        <span
                                          className={`text-xs px-2 py-1 rounded-full ${
                                            transactionType ===
                                            "debit"
                                              ? "bg-red-100 text-red-600"
                                              : transactionType ===
                                                "pending"
                                              ? "bg-yellow-100 text-yellow-700"
                                              : "bg-green-100 text-green-600"
                                          }`}
                                        >
                                          {transactionType ===
                                          "debit"
                                            ? "Debit"
                                            : transactionType ===
                                              "pending"
                                            ? "Pending"
                                            : "Deposit"}
                                        </span>

                                      </div>

                                    </div>
                                  );
                                }
                              )}

                            </div>

                          )}

                        </div>
                      );

                    // ==============================
                    // REFERRALS
                    // ==============================

                    case "referrals":
                      return (
                        <div className="space-y-5">

                          <div className="bg-gray-50 border rounded-lg p-5">

                            <p className="text-xs text-gray-500 mb-1">
                              Referral Name
                            </p>

                            <p className="text-xl font-bold text-gray-900">
                              Alma Shell
                            </p>

                          </div>

                          <div className="bg-gray-50 border rounded-lg p-5">

                            <p className="text-xs text-gray-500 mb-1">
                              Referral Status
                            </p>

                            <p className="text-sm font-semibold text-green-600">
                              Active
                            </p>

                          </div>

                          <div className="bg-gray-50 border rounded-lg p-5">

                            <p className="text-xs text-gray-500 mb-1">
                              Referral Reward
                            </p>

                            <p className="text-xl font-bold">
                              $0.00
                            </p>

                          </div>

                        </div>
                      );

                    // ==============================
                    // SUPPORT
                    // ==============================

                    case "support":
                      return (
                        <div>

                          <p className="text-gray-700">
                            Contact support anytime for assistance with your account.
                          </p>

                          <button
                            onClick={() => setActiveModal(null)}
                            className="bg-black text-white px-4 py-2 mt-5 rounded"
                          >
                            Close
                          </button>

                        </div>
                      );

                    default:
                      return null;
                  }

                })()}

                onClose={() => setActiveModal(null)}
              />
            )}

            {/* ==============================
                PASSWORD & SECURITY
            ============================== */}

            <div>

              <h2 className="text-sm font-bold text-gray-700 mb-4">
                Password & Security
              </h2>

              <ul className="space-y-4">

                <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition">

                  <span className="text-sm font-medium text-gray-800">
                    Update Password
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>

                </li>

                <li
                  onClick={handleLogout}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >

                  <span className="text-sm font-medium text-gray-800">
                    Log out
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>

                </li>

              </ul>

            </div>

          </div>

          <footer className="text-center text-gray-500 text-xs py-4 bg-gray-50">
            Version 9.8.0
          </footer>

        </div>

      </div>

      <BottomNav />
      <BottomNav2 />

    </>
  );
};

export default SettingsPage;