// SupportBot.tsx

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}

import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

const SupportBot = () => {
  useEffect(() => {
    // Prevent SSR / build errors
    if (typeof window === "undefined") return;

    // Prevent loading Smartsupp twice
    if (window.smartsupp) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "44db08d5f358696fd63fd8a6861a244113ca65d0";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.smartsuppchat.com/loader.js";

    document.body.appendChild(script);
  }, []);

  return (
    <div className="fixed bottom-[100px] left-5 z-[9999] flex flex-col items-center space-y-1">
      <button
        onClick={() =>
          (window.location.href = "mailto:danbraunstein57@gmail.com")
        }
        aria-label="Email Support"
        className="p-3 rounded-full shadow-lg bg-blue-800 hover:bg-blue-700 text-white transition"
      >
        <FaEnvelope size={18} />
      </button>

      <span className="text-sm text-black font-bold">Email Us</span>
    </div>
  );
};

export default SupportBot;
