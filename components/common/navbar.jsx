// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// export default function Navbar() {
//   const navItems = [
//     { label: "About Talenxify", href: "/about" },
//     { label: "Products", href: "/products" },
//     { label: "Resources", href: "/resources" },
//     { label: "Pricing", href: "/pricing" },
//   ];

//   return (
//     <motion.nav
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="w-full bg-white border-b border-gray-200"
//     >
//       <div className="max-w-[1400px] mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Image
//                 src="/logo.png"
//                 alt="Talenxify Logo"
//                 width={100}
//                 height={32}
//                 priority
//                 className="h-8 w-auto"
//               />
//             </motion.div>
//           </Link>

//           {/* Center Navigation Links */}
//           <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
//             {navItems.map((item, index) => (
//               <motion.div
//                 key={item.href}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.3 }}
//               >
//                 <Link
//                   href={item.href}
//                   className="text-[#596CFF] hover:text-[#4a5de6] font-medium text-[15px] transition-colors duration-200 relative group"
//                 >
//                   {item.label}
//                   <motion.span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#596CFF] group-hover:w-full transition-all duration-300" />
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Auth Buttons */}
//           <div className="flex items-center gap-3">
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link
//                 href="/register"
//                 className="bg-[#596CFF]/10 hover:bg-[#596CFF]/20 text-[#596CFF] font-semibold text-[15px] px-6 py-2.5 rounded-lg transition-all duration-200"
//               >
//                 Sign Up
//               </Link>
//             </motion.div>

//             <motion.div
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 8px 20px rgba(89, 108, 255, 0.3)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Link
//                 href="/login"
//                 className="bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold text-[15px] px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md"
//               >
//                 Login
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }



"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "About Talenxify", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-200 animate-fade-in">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Talenxify Logo"
              width={100}
              height={32}
              priority
              className="h-8 w-auto transition-transform duration-200 hover:scale-105 active:scale-95"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#596CFF] hover:text-[#4a5de6] font-medium text-[15px] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#596CFF] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="bg-[#596CFF]/10 hover:bg-[#596CFF]/20 text-[#596CFF] font-semibold text-[15px] px-6 py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="bg-[#596CFF] hover:bg-[#4a5de6] text-white font-semibold text-[15px] px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}