// SupportBot.tsx

import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

declare global {
  interface Window {
    smartsupp?: any;
    _smartsupp?: {
      key?: string;
      [key: string]: any;
    };
  }
}

const SupportBot = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent loading Smartsupp more than once
    if (document.getElementById("smartsupp-script")) return;

    // Configure Smartsupp
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key =
      "b071ed6ac6bf9d525cb4df1f52741751d8e50075";

    // Create Smartsupp script
    const script = document.createElement("script");
    script.id = "smartsupp-script";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js";

    const firstScript = document.getElementsByTagName("script")[0];

    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    return () => {
      // Keep the chat script loaded during component remounts.
    };
  }, []);

  return (
    <div className="fixed bottom-[100px] left-5 z-[9999] flex flex-col items-center space-y-1">
      <button
        onClick={() => {
          window.location.href = "mailto:danbraunstein57@gmail.com";
        }}
        aria-label="Email Support"
        className="p-3 rounded-full shadow-lg bg-blue-800 hover:bg-blue-700 text-white transition"
      >
        <FaEnvelope size={18} />
      </button>

      <span className="text-sm text-black font-bold">
        Email Us
      </span>
    </div>
  );
};

export default SupportBot;