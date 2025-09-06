import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const InvestmentPlans = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-center text-blue-900 mb-12"
        >
          Investment Plans
        </motion.h2>

        {/* Investment Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Premium Plan</h3>
          <p className="text-gray-600 mb-4">Interest: <strong>3.00%</strong></p>
          <ul className="text-gray-700 space-y-2">
            <li><FaCheckCircle className="inline text-green-500 mr-2" /> Duration: 2 day(s)</li>
            <li><FaCheckCircle className="inline text-green-500 mr-2" /> Min Deposit: $5,000</li>
            <li><FaCheckCircle className="inline text-green-500 mr-2" /> Max Deposit: $15,000</li>
            <li><FaCheckCircle className="inline text-green-500 mr-2" /> Instant Payout</li>
            <li><FaCheckCircle className="inline text-green-500 mr-2" /> Principal Included</li>
          </ul>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">FAQs</h2>
        <p className="text-center text-gray-600 mb-10">
          If you want to ask something — please try to find the answer first below.
        </p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-blue-800 mb-2">
              How many accounts can I register?
            </h3>
            <p className="text-gray-700">
              One user can register one account for each payment system. Multiple registrations to receive partner remuneration are prohibited and will result in the blocking of all related accounts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-blue-800 mb-2">
              How to register?
            </h3>
            <p className="text-gray-700">
              The registration process is simple and takes only a few seconds. To register, enter the wallet address (BTC / ETH / LTC / DOGE / PerfectMoney) on the homepage and click the <strong>LOG IN</strong> button.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
