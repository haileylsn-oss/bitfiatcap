
import React from "react";
import { Link } from "react-router-dom";
import {
  FaPaperPlane,
  FaBitcoin,
  FaUniversity,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "Send",
      icon: <FaPaperPlane />,
      route: "/send",
    },
    {
      title: "Buy Crypto",
      icon: <FaBitcoin />,
      route: "/buy",
    },
    {
      title: "Withdrawal",
      icon: <FaUniversity />,
      route: "/withdrawal",
    },
    {
      title: "Bills",
      icon: <FaFileInvoiceDollar />,
      route: "/bills",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-5">
     

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.route}
            className="group flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition"
          >
            <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-lg group-hover:bg-blue-900 group-hover:text-white transition">
              {action.icon}
            </div>

            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-900 text-center">
              {action.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
