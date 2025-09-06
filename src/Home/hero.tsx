import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from '../assets/banner.jpg'

import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSadCry } from "react-icons/fa";
import { getUsers } from "../backend/api"; // Import getUsers function from api.ts

import logo from "../assets/logo.png";
const HeroSection: React.FC = () => {
     const [passwordVisible, setPasswordVisible] = useState(false);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [popupMessage, setPopupMessage] = useState<string | null>(null);
      const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
      const [showPopup, setShowPopup] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [popupImage, setPopupImage] = useState<string>("");
      const navigate = useNavigate();
    
      const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
    
      // const handleLogin = async (e: React.FormEvent) => {
      //   e.preventDefault();
      //   setIsLoading(true);
      //   setPopupMessage(null);
    
      //   try {
      //     const users = await getUsers(); // Fetch users from backend
      //     setIsLoading(false);
    
      //     const user = users.find(
      //       (user: any) => user.email === email && user.password === password
      //     );
    
      //     if (user) {
      //       setPopupMessage(`Welcome Back, \n  ${user.firstName}!`);
      //       setPopupType("success");
      //       setPopupImage(`${user.profilePicture}`);
      //       setShowPopup(true);
    
      //       // Save user data in local storage
      //       localStorage.setItem("loggedInUser", JSON.stringify(user));
    
      //       setTimeout(() => {
      //         setShowPopup(false);
      //         navigate("/pin");
      //       }, 2000);
      //     } else {
      //       setPopupMessage("Incorrect username or password.");
      //       setPopupType("error");
      //       setPopupImage(logo);
      //       setShowPopup(true);
      //       setTimeout(() => setShowPopup(false), 2000);
      //     }
      //   } catch (error) {
      //     console.error("Error fetching users:", error);
      //     setIsLoading(false);
      //     setPopupMessage("Login failed. Please try again.");
      //     setPopupType("error");
      //     setPopupImage(logo);
      //     setShowPopup(true);
      //     setTimeout(() => setShowPopup(false), 2000);
      //   }
      // };
      const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setPopupMessage(null);
      
        try {
          const users = await getUsers(); // Fetch users from backend
          setIsLoading(false);
      
          const user = users.find(
            (user: any) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
          );
      
          if (user) {
            setPopupMessage(`Welcome Back, \n  ${user.firstName}!`);
            setPopupType("success");
            setPopupImage(`${user.profilePicture}`);
            setShowPopup(true);
      
            // Save user data in local storage
            localStorage.setItem("loggedInUser", JSON.stringify(user));
      
            setTimeout(() => {
              setShowPopup(false);
              navigate("/pin");
            }, 5000);
          } else {
            setPopupMessage("Incorrect username or password.");
            setPopupType("error");
            setPopupImage(logo);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
          setIsLoading(false);
          setPopupMessage("Login failed. Please try again.");
          setPopupType("error");
          setPopupImage(logo);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000);
        }
      };
      

  return (
    <section
      className="relative w-full h-screen flex flex-wrap items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
     <div
      className="flex justify-center items-center min-h-screen relative bg-cover bg-center"
      // style={{ backgroundImage: `url(${bgimg})` }}
    >
      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div> */}

      {isLoading ? (
        <div className="flex flex-col  items-center justify-center min-h-screen z-10">
          <div className="w-16 h-16  border-4 border-purple-500 border-dotted rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-white">Processing...</p>
        </div>
      ) : (
        <div className="flex z-10 w-full  justify-center items-center min-h-screen p-4">
          <div className=" shadow-2xl bg-white rounded p-8 w-full max-w-md">
          <h1 className="text-[20px] font-light text-blue-800 text-[#000]">LOG-IN</h1>
          <p className="text-[16px] font-bold text-blue-800 uppercase">To your account</p>   

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                {/* <p className="mb-2 font-semibold">Email</p> */}
                <label className="flex items-center  border-b-2 border-black  px-4 py-3">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL"
                    required
                    className="flex-grow bg-transparent outline-none text-sm"
                  />
                </label>
              </div>

              <div className="mb-4">
                {/* <div className="flex justify-between mb-2 font-semibold">
                  <p>Password</p>
                  <p className="text-purple-500 ">Forgot Password?</p>
                </div> */}
                
                <label className="flex items-center  border-b-2  border-black  px-4 py-3">
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                    required
                    className="flex-grow bg-transparent outline-none text-sm"
                  />
                  <span
                    className="cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
              </div>

              

              <button
                type="submit"
                className="w-full  text-blue-800 border-4  border-blue-800 text-xl  py-3 rounded-full hover:bg-purple-700 transition"
              >
                LOG-IN TO ACCOUNT
              </button>
            </form>

            <div className="flex items-center my-4">
  <div className="flex-grow border-t border-gray-400"></div>
  <span className="px-3 text-gray-600">OR</span>
  <div className="flex-grow border-t border-gray-400"></div>
</div>


           <div className="flex gap-3">
            <div className="bg-[#f8f8fb]  text-xl border-2 border-purple-200 px-4 py-2 w-[200px] text-center pointer ">Internet Banking</div>
            <div className="bg-[#f8f8fb]  text-xl border-2  border-purple-200 px-4 py-2 w-[200px] text-center "><Link to="/signup">
              Sign Up
              </Link></div>
           </div>

             
           
           
          </div>
        </div>
      )}

      

      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-md shadow-lg text-center flex flex-col items-center">
            {popupType === "success" ? (
              <>
                <img
                  src={popupImage}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-lg font-semibold">{popupMessage}</p>
              </>
            ) : (
              <>
                <div className="text-purple-400 text-6xl mb-8 p-4">
                  <FaSadCry />
                </div>
                <p className="text-2xl font-semibold text-black p-6">{popupMessage}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>  <div className="container mx-auto grid md:grid-cols-2 gap-6 px-4 h-[410px]">
       
        {/* Pay Online Card */}
        
      </div>
    </section>
  );
};

export default HeroSection;
