'use client';

import Button from '@/components/dashboard/ui/button';

export default function ProfileBanner({ percentage, onComplete }) {
    if (percentage >= 100) return null;

    return (
        <div className="bg-blue-50 rounded-2xl px-6 py-5 mb-8 flex items-center gap-6">
            {/* Left - Percentage */}
            <div className="flex-shrink-0 text-center min-w-[80px]">
                <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">
                    of your profile is<br />completed.
                </div>
            </div>

            {/* Divider */}
            <div className="w-px self-stretch bg-blue-200" />

            {/* Middle - Text + Progress Bar */}
            <div className="flex-1 min-w-0">
                {/* Progress bar */}
                <div className="w-full bg-blue-200 rounded-full h-1.5 mb-3">
                    <div
                        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-0.5">
                    Complete your profile to apply for jobs.
                </h3>
                <p className="text-xs text-gray-500 leading-snug">
                    Complete your profile to unlock job applications. A complete profile increases
                    your chances of getting noticed and hired.
                </p>
            </div>

            {/* Right - Button */}
            <div className="flex-shrink-0">
                <Button onClick={onComplete} className="whitespace-nowrap">
                    Complete Profile
                </Button>
            </div>
        </div>
    );
}