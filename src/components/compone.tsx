import { useState } from "react";
import img1 from "../assets/her2.jpg";
import img2 from "../assets/her3.jpg";
import img3 from "../assets/her4.jpg";
import img4 from "../assets/her5.jpg";
import img5 from "../assets/her6.jpg";

const communications = [
  {
    title: "Your Security is Always a Priority",
    description: "Recognize fraud and request support.",
    image: img1,
    buttonText: "Discover More",
  },
  {
    title: "Sustainability in Financial Services",
    description: "Learn about our sustainability policies.",
    image: img2,
    buttonText: "Read More",
  },
  {
    title: "New Branch Hours",
    description: "Starting from July 1, 2024.",
    image: img3,
    buttonText: "Learn More",
  },
  {
    title: "Supporting Emilia-Romagna",
    description: "BNL BNP Paribas helps businesses affected by flooding.",
    image: img4,
    buttonText: "Discover More",
  },
  {
    title: "Financial Growth Strategies",
    description: "Learn how to maximize your savings.",
    image: img5,
    buttonText: "Read More",
  },
];

const CustomerCommunications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === communications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? communications.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 relative">
      <h2 className="text-center text-xl font-semibold mb-6">
        Customer Communications
      </h2>
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {communications.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
        onClick={prevSlide}
      >
        ◀
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
        onClick={nextSlide}
      >
        ▶
      </button>

      {/* Dots for navigation */}
      <div className="flex justify-center mt-4 space-x-2">
        {communications.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CustomerCommunications;
