import hero from "../assets/heroooo.png"
import { motion } from "framer-motion";



const Promotions = () => {
  return (
   
       <section className="bg-blue-50  py-20 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left: Text Content with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <h2 className="text-2xl  text-center lg:text-5xl font-extrabold text-blue-700 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            <strong>BitFiat Capital</strong> is a pioneering digital asset management firm, established in 2018 to help individuals and organizations harness the full potential of cryptocurrency mining.
            <br /><br />
            We offer seamless access to mining operations and early-stage investment in emerging blockchain technologies. Whether you're new to crypto or an enterprise scaling fast, our secure and intelligent platform is built to support your financial growth.
            <br /><br />
            At BitFiat Capital, we’re not just mining coins — we’re building the future of decentralized finance.
          </p>
        </motion.div>

        {/* Right: Animated Illustration/Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="lg:w-1/2"
        >
          <img
            src={hero} // Replace with your image path
            alt="Crypto Mining Illustration"
            className="w-full "
          />
        </motion.div>
      </div>
    </section>
    
  );
};

export default Promotions;
