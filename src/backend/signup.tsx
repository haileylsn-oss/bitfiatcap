import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addUser } from "./api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dx90y9zdx/upload`;
const UPLOAD_PRESET = "holtback"; // Replace with your Cloudinary preset


const securityQuestions = [
  "What was your childhood nickname?",
  "What is the name of your favorite childhood friend?",
  "In what city were you born?",
  "What was your dream job as a child?",
  "What is your oldest sibling’s middle name?",
  "What is the name of your first pet?",
  "What was the make and model of your first car?",
  "What is your mother’s maiden name?",
  "What was the name of your elementary school?",
  "What is the name of the street you grew up on?",
  "What is your favorite movie?",
  "What is your favorite book?",
  "What was the name of your childhood best friend?",
  "What is your favorite food?",
  "What city did your parents meet in?",
  "What is the name of the hospital where you were born?",
  "What was your high school mascot?",
  "What was your first job?",
  "Where did you go on your first vacation?",
  "What is the middle name of your youngest child?"
];



// Validation Schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  middleName: yup.string().optional(),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
phone: yup
  .string()
  .matches(
    /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/,
    "Invalid phone number"
  )
  .required("Phone number is required"),
    securityQuestion: yup
    .string()
    .oneOf(securityQuestions, "Select a valid security question")
    .required("Security question is required"),
  securityAnswer: yup
    .string()
    .min(2, "Answer is too short")
    .required("Answer is required"),

  // accountType: yup.string().oneOf(["Personal", "Business"]).required(),
  address: yup.string().required("Address is required"),
  amount: yup.number().default(0),
  accountNumber: yup.number().default(123456789000),
  profilePicture: yup.string().optional(),
  gender: yup.string().oneOf(["Male", "Female"]).required(),
  dob: yup.string().required("Date of Birth is required"),
  maritalStatus: yup.string().oneOf(["Single", "Married", "Divorced"]).required(),
  // accountSubType: yup.string().oneOf(["Savings", "Checking"]).required(),
  pin: yup.string().required("Four digits required").required(),
  password: yup.string().min(6, "Password must be at least 6 characters").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});







const countryCodes = [
  { code: "+1", label: "United States" },
  { code: "+44", label: "United Kingdom" },
  { code: "+234", label: "Nigeria" },
  { code: "+91", label: "India" },
  { code: "+81", label: "Japan" },
  { code: "+61", label: "Australia" },
  { code: "+49", label: "Germany" },
  { code: "+33", label: "France" },
  { code: "+86", label: "China" },
  { code: "+971", label: "UAE" },
   { code: "+355", label: "Albania" },
  { code: "+43", label: "Austria" },
  { code: "+375", label: "Belarus" },
  { code: "+32", label: "Belgium" },
  { code: "+387", label: "Bosnia and Herzegovina" },
  { code: "+359", label: "Bulgaria" },
  { code: "+385", label: "Croatia" },
  { code: "+357", label: "Cyprus" },
  { code: "+420", label: "Czech Republic" },
  { code: "+45", label: "Denmark" },
  { code: "+372", label: "Estonia" },
  { code: "+358", label: "Finland" },
  { code: "+33", label: "France" },
  { code: "+995", label: "Georgia" },
  { code: "+49", label: "Germany" },
  { code: "+30", label: "Greece" },
  { code: "+36", label: "Hungary" },
  { code: "+354", label: "Iceland" },
  { code: "+353", label: "Ireland" },
  { code: "+39", label: "Italy" },
  { code: "+371", label: "Latvia" },
  { code: "+423", label: "Liechtenstein" },
  { code: "+370", label: "Lithuania" },
  { code: "+352", label: "Luxembourg" },
  { code: "+389", label: "North Macedonia" },
  { code: "+356", label: "Malta" },
  { code: "+373", label: "Moldova" },
  { code: "+377", label: "Monaco" },
  { code: "+382", label: "Montenegro" },
  { code: "+31", label: "Netherlands" },
  { code: "+47", label: "Norway" },
  { code: "+48", label: "Poland" },
  { code: "+351", label: "Portugal" },
  { code: "+40", label: "Romania" },
  { code: "+7", label: "Russia" },
  { code: "+381", label: "Serbia" },
  { code: "+421", label: "Slovakia" },
  { code: "+386", label: "Slovenia" },
  { code: "+34", label: "Spain" },
  { code: "+46", label: "Sweden" },
  { code: "+41", label: "Switzerland" },
  { code: "+90", label: "Turkey" },
  { code: "+380", label: "Ukraine" },
  
  { code: "+379", label: "Vatican City" }
  // You can add more here as needed
];


const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate(); // For navigation

  const {
    register,
    handleSubmit,
    setValue,
    formState: {  },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setProfileImage(data.secure_url);
    setValue("profilePicture", data.secure_url);
  };

  

 const formatPhoneNumber = (value: string) => {
  // Remove all non-digit characters
  let cleaned = value.replace(/\D/g, "");

  // Limit to 10 digits max
  if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);

  let formatted = cleaned;

  if (cleaned.length >= 4 && cleaned.length <= 6) {
    formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 6) {
    formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  setValue("phone", formatted);
};


  const onSubmit = async (data: any) => {
    setLoading(true);
    await addUser(data);
    alert("User Registered Successfully!");
    setLoading(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="bg-black">
       <div className="max-w-lg mx-auto p-8 bg-black shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-white">Create an  Account</h2>


<p className="text-white text-center mb-7">Already have an account? <Link className="text-green-500 underline" to={'/login'}>Login Here</Link> </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  {/* Name Fields */}
  <div>
    <label htmlFor="" className="font-semibold text-gray-400">First Name</label>
    <input {...register("firstName")} placeholder="" className="input w-full  border py-3 border-[#ccc]" />
  </div>
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Middle Name</label>
    <input {...register("middleName")} placeholder="" className="input w-full border py-3 border-[#ccc]" />
  </div>
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Last Name</label>
    <input {...register("lastName")} placeholder="" className="input w-full border py-3 border-[#ccc]" />
  </div>

  {/* Email & SSN */}
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Email</label>
    <input {...register("email")} placeholder="" className="input w-full border py-3 border-[#ccc]" />
  </div>
  <div>
   


  <label htmlFor="" className="font-semibold text-gray-400">Phone Number *</label>
  
  
  <div className="flex"> <select
  
  defaultValue="+1"
  className="border border-[#ccc] py-3 px-3 bg-white rounded-l w-40 text-sm"
>
  {countryCodes.map((country) => (
    <option key={country.code} value={country.code}>
      {country.label} ({country.code})
    </option>
  ))}
</select>  <input
  {...register("phone")}
  placeholder="(123) 456-7890"
  className="input w-full border py-3 border-[#ccc]"
  onChange={(e) => formatPhoneNumber(e.target.value)}
/>
    </div>
  </div>

<div className="mb-4">
  <label className="block text-sm font-semibold text-gray-400">
    Security Question *
  </label>
  <select
    {...register("securityQuestion")}
    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">-- Select a question --</option>
    <option value="What was your childhood nickname?">
      What was your childhood nickname?
    </option>
    <option value="What is the name of your favorite childhood friend?">
      What is the name of your favorite childhood friend?
    </option>
    <option value="In what city were you born?">
      In what city were you born?
    </option>
    <option value="What was your dream job as a child?">
      What was your dream job as a child?
    </option>
    <option value="What is your oldest sibling’s middle name?">
      What is your oldest sibling’s middle name?
    </option>
    <option value="What is the name of your first pet?">
      What is the name of your first pet?
    </option>
    <option value="What was the make and model of your first car?">
      What was the make and model of your first car?
    </option>
    <option value="What is your mother’s maiden name?">
      What is your mother’s maiden name?
    </option>
    <option value="What was the name of your elementary school?">
      What was the name of your elementary school?
    </option>
    <option value="What is the name of the street you grew up on?">
      What is the name of the street you grew up on?
    </option>
    <option value="What is your favorite movie?">
      What is your favorite movie?
    </option>
    <option value="What is your favorite book?">
      What is your favorite book?
    </option>
    <option value="What city did your parents meet in?">
      What city did your parents meet in?
    </option>
    <option value="What was your high school mascot?">
      What was your high school mascot?
    </option>
    <option value="What was your first job?">
      What was your first job?
    </option>
    <option value="Where did you go on your first vacation?">
      Where did you go on your first vacation?
    </option>
    <option value="What is the middle name of your youngest child?">
      What is the middle name of your youngest child?
    </option>
  </select>
</div>


<div className="mb-4">
  <label className="block text-sm font-medium text-gray-400">
    Answer *
  </label>
  <input
    type="text"
    {...register("securityAnswer")}
    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    placeholder="Enter your answer"
  />
</div>



  {/* Address */}

  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Address</label>
  
    <input {...register("address")} placeholder="" className="input w-full   border py-3 border-[#ccc]" />
   
  </div>

  {/* Gender, DOB, Marital Status */}
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Gender</label>
    <select {...register("gender")} className="input w-full   border py-3 border-[#ccc]">
      {/* <option value=""> </option> */}
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Date of Birth</label>
    <input {...register("dob")} type="date" className="input w-full   border py-3 border-[#ccc]" />
  </div>
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Marital Status</label>
    <select {...register("maritalStatus")} className="input w-full   border py-3 border-[#ccc]">
      {/* <option value="">Select </option> */}
      <option value="Single">Single</option>
      <option value="Married">Married</option>
      <option value="Divorced">Divorced</option>
    </select>
  </div>

  {/* Account Type */}
  

  {/* Profile Picture Upload */}
  <div className="flex flex-col items-center">
   <label htmlFor="" className="font-semibold flex justify-start text-gray-400">Upload Profile Picture</label>
   {profileImage && <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full mb-2" />}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
      className="border p-2 rounded w-full"
    />
  </div>

  {/* Password Fields */}
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">4 digits Pin</label>
  <input
    {...register("pin")}
    type="tel"
    pattern="\d{4}"
    placeholder="Enter 4 digits"
    maxLength={4}
    inputMode="numeric"
    className="input w-full border py-3 border-[#ccc]"
  />
</div>


  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Password *</label>
    <input {...register("password")} type="password" placeholder="" className="input w-full   border py-3 border-[#ccc]" />
  </div>
  <div>
  <label htmlFor="" className="font-semibold text-gray-400">Confirm Password *</label>
    <input {...register("confirmPassword")} type="password" placeholder="" className="input w-full   border py-3 border-[#ccc]" />
  </div>

  <div className="mb-4 flex items-start">
  <input
    type="checkbox"
     required
    className="mt-1 mr-2 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
    id="agreeTerms"
  />
  <label htmlFor="agreeTerms" className="text-sm text-gray-400">
    I agree to the{" "}
    <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
      Terms and Conditions
    </a>
    .
  </label>
</div>



  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"
    disabled={loading}
  >
    {loading ? "Submitting..." : "Register"}
  </button>
<Link to='/login'> <button className="w-full  mt-4 mb-6 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md"> Login</button>

</Link>
 </form>

    </div>
    </div>
   
  );
};

export default SignUp;
