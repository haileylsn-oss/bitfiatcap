import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const RatesSection = () => {
  const steps = [
    "Create your free account",
    "Verify your identity securely",
    "Choose a mining plan that fits your goals",
    "Watch your investment grow in real time",
  ];

  return (
    <>
    <section className="bg-white py-20 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading Animation */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl lg:text-5xl font-extrabold text-blue-800 text-center mb-10"
        >
          How BitFiat Capital Works
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              At <strong>BitFiat Capital</strong>, we simplify access to the world of
              crypto mining and digital asset growth.
              <br /><br />
              Our infrastructure is powered by state-of-the-art mining equipment and a secure, high-performance network—delivering consistent results for all participants.
              <br /><br />
              Whether you're starting small or managing large-scale investments, our system is designed to help you succeed in the crypto market.
            </p>

            <ul className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-blue-600 mt-1" size={20} />
                  <span className="text-blue-800 font-medium text-base leading-snug">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Image or Illustration (optional) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="lg:w-1/2"
          >
            {/* Add your image or animation here if needed */}
          </motion.div>
        </div>
      </div>
    </section>
     <section className="bg-blue-50 py-20 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl lg:text-5xl font-extrabold text-blue-800 text-center mb-10"
        >
          Why BitFiat Capital?
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Text Content */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              <strong>BitFiat Capital</strong> is a global leader in crypto asset management, offering a smart and secure way to mine top digital currencies without stress. Our mining platform is built to maximize returns using reliable technologies and industry-best practices.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              We utilize powerful networks across coins like <strong>ETH</strong>, <strong>USDT</strong>, and other major assets to enable safe and profitable crypto activities — all within a user-friendly ecosystem.
            </p>

            <p className="text-lg text-gray-800 leading-relaxed">
              We’re passionate about blockchain’s future and committed to helping you grow. Our team delivers valuable insights, trend analysis, and tools to help you make confident, informed investment decisions.
            </p>
          </motion.div>

          {/* Right: Embedded YouTube Widget */}
         <motion.div
  className="w-full"
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.3 }}
>
  <div className="w-full h-[400px] lg:h-[480px] rounded-xl overflow-hidden shadow-lg">
    <iframe
      src="https://www.youtube.com/embed/OZPHtoiEGWI"
      title="BitFiat Capital Introduction"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full rounded-xl"
    ></iframe>
  </div>
</motion.div>


        </div>
      </div>
    </section>
    </>
  );
};

export default RatesSection;
