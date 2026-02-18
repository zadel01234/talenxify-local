// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";

// export default function AuthFlow() {
//   const [currentScreen, setCurrentScreen] = useState("welcome"); // welcome, signup, otp, customize, success, login, forgot
//   const [userType, setUserType] = useState("talent"); // talent or recruiter
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const pageVariants = {
//     initial: { opacity: 0, x: 50 },
//     animate: { opacity: 1, x: 0 },
//     exit: { opacity: 0, x: -50 },
//   };

//   // Welcome Screen
//   const WelcomeScreen = () => (
//     <div className="grid md:grid-cols-2 min-h-screen">
//       {/* Left Side - Hero */}
//       <div className="relative bg-gradient-to-br from-[#596CFF] to-[#7a8aff] p-8 flex flex-col justify-between">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-br-full" />
//         <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-tl-full" />

//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 text-white"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Welcome to Talenxify
//           </h1>
//           <p className="text-lg text-white/90">
//             Your go-to platform for hiring exceptional talent.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3 }}
//           className="relative z-10 flex justify-center items-center"
//         >
//           <div className="relative w-[300px] h-[300px]">
//             <div className="absolute inset-0 rounded-full border-[8px] border-white/30" />
//             <div className="absolute inset-3 rounded-full border-[8px] border-white/50" />
//             <div className="absolute inset-[20px] rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
//               <Image
//                 src="/hero/team.png"
//                 alt="Team"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="relative z-10 text-center"
//         >
//           <h2 className="text-2xl font-bold text-white mb-2">
//             Hiring Talent Platform
//           </h2>
//           <p className="text-white/90">
//             ... connecting businesses with exceptional talent across the African
//             continent.
//           </p>
//           <div className="flex justify-center gap-2 mt-6">
//             <div className="w-8 h-1 bg-white rounded-full" />
//             <div className="w-1 h-1 bg-white/50 rounded-full" />
//             <div className="w-1 h-1 bg-white/50 rounded-full" />
//           </div>
//         </motion.div>
//       </div>

//       {/* Right Side - Options */}
//       <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-md space-y-8"
//         >
//           <div className="text-center mb-8">
//             <Image
//               src="/logo.png"
//               alt="Talenxify"
//               width={120}
//               height={40}
//               className="mx-auto mb-6"
//             />
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">
//               What Brings you to{" "}
//               <span className="text-[#596CFF]">Talenxify?</span>
//             </h2>
//             <p className="text-gray-600">
//               We'd like to personalize your experience so you find what you're
//               looking for!
//             </p>
//           </div>

//           <motion.button
//             whileHover={{
//               scale: 1.02,
//               boxShadow: "0 10px 30px rgba(89, 108, 255, 0.3)",
//             }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               setUserType("talent");
//               setCurrentScreen("signup");
//             }}
//             className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg"
//           >
//             I want to Hire Talent
//           </motion.button>

//           <motion.button
//             whileHover={{
//               scale: 1.02,
//               boxShadow: "0 10px 30px rgba(89, 108, 255, 0.2)",
//             }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               setUserType("recruiter");
//               setCurrentScreen("signup");
//             }}
//             className="w-full bg-white hover:bg-gray-50 text-[#596CFF] font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg border-2 border-[#596CFF]"
//           >
//             Looking for My next Role
//           </motion.button>

//           <p className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <button
//               onClick={() => setCurrentScreen("login")}
//               className="text-[#596CFF] font-semibold hover:underline"
//             >
//               Sign In
//             </button>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );

//   // Sign Up Screen
//   const SignUpScreen = () => (
//     <div className="grid md:grid-cols-2 min-h-screen">
//       {/* Left Side - Same Hero */}
//       <div className="relative bg-gradient-to-br from-[#596CFF] to-[#7a8aff] p-8 flex flex-col justify-between">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-br-full" />
//         <motion.div className="relative z-10 text-white">
//           <h1 className="text-4xl font-bold mb-4">Welcome to Talenxify</h1>
//           <p className="text-lg">
//             Your go-to platform for hiring exceptional talent.
//           </p>
//         </motion.div>
//         <div className="relative z-10 flex justify-center">
//           <div className="relative w-[280px] h-[280px]">
//             <div className="absolute inset-0 rounded-full border-[8px] border-white/30" />
//             <div className="absolute inset-[20px] rounded-full bg-white/20 overflow-hidden">
//               <Image
//                 src="/hero/team.png"
//                 alt="Team"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="relative z-10 text-center">
//           <h2 className="text-2xl font-bold text-white mb-2">
//             Hiring Talent Platform
//           </h2>
//           <p className="text-white/90 text-sm">
//             ... connecting businesses with exceptional talent across the African
//             continent.
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="flex flex-col items-center justify-center p-8 bg-white overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-md"
//         >
//           <Image
//             src="/logo.png"
//             alt="Talenxify"
//             width={100}
//             height={32}
//             className="mb-6"
//           />

//           <div className="flex gap-2 mb-6">
//             <button className="flex-1 py-2 bg-[#596CFF] text-white font-semibold rounded-lg">
//               Sign Up
//             </button>
//             <button
//               onClick={() => setCurrentScreen("login")}
//               className="flex-1 py-2 text-gray-600 font-semibold"
//             >
//               Sign In
//             </button>
//           </div>

//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your full name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Date Of Birth
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="Enter date of birth"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Gender
//                 </label>
//                 <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none">
//                   <option>Select gender</option>
//                   <option>Male</option>
//                   <option>Female</option>
//                   <option>Other</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Nationality
//                 </label>
//                 <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none">
//                   <option>Select your nationality</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Bio
//                 </label>
//                 <textarea
//                   placeholder="Tell us about yourself..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none resize-none"
//                   rows={1}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter Password"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none"
//                   />
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     👁️
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     placeholder="Confirm Password"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-transparent outline-none"
//                   />
//                   <button
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//                   >
//                     👁️
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setCurrentScreen("otp")}
//               className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg"
//             >
//               Create Account
//             </motion.button>

//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">OR</span>
//               </div>
//             </div>

//             <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
//               <span className="text-xl">G</span>
//               <span className="font-semibold text-gray-700">
//                 Continue with Google
//               </span>
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );

//   // OTP Verification Screen
//   const OTPScreen = () => (
//     <div className="grid md:grid-cols-2 min-h-screen">
//       {/* Left Side - Same Hero */}
//       <div className="relative bg-gradient-to-br from-[#596CFF] to-[#7a8aff] p-8 flex flex-col justify-between">
//         <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-br-full" />
//         <motion.div className="relative z-10 text-white">
//           <h1 className="text-3xl font-bold mb-4">Welcome to Talenxify</h1>
//           <p className="text-sm">
//             Your go-to platform for hiring exceptional talent.
//           </p>
//         </motion.div>
//         <div className="relative z-10 flex justify-center">
//           <div className="relative w-[200px] h-[200px]">
//             <div className="absolute inset-0 rounded-full border-[6px] border-white/30" />
//             <div className="absolute inset-[15px] rounded-full bg-white/20 overflow-hidden">
//               <Image
//                 src="/hero/team.png"
//                 alt="Team"
//                 fill
//                 className="object-cover"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="relative z-10 text-center">
//           <h2 className="text-xl font-bold text-white mb-2">
//             Hiring Talent Platform
//           </h2>
//           <p className="text-white/90 text-xs">
//             ... connecting businesses with exceptional talent across the African
//             continent.
//           </p>
//         </div>
//       </div>

//       {/* Right Side - OTP Form */}
//       <div className="flex flex-col items-center justify-center p-8 bg-white">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-md text-center"
//         >
//           <Image
//             src="/logo.png"
//             alt="Talenxify"
//             width={100}
//             height={32}
//             className="mx-auto mb-8"
//           />

//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             OTP Verification
//           </h2>
//           <p className="text-gray-600 text-sm mb-8">
//             Enter the verification code we just sent to your email address
//           </p>

//           <div className="flex justify-center gap-3 mb-6">
//             {[1, 2, 3, 4, 5, 6].map((i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength={1}
//                 className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] focus:border-[#596CFF] outline-none"
//               />
//             ))}
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setCurrentScreen("customize")}
//             className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-3 rounded-lg mb-4"
//           >
//             Verify
//           </motion.button>

//           <p className="text-sm text-gray-600">
//             Didn't receive a code?{" "}
//             <button className="text-[#596CFF] font-semibold hover:underline">
//               Resend
//             </button>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );

//   // Customize Experience Screen
//   const CustomizeScreen = () => (
//     <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8"
//       >
//         <Image
//           src="/logo.png"
//           alt="Talenxify"
//           width={100}
//           height={32}
//           className="mx-auto mb-6"
//         />

//         <div className="text-center mb-8">
//           <p className="text-sm text-gray-500 mb-2">1/2</p>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Customize your Experience
//           </h2>
//           <p className="text-sm text-gray-600">
//             Tell us about you to personalize your job search.
//           </p>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Experience
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select your experience</option>
//                 <option>Entry Level</option>
//                 <option>Mid Level</option>
//                 <option>Senior Level</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Current Status
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select current status</option>
//                 <option>Employed</option>
//                 <option>Unemployed</option>
//                 <option>Student</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Level Of Experience
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select level of experience</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Availability
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select availability</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Country of Residence
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select country</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 City of Residence
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select city</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 LinkedIn
//               </label>
//               <input
//                 type="url"
//                 placeholder="Link to your LinkedIn profile"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Job Role
//               </label>
//               <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none">
//                 <option>Select your job role</option>
//               </select>
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => setCurrentScreen("success")}
//             className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-3 rounded-lg"
//           >
//             Create Account
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );

//   // Success Screen
//   const SuccessScreen = () => (
//     <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-white">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-12 text-center"
//       >
//         <Image
//           src="/logo.png"
//           alt="Talenxify"
//           width={100}
//           height={32}
//           className="mx-auto mb-8"
//         />

//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1, rotate: 360 }}
//           transition={{ delay: 0.3, type: "spring" }}
//           className="w-24 h-24 mx-auto mb-6 bg-[#596CFF] rounded-full flex items-center justify-center"
//         >
//           <svg
//             className="w-12 h-12 text-white"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={3}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </motion.div>

//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           Account created successfully!
//         </h2>
//         <p className="text-gray-600 mb-8">
//           Welcome aboard! You can now start your journey with Talenxify
//         </p>

//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={() => setCurrentScreen("welcome")}
//           className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-3 rounded-lg"
//         >
//           Take me to Dashboard
//         </motion.button>
//       </motion.div>
//     </div>
//   );

//   // Login Screen
//   const LoginScreen = () => (
//     <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
//       >
//         <Image
//           src="/logo.png"
//           alt="Talenxify"
//           width={100}
//           height={32}
//           className="mx-auto mb-8"
//         />

//         <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//           Welcome Back!
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none"
//               />
//               <button
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//               >
//                 👁️
//               </button>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input type="checkbox" className="rounded text-[#596CFF] mr-2" />
//               <span className="text-sm text-gray-600">Remember me</span>
//             </label>
//             <button
//               onClick={() => setCurrentScreen("forgot")}
//               className="text-sm text-[#596CFF] hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-3 rounded-lg"
//           >
//             Sign In
//           </motion.button>

//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300" />
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">OR</span>
//             </div>
//           </div>

//           <button className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
//             <span className="text-xl">G</span>
//             <span className="font-semibold text-gray-700">
//               Continue with Google
//             </span>
//           </button>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don't have an account?{" "}
//             <button
//               onClick={() => setCurrentScreen("welcome")}
//               className="text-[#596CFF] font-semibold hover:underline"
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );

//   // Forgot Password Screen
//   const ForgotPasswordScreen = () => (
//     <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
//       >
//         <Image
//           src="/logo.png"
//           alt="Talenxify"
//           width={100}
//           height={32}
//           className="mx-auto mb-8"
//         />

//         <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
//           Forgot Password?
//         </h2>
//         <p className="text-gray-600 text-center mb-6">
//           No worries! Enter your email and we'll send you a reset link.
//         </p>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#596CFF] outline-none"
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="w-full bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold py-3 rounded-lg"
//           >
//             Send Reset Link
//           </motion.button>

//           <button
//             onClick={() => setCurrentScreen("login")}
//             className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
//           >
//             ← Back to Sign In
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={currentScreen}
//         variants={pageVariants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//         transition={{ duration: 0.3 }}
//       >
//         {currentScreen === "welcome" && <WelcomeScreen />}
//         {currentScreen === "signup" && <SignUpScreen />}
//         {currentScreen === "otp" && <OTPScreen />}
//         {currentScreen === "customize" && <CustomizeScreen />}
//         {currentScreen === "success" && <SuccessScreen />}
//         {currentScreen === "login" && <LoginScreen />}
//         {currentScreen === "forgot" && <ForgotPasswordScreen />}
//       </motion.div>
//     </AnimatePresence>
//   );
// }

import { Suspense } from "react";
import RegisterClient from "./register-client";

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterClient />
    </Suspense>
  );
}
