import  { useState } from "react";
import { MailWarning, ShieldAlert, CreditCard, Info, CheckCircle } from "lucide-react";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";
import SupportBot from "./support";

type Message = {
  id: number;
  icon: JSX.Element;
  subject: string;
  preview: string;
  full: string;
  date: string;
  unread: boolean;
};



const messages: Message[] = [
  {
    id: 1,
    icon: <ShieldAlert className="text-red-600" size={24} />,
    subject: "Withdrawal Restricted: Tier-2 Clearance Required",
    preview: "Your BitFiat account requires Tier-2 Unlock to enable withdrawals and outbound transactions.",
    full: `🚫 Withdrawal Access Restricted – Tier-2 Clearance Required.

To proceed with withdrawals or external transfers, your account must meet Tier-2 compliance. A reserve unlock transaction of $107,544.00 USD is required to complete this process.`,
    date: "July 5, 2025",
    unread: true,
  },
  {
    id: 2,
    icon: <MailWarning className="text-yellow-500" size={24} />,
    subject: "Action Required: KYC Verification Incomplete",
    preview: "Your KYC verification is still pending. Update your documents to continue full access.",
    full: `We've noticed your KYC (Know Your Customer) verification is incomplete. 
To avoid any disruption in your mining or banking features, please log in and upload the necessary documents.`,
    date: "July 3, 2025",
    unread: true,
  },
  {
    id: 3,
    icon: <CreditCard className="text-green-600" size={24} />,
    subject: "Virtual Debit Card Approved",
    preview: "Your BitFiat virtual debit card has been approved and will be issued shortly.",
    full: `Great news! Your BitFiat Capital virtual debit card has been successfully approved. 
The card will be linked to your wallet and issued within 2–3 business days.`,
    date: "July 1, 2025",
    unread: true,
  },
  {
    id: 4,
    icon: <Info className="text-blue-500" size={24} />,
    subject: "New Update: Mining & Wallet Insights",
    preview: "Monitor earnings and spending with the new performance dashboard.",
    full: `A new analytics feature is now available on your BitFiat dashboard. 
Track your mining performance, wallet activity, and spending insights in real-time.`,
    date: "June 29, 2025",
    unread: false,
  },
  {
    id: 5,
    icon: <CheckCircle className="text-green-500" size={24} />,
    subject: "KYC Verified — Full Access Granted",
    preview: "Your identity verification is now complete. Enjoy unrestricted access to all features.",
    full: `Congratulations! Your KYC verification has been successfully completed. 
You now have full access to mining rewards, banking services, and referral payouts within BitFiat Capital.`,
    date: "June 25, 2025",
    unread: false,
  },
];


const InboxPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);


  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-red-800 text-center"> Inbox </h1>

        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition flex items-start gap-4 bg-white ${
                msg.unread ? "border-l-4 border-red-600 bg-red-50/30" : "border-gray-200"
              }`}
            >
              <div className="mt-1">{msg.icon}</div>
              <div className="flex-1">
                <h3 className={`text-base font-semibold ${msg.unread ? "text-red-700" : "text-gray-800"}`}>
                  {msg.subject}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{msg.preview}</p>
              </div>
              <div className="text-sm text-gray-500 text-right">
                <p>{msg.date}</p>
                {msg.unread && (
                  <span className="text-xs text-white bg-red-600 px-2 py-0.5 rounded-full ml-1">
                    Unread
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
            >
              &times;
            </button>
            <div className="mb-3">{selectedMessage.icon}</div>
            <h2 className="text-xl font-bold text-red-700 mb-2">{selectedMessage.subject}</h2>
            <p className="text-gray-700 text-sm whitespace-pre-line">{selectedMessage.full}</p>
            <p className="text-xs text-gray-400 mt-4">{selectedMessage.date}</p>
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
