// SupportBot.tsx

declare global {
  interface Window {
    Tawk_API?: any;
    Tawk_LoadStart?: Date;
  }
}

import { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";

const SupportBot = () => {
  useEffect(() => {
    // Prevent SSR / build errors
    if (typeof window === "undefined") return;

    // Prevent loading Tawk twice
    if (window.Tawk_API) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://embed.tawk.to/696f737f1090e9198185fb73/1jfdlmaif";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

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
