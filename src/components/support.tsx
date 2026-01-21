// SupportBot.tsx

declare global {
  interface Window {
    tidioChatApi?: any;
  }
}

import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

const SupportBot = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Prevent loading Tidio twice
    if (document.getElementById("tidio-script")) return;

    const script = document.createElement("script");
    script.id = "tidio-script";
    script.async = true;
    script.src = "https://code.tidio.co/84evvjmmptqvocz3z64xjbo32mbosdki.js";
    script.charset = "UTF-8";

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
