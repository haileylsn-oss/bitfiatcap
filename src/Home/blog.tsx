import { useState } from "react";
import img1 from "../assets/bank1.jpg";
import img2 from "../assets/bank2.jpg";
import img3 from "../assets/bank3.jpg";
import img4 from "../assets/bank4.jpg";
import img5 from "../assets/bank5.jpg";

const articles = [
  {
    title: "The Future of Digital Banking",
    description:
      "As technology continues to reshape the financial landscape, Apex Bank remains at the forefront of digital innovation. From intuitive mobile banking apps to AI-powered financial insights, our mission is to make banking easier, safer, and more personalized than ever before. In this article, we dive into how our digital platforms are enhancing user experience, reducing wait times, and enabling customers across Italy to take full control of their finances with just a few taps. Join us as we explore the exciting future of banking at your fingertips.",
    image: img1,
  },
  {
    title: "How to Protect Your Savings",
    description:
      "Your savings are the cornerstone of your financial security—and Apex Bank is committed to helping you protect them. In this comprehensive guide, we share practical steps you can take to avoid scams, choose strong passwords, enable two-factor authentication, and recognize phishing attempts. Learn how to build an emergency fund, diversify your assets, and take advantage of our advanced fraud prevention tools. Whether you're just starting to save or already have a nest egg, this article offers crucial advice for securing your future.",
    image: img2,
  },
  {
    title: "Apex Bank's New Loan Policies",
    description:
      "Understanding the evolving financial needs of our customers, Apex Bank has updated its loan policies to better support small businesses, homeowners, and individual borrowers. This article outlines the new flexible repayment options, lower interest rates, and simplified application processes we’ve introduced. We also explain how our personalized loan advisors can help tailor solutions to your specific goals, whether you're launching a new business or renovating your home. Read more to see how these changes are designed to fuel growth and financial empowerment throughout Italy.",
    image: img3,
  },
  {
    title: "Sustainable Banking with Apex",
    description:
      "At Apex Bank, we believe in a future where financial growth and environmental responsibility go hand in hand. This article highlights our green initiatives, from financing eco-friendly businesses and renewable energy projects to offering sustainable investment options for our clients. Learn how we're reducing our own carbon footprint, supporting local environmental causes, and partnering with organizations across Italy to create a more sustainable banking system. Join us in our mission to build a greener, more responsible future for generations to come.",
    image: img4,
  },
  {
    title: "New Branches Opening Across Italy",
    description:
      "We’re excited to announce the opening of new Apex Bank branches in several key cities across Italy! As part of our commitment to accessibility and community presence, these branches will offer modern facilities, extended customer service hours, and multilingual support. In this article, find out which cities are getting new locations, what services will be available, and how our expansion reflects our dedication to serving more customers, more personally. Whether you're a new customer or a long-time member, we look forward to welcoming you in person soon.",
    image: img5,
  },
];

const truncateText = (text: string, wordLimit: number) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const Blog = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 min-h-screen">
     

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800">
                {article.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm">
                {expandedIndex === index
                  ? article.description
                  : truncateText(article.description, 20)}
              </p>
              <button
                onClick={() => handleToggle(index)}
                className="mt-4 self-start text-purple-600 hover:underline font-medium"
              >
                {expandedIndex === index ? "Read Less ↑" : "Read More →"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
