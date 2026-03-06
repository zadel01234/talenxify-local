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