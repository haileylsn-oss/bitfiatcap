import { Link } from "react-router-dom";
import cardImg from "../assets/pngtree.png";
import { motion } from "framer-motion";


const HeroSection = () => {




  return (
    <>
    <section className="relative bg-white overflow-hidden w-full">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side: Animated Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full lg:w-1/2 px-6 lg:px-16 py-16"
        >
         <h1 className="text-3xl uppercase lg:text-5xl font-extrabold text-blue-500 mb-6 mt-[100px] leading-tight">
  Fund Your Account & Earn Up to<br />4× Bitcoin Rewards with Daily Mining
</h1>


         <p className="text-gray-700 mb-6 text-base lg:text-lg">
  BitFiat Capital bridges modern banking with crypto mining innovation. 
  Fund your account and earn up to <strong>4× Bitcoin rewards</strong> through cloud mining, 
  enjoy <strong>3× returns</strong> on staking, and receive <strong>2× daily payouts</strong> 
  from referrals and GPU mining. With automated earnings, no maintenance fees, and a secure blockchain foundation, 
  growing your digital wealth has never been easier or more seamless.
</p>


          <Link to="/signup">
            <button className="bg-green-400 text-white px-6 py-3 font-semibold rounded hover:bg-black transition">
              START MINING NOW
            </button>
          </Link>
        </motion.div>

        {/* Right Side: Bouncing Image */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full lg:w-1/2"
        >
          <img
            src={cardImg}
            alt="Mining dashboard and bitcoin graphics"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
   </>
  );
};

export default HeroSection;
