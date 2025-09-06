import { motion } from "framer-motion";
import {  ShieldCheck, Star, Globe, Wallet, PiggyBank, Gift } from "lucide-react";

const features = [
  {
    title: "Safe & Secure",
    icon: ShieldCheck,
    description:
      "We use enterprise-grade security, SSL encryption, and DDoS protection to keep your assets and personal data safe."
  },
  {
    title: "Early Bonus",
    icon: Gift,
    description:
      "No commission on deposits or referrals. Earn instant bonuses on registration and enjoy extra incentives."
  },
  {
    title: "Universal Access",
    icon: Globe,
    description:
      "Our platform is designed for both individuals and corporate clients—anywhere, anytime."
  },
  {
    title: "Asset Management",
    icon: Wallet,
    description:
      "We help manage your crypto portfolio with expert insights to ensure optimal growth and returns."
  },
  {
    title: "Low Cost",
    icon: PiggyBank,
    description:
      "Full access to manage your details, assets, and withdrawals—without hidden fees."
  },
  {
    title: "Multiple Income Streams",
    icon: Star,
    description:
      "Participate in a wide range of mining pools and crypto projects—all without markups or volume limits."
  }
];

const PlatformOverview = () => {
  return (
    <section className="bg-blue-50 py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-extrabold text-blue-800 text-center mb-14"
        >
          Why Choose BitFiat Capital
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <Icon className="text-blue-700" size={28} />
                <h3 className="text-xl font-bold text-blue-900">{title}</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* About Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-blue-800 mb-6">About Us</h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            BitFiat Capital offers a unique opportunity to grow your income through crypto mining and participation in
            high-performance mining pools. Our platform uses proof-of-mining mechanisms and cloud technologies to
            validate blockchain transactions and generate capital securely and efficiently.
            <br />
            <br />
            By working in two powerful directions—on-chain validation and cloud-based crypto generation—we ensure stable
            profits and consistent payouts. Our team operates 24/7 to deliver maximum satisfaction and the most
            successful mining results for all our associates.
          </p>
        </motion.div>

        {/* Roadmap Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-blue-800 mb-6">Our Roadmap</h3>
          <p className="text-lg text-gray-800 leading-relaxed">
            BitFiat Capital is leading the global fintech revolution with one of the world's most trusted social mining
            platforms. With thousands of registered users and an expanding ecosystem of crypto-earning tools, we're
            reshaping the way people earn, manage, and multiply digital wealth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformOverview;
