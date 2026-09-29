import React, { useState } from "react";
import {
  Mail,
  Bell,
  ShieldCheck,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle,
  Info,
  X,
} from "lucide-react";

import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";
import SupportBot from "./support";

type Message = {
  id: number;
  icon: React.ReactNode;
  subject: string;
  preview: string;
  full: string;
  date: string;
  unread: boolean;
  type: "account" | "transaction" | "security" | "general";
};

const messages: Message[] = [
  {
    id: 1,
    icon: <Bell className="text-blue-600" size={23} />,
    subject: "Welcome to your account",
    preview:
      "Your account is ready. You can now access your banking and account features.",
    full: `Welcome to your account.

Your account setup is complete and your banking dashboard is now available.

From your dashboard, you can manage your account, review transaction history, send money, purchase crypto, make bill payments, and manage your withdrawal requests.

If you need any assistance, our support team is available to help.`,
    date: "September 29, 2026",
    unread: true,
    type: "account",
  },

  {
    id: 2,
    icon: <ShieldCheck className="text-green-600" size={23} />,
    subject: "Account security reminder",
    preview:
      "Keep your account secure by protecting your login information and verification details.",
    full: `Account Security Reminder

For your security, please keep your login information private and avoid sharing your password or verification codes with anyone.

We also recommend reviewing your account activity regularly and contacting support if you notice anything you do not recognize.

Thank you for helping us keep your account secure.`,
    date: "September 28, 2026",
    unread: true,
    type: "security",
  },




  {
    id: 5,
    icon: <CreditCard className="text-purple-600" size={23} />,
    subject: "Banking services available",
    preview:
      "Explore the available payment, transfer, bill payment and crypto services on your account.",
    full: `Banking Services

Your account gives you access to a range of available banking services.

You can use your dashboard to:

• Send money
• Request withdrawals
• Purchase crypto
• Pay supported bills
• Review your transaction history
• Manage your account information

Please make sure your account information remains up to date.`,
    date: "September 22, 2026",
    unread: false,
    type: "general",
  },


  {
    id: 7,
    icon: <Info className="text-blue-500" size={23} />,
    subject: "Account information",
    preview:
      "Remember to keep your account and contact information up to date.",
    full: `Account Information

Keeping your account information up to date helps us provide you with important notifications and account updates.

Please review your profile information from time to time and make sure your contact details are correct.

If you need to update any information that you cannot change from your dashboard, contact support.`,
    date: "September 18, 2026",
    unread: false,
    type: "account",
  },
];

const InboxPage: React.FC = () => {
  const [selectedMessage, setSelectedMessage] =
    useState<Message | null>(null);

  const unreadCount = messages.filter((message) => message.unread).length;

  const getTypeLabel = (type: Message["type"]) => {
    switch (type) {
      case "transaction":
        return "Transaction";
      case "security":
        return "Security";
      case "account":
        return "Account";
      default:
        return "General";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">

          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm mb-5">
            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Mail size={22} />
                </div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Inbox
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    Account notifications and updates
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {messages.map((msg) => (
              <button
                key={msg.id}
                type="button"
                onClick={() => setSelectedMessage(msg)}
                className={`w-full text-left bg-white border rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all ${
                  msg.unread
                    ? "border-blue-200 bg-blue-50/30"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                      msg.unread
                        ? "bg-white shadow-sm"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`text-sm sm:text-base font-semibold ${
                          msg.unread
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {msg.subject}
                      </h3>

                      {msg.unread && (
                        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>

                    <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">
                      {msg.preview}
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                     

                      <span className="text-gray-300">•</span>

                      <span
                        className={`text-[11px] font-medium ${
                          msg.type === "transaction"
                            ? "text-green-600"
                            : msg.type === "security"
                            ? "text-orange-600"
                            : "text-blue-600"
                        }`}
                      >
                        {getTypeLabel(msg.type)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Empty state */}
          {messages.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <Mail
                size={40}
                className="mx-auto text-gray-300 mb-3"
              />

              <h3 className="text-base font-semibold text-gray-800">
                No messages
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                You don't have any messages at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {selectedMessage.icon}
                </div>

                <div>
                

                  <p className="text-xs font-medium text-blue-600 mt-0.5">
                    {getTypeLabel(selectedMessage.type)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 hover:text-gray-800 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedMessage.subject}
              </h2>

              <div className="text-sm leading-7 text-gray-600 whitespace-pre-line">
                {selectedMessage.full}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
      <BottomNav2 />
      <SupportBot />
    </>
  );
};

export default InboxPage;