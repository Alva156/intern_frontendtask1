function userNavbar() {
  return <div>dsdasd</div>;
}

export default userNavbar;

// import React, { useState, useEffect, useRef } from "react";
// import { FaBars, FaTimes, FaGoogle } from "react-icons/fa";
// import { MdLogin } from "react-icons/md";
// import { AiOutlineUser, AiFillLinkedin } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// const UserNavbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const menuRef = useRef(null);
//   const loginRef = useRef(null);
//   const buttonRef = useRef(null);
//   const loginButtonRef = useRef(null);
//   const navigate = useNavigate();
//   const menuItems = ["Home", "Companies", "Stories", "FAQs"];

//   const handleNavigation = (path) => (
//     navigate(path), setIsMobileMenuOpen(false)
//   );
//   const toggleState = (setter) => setter((prev) => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         !menuRef.current?.contains(event.target) &&
//         !buttonRef.current?.contains(event.target)
//       )
//         setIsMobileMenuOpen(false);
//       if (
//         !loginRef.current?.contains(event.target) &&
//         !loginButtonRef.current?.contains(event.target)
//       )
//         setIsLoginOpen(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="bg-blue-600 text-white p-4 z-50 relative">
//       <div className="max-w-auto mx-auto flex justify-between items-center">
//         <button
//           ref={buttonRef}
//           onClick={() => toggleState(setIsMobileMenuOpen)}
//           className="lg:hidden"
//         >
//           {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
//         </button>
//         <div className="hidden lg:flex space-x-8 ml-12">
//           {menuItems.map((item, index) => (
//             <button
//               key={index}
//               onClick={() =>
//                 handleNavigation(
//                   item === "Home" ? "/" : `/${item.toLowerCase()}`
//                 )
//               }
//               className="text-lg font-bold border-b-2 border-transparent hover:border-white transition-all"
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//         <button
//           ref={loginButtonRef}
//           onClick={() => toggleState(setIsLoginOpen)}
//           className="relative ml-auto lg:mr-4 group"
//         >
//           {isLoginOpen ? (
//             <FaTimes className="w-6 h-6" />
//           ) : (
//             <MdLogin className="w-6 h-6" />
//           )}
//           <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//             {isLoginOpen ? "Close" : "Login"}
//           </span>
//         </button>
//       </div>
//       <div
//         ref={menuRef}
//         className={`absolute left-0 top-16 bg-blue-600 w-56 rounded-lg shadow-lg p-6 transition-transform ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-80"
//         }`}
//       >
//         {menuItems.map((item, index) => (
//           <button
//             key={index}
//             className="block w-full px-4 py-2 hover:bg-blue-700 font-bold"
//             onClick={() =>
//               handleNavigation(item === "Home" ? "/" : `/${item.toLowerCase()}`)
//             }
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//       <div
//         ref={loginRef}
//         className={`absolute top-16 sm:right-0 bg-blue-600 w-80 rounded-lg shadow-lg p-6 transform transition-all duration-300 ease-in-out ${
//           isLoginOpen ? "opacity-100 visible" : "opacity-0 invisible"
//         } ${
//           isLoginOpen
//             ? "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0"
//             : "left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-[0%]"
//         }`}
//       >
//         <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
//         <input
//           type="text"
//           placeholder="Username or Email"
//           className="border p-3 w-full rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 w-full rounded-lg mb-6 focus:ring-2 focus:ring-blue-400"
//         />
//         <button className="bg-white text-blue-600 py-3 w-full rounded-lg font-bold hover:bg-gray-100">
//           Log In
//         </button>
//         <div className="flex items-center my-8">
//           <div className="flex-1 border-t border-gray-300"></div>
//           <span className="px-3">OR</span>
//           <div className="flex-1 border-t border-gray-300"></div>
//         </div>
//         <div className="flex justify-center space-x-6">
//           {[
//             { Icon: FaGoogle, label: "Google", color: "text-red-600" },
//             { Icon: AiOutlineUser, label: "Face Scan", color: "text-blue-600" },
//             { Icon: AiFillLinkedin, label: "LinkedIn", color: "text-blue-600" },
//           ].map(({ Icon, label, color }, index) => (
//             <div key={index} className="relative group">
//               <button className="bg-white p-3 rounded-full hover:bg-gray-200 mt-2">
//                 <Icon className={`w-7 h-7 ${color}`} />
//               </button>
//               <span className="absolute left-1/2 -translate-x-1/2 -top-7 bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity min-w-[80px] text-center">
//                 {label}
//               </span>
//             </div>
//           ))}
//         </div>

//         <div className="text-center text-sm mt-4">
//           <a href="#" className="hover:underline">
//             Forgot your password?
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default UserNavbar;
