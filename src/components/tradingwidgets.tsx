import { motion } from "framer-motion";

import { CheckCircle } from "lucide-react";

const TradingWidgets = () => {
  return (
    <>
    <section className="w-full bg-white py-10 px-4">

        <div>
            <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-extrabold text-blue-800 text-center mb-3"
        > Martket Chart  </motion.h2>
 <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-3"
        >  <p className="text-lg  text-center text-gray-800 leading-relaxed">Live Market Index of The Forex and Crypto Market  </p> </motion.div>
        </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BTC Widget */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22COINBASE%3ABTCUSD%22%2C%22width%22%3A%22100%25%22%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22height%22%3A126%2C%22utm_source%22%3A%22minebithopper.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22minebithopper.com%2F%22%7D"
            title="BTCUSD Quote"
            height="126"
            width="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            style={{ display: 'block' }}
          ></iframe>
        </div>

        {/* EURUSD Widget */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FX%3AEURUSD%22%2C%22width%22%3A%22100%25%22%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22height%22%3A126%2C%22utm_source%22%3A%22minebithopper.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22minebithopper.com%2F%22%7D"
            title="EURUSD Quote"
            height="126"
            width="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            style={{ display: 'block' }}
          ></iframe>
        </div>

        {/* ETHUSD Widget */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FX%3AETHUSD%22%2C%22width%22%3A%22100%25%22%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22height%22%3A126%2C%22utm_source%22%3A%22minebithopper.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22minebithopper.com%2F%22%7D"
            title="ETHUSD Quote"
            height="126"
            width="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            style={{ display: 'block' }}
          ></iframe>
        </div>

        {/* GBPUSD Widget (script alternative method) */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FX%3AGBPUSD%22%2C%22width%22%3A%22100%25%22%2C%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22height%22%3A126%2C%22utm_source%22%3A%22minebithopper.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22minebithopper.com%2F%22%7D"
            title="GBPUSD Quote"
            height="126"
            width="100%"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
            style={{ display: 'block' }}
          ></iframe>
        </div>
      </div>
    </section>
    
    <section className=" text-blue-800 py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <img
            src="https://wallet.bitcoin.com/images/uploads/homepage-hero-sm.png"
            alt="mobile apps"
            className="w-full max-w-sm mx-auto"
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What are the fees for mining with us?
          </h2>
          <p className="text-lg text-blue-600 mb-6">
            Promote the world's leading crypto mining earning network.
            Partner up with us and our online community.
          </p>

          <ul className="space-y-4">
            {[
              "Portfolio diversity",
              "Profitable Weeks",
              "Responsible Mining Policy",
              "Customer Service Center",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1" />
                <p className="text-base text-blue-600">{item}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default TradingWidgets;
