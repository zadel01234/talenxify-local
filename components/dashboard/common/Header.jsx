'use client'

import React, { useEffect, useState } from 'react'
import { Search, Bell, Mail } from 'lucide-react';
import Image from "next/image";
import { dashboardApi } from '@/lib/api/dashboard';

const Header = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [unreadMessages, setUnreadMessages] = useState(0);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await dashboardApi.getProfile();
                // Handle the nested response structure
                const profileData = response?.data || response;
                setProfile(profileData);
            } catch (error) {
                console.error('Failed to load profile:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUnreadMessages = async () => {
            try {
                const messages = await dashboardApi.getMessages();
                // Count unread messages (adjust based on your API response structure)
                const unread = messages?.data?.filter(m => !m.read)?.length || 0;
                setUnreadMessages(unread);
            } catch (error) {
                console.error('Failed to load messages:', error);
            }
        };

        fetchProfile();
        fetchUnreadMessages();
    }, []);

    // Extract user data
    const userName = profile?.full_name || 'User';
    const userRole = profile?.talent_profile?.current_status ||
        profile?.talent_profile?.experience ||
        (profile?.is_talent ? 'Talent' : profile?.is_recruiter ? 'Recruiter' : 'User');
    const userPhoto = profile?.talent_profile?.profile_picture ||
        profile?.profile_picture ||
        '/talent.jpg'; // Fallback image

    return (
        <header className="bg-white shadow-md fixed w-full top-0 z-50">
            <div className="flex items-center justify-between px-6 py-2">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Talenxify Logo"
                        width={100}
                        height={32}
                        priority
                        className="h-7 w-auto"
                    />
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full px-4 py-1 pr-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-white"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                {/* Right Side - Notifications and Profile */}
                <div className="flex items-center gap-4">
                    {/* Message Icon */}
                    <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                        <Mail className="w-6 h-6 text-blue-600" />
                        {unreadMessages > 0 && (
                            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-semibold">
                                {unreadMessages > 9 ? '9+' : unreadMessages}
                            </span>
                        )}
                    </button>

                    {/* Bell Icon (Notifications) */}
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Bell className="w-6 h-6 text-gray-800" />
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        {loading ? (
                            // Loading skeleton
                            <>
                                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                <div className="text-left">
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <img
                                    src={userPhoto}
                                    alt={userName}
                                    className="w-10 h-10 rounded-full object-cover"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.target.src = '/talent.jpg';
                                    }}
                                />
                                <div className="text-left">
                                    <div className="text-sm font-semibold text-gray-800 capitalize">
                                        {userName}
                                    </div>
                                    <div className="text-xs text-gray-500 capitalize">
                                        {userRole}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header