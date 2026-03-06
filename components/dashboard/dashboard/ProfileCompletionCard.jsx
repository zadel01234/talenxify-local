// 'use client';

// import Card, { CardBody, CardTitle } from '@/components/dashboard/ui/card';
// import Button from '@/components/dashboard/ui/button';
// import { CheckCircle2 } from 'lucide-react';

// export default function ProfileCompletionCard({ profileData, onCompleteProfile }) {
//     const { percentage, fields } = profileData;

//     return (
//         <Card>
//             <CardBody>
//                 <CardTitle className="mb-6">Profile Completion</CardTitle>

//                 {/* Overall Progress */}
//                 <div className="mb-6">
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium text-gray-600">
//                             {percentage}% Complete
//                         </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                         <div
//                             className="bg-primary h-2 rounded-full transition-all duration-500"
//                             style={{ width: `${percentage}%` }}
//                         />
//                     </div>
//                 </div>

//                 {/* Individual Fields */}
//                 <div className="space-y-3 mb-6">
//                     {fields.map((field, index) => (
//                         <div key={index} className="flex items-center justify-between">
//                             <span className="text-sm text-gray-700">{field.name}</span>
//                             <div className="flex items-center gap-2">
//                                 {field.percentage === 100 ? (
//                                     <div className="flex items-center gap-1 text-green-600">
//                                         <CheckCircle2 className="w-4 h-4" />
//                                         <span className="text-xs font-semibold">100%</span>
//                                     </div>
//                                 ) : (
//                                     <div className="flex items-center gap-2">
//                                         <div className="w-12 h-1.5 bg-gray-200 rounded-full">
//                                             <div
//                                                 className="bg-primary h-1.5 rounded-full"
//                                                 style={{ width: `${field.percentage}%` }}
//                                             />
//                                         </div>
//                                         <span className="text-xs font-medium text-gray-500 w-8 text-right">
//                                             {field.percentage}%
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Complete Profile Button */}
//                 {percentage < 100 && (
//                     <Button onClick={onCompleteProfile} className="w-full">
//                         Complete Profile
//                     </Button>
//                 )}
//             </CardBody>
//         </Card>
//     );
// }


'use client';

import Card, { CardBody, CardTitle } from '@/components/dashboard/ui/card';
import Button from '@/components/dashboard/ui/button';

function CircularProgress({ percentage, size = 36, strokeWidth = 3 }) {
    const radius = (size - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            {/* Background circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#6366f1"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            {/* Percentage text */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="8"
                fontWeight="600"
                fill="#374151"
                style={{ transform: 'rotate(90deg)', transformOrigin: '50% 50%' }}
            >
                {percentage}%
            </text>
        </svg>
    );
}

export default function ProfileCompletionCard({ profileData, onCompleteProfile }) {
    const { percentage, fields } = profileData;

    return (
        <Card>
            <CardBody>
                <CardTitle className="mb-4">Profile Completion</CardTitle>

                {/* Overall Progress */}
                <div className="mb-5">
                    <div className="flex items-center justify-end mb-1.5">
                        <span className="text-sm font-medium text-gray-600">
                            {percentage}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {/* Individual Fields */}
                <div className="space-y-2 mb-5">
                    {fields.map((field, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{field.name}</span>
                            <CircularProgress percentage={field.percentage} size={36} strokeWidth={3} />
                        </div>
                    ))}
                </div>

                {/* Complete Profile Button */}
                {percentage < 100 && (
                    <Button onClick={onCompleteProfile} className="w-full">
                        Complete Profile
                    </Button>
                )}
            </CardBody>
        </Card>
    );
}