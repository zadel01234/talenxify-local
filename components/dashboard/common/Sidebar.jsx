'use client';

import { useState } from 'react';
import {
    Home,
    FileText,
    Mail,
    CreditCard,
    User,
    Flag,
    Settings,
    LogOut,
    Menu,
    X,
    Icon
} from 'lucide-react';
import { tie } from '@lucide/lab';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: tie, label: 'Jobs / Gigs', path: '/dashboard/jobs', isLab: true },
        { icon: FileText, label: 'Applications', path: '/dashboard/applications' },
        { icon: Mail, label: 'Messages', path: '/dashboard/message', badge: '1' },
        { icon: CreditCard, label: 'Payment', path: '/dashboard/payment' },
        { icon: User, label: 'Account', path: '/dashboard/account' },
        { icon: Flag, label: 'Support', path: '/dashboard/support' },
        { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-16"
                />
            )}

            {/* Sidebar */}
            <div
                className={`w-68 bg-white flex flex-col shadow-lg fixed left-0 top-13 bottom-0 overflow-y-auto scrollbar-hide z-40 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Menu */}
                <nav className="flex-1 px-6 py-6">
                    <ul className="space-y-3">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.path;

                            return (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        onClick={closeSidebar}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.isLab ? (
                                            <Icon
                                                iconNode={item.icon}
                                                className={`w-6 h-6 ${isActive ? 'text-white' : 'text-indigo-600'
                                                    }`}
                                            />
                                        ) : (
                                            <item.icon
                                                className={`w-6 h-6 ${isActive ? 'text-white' : 'text-indigo-600'
                                                    }`}
                                            />
                                        )}

                                        <span className="flex-1 font-medium text-xl">
                                            {item.label}
                                        </span>

                                        {item.badge && (
                                            <span className="bg-white text-indigo-600 text-sm font-semibold px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Upgrade */}
                <div className="px-4 pb-4">
                    <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-6 text-white text-center">
                        <p className="text-sm mb-4 leading-relaxed">
                            Upgrade to PRO to get access to all features!
                        </p>
                        <button className="w-full bg-white text-indigo-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                            Get Pro
                        </button>
                    </div>

                    {/* Logout */}
                    <button className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
