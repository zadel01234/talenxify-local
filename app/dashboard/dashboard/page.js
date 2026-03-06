
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/dashboard/layout/Header';
// import ProfileBanner from '@/components/dashboard/dashboard/ProfileBanner';
// import WalletCard from '@/components/dashboard/dashboard/WalletCard';
// import StatsGrid from '@/components/dashboard/dashboard/StatsGrid';
// import ApplicationsTable from '@/components/dashboard/dashboard/ApplicationsTable';
// import ProfileCompletionCard from '@/components/dashboard/dashboard/ProfileCompletionCard';
// import WithdrawModal from '@/components/dashboard/dashboard/WithdrawModal';
// import {
//   useUser,
//   useWallet,
//   useApplicationStats,
//   useApplications,
//   useProfileCompletion,
//   useWithdraw,
// } from '@/lib/hooks/useApi';
// import { dashboardApi } from '@/lib/api/dashboard';
// import { useEffect } from 'react';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

//   // Fetch all data using React Query hooks
//   const { data: user, isLoading: userLoading } = useUser();
//   const { data: wallet, isLoading: walletLoading } = useWallet();
//   const { data: stats, isLoading: statsLoading } = useApplicationStats();
//   const { data: applications, isLoading: applicationsLoading } = useApplications();
//   const { data: profileCompletion, isLoading: profileLoading } = useProfileCompletion();

//   useEffect(() => {
//     const test = async () => {
//       try {
//         const profile = await dashboardApi.getProfile();
//         console.log('✅ Profile loaded:', profile);
//       } catch (error) {
//         console.error('❌ Error:', error);
//       }
//     };
//     test();
//   }, []);

//   // Withdraw mutation
//   const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw({
//     onSuccess: (data) => {
//       console.log('Withdrawal successful:', data);
//       setIsWithdrawModalOpen(false);
//       alert('Withdrawal initiated successfully!');
//     },
//     onError: (error) => {
//       console.error('Withdrawal failed:', error);
//       alert('Withdrawal failed. Please try again.');
//     },
//   });

//   // Loading state
//   const isLoading = userLoading || walletLoading || statsLoading || applicationsLoading || profileLoading;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   // Handlers
//   const handleWithdraw = () => {
//     setIsWithdrawModalOpen(true);
//   };

//   const handleConfirmWithdraw = (amount) => {
//     withdraw(amount);
//   };

//   const handleCompleteProfile = () => {
//     // TODO: Navigate to profile page
//     // router.push('/profile');
//     alert('Navigating to profile page...');
//   };

//   const handleViewDetails = (applicationId) => {
//     // TODO: Navigate to application details or open modal
//     // router.push(`/applications/${applicationId}`);
//     alert(`Viewing application #${applicationId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 mt-15">
//       <Header userName={user?.name} />

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Profile Completion Banner */}
//         <ProfileBanner
//           percentage={profileCompletion?.percentage}
//           onComplete={handleCompleteProfile}
//         />

//         {/* Main Grid Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Wallet Card */}
//             <WalletCard
//               balance={wallet?.balance}
//               pendingPayment={wallet?.pendingPayment}
//               currency={wallet?.currency}
//               onWithdraw={handleWithdraw}
//             />

//             {/* Stats Grid */}
//             <StatsGrid stats={stats} />

//             {/* Applications Table */}
//             <ApplicationsTable
//               applications={applications}
//               onViewDetails={handleViewDetails}
//             />
//           </div>

//           {/* Right Column - Profile Completion */}
//           <div className="lg:col-span-1">
//             <ProfileCompletionCard
//               profileData={profileCompletion}
//               onCompleteProfile={handleCompleteProfile}
//             />
//           </div>
//         </div>
//       </main>

//       {/* Withdraw Modal */}
//       <WithdrawModal
//         isOpen={isWithdrawModalOpen}
//         onClose={() => setIsWithdrawModalOpen(false)}
//         balance={wallet?.balance}
//         onConfirm={handleConfirmWithdraw}
//         isLoading={isWithdrawing}
//       />
//     </div>
//   );
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/dashboard/layout/Header';
// import ProfileBanner from '@/components/dashboard/dashboard/ProfileBanner';
// import WalletCard from '@/components/dashboard/dashboard/WalletCard';
// import StatsGrid from '@/components/dashboard/dashboard/StatsGrid';
// import ApplicationsTable from '@/components/dashboard/dashboard/ApplicationsTable';
// import ProfileCompletionCard from '@/components/dashboard/dashboard/ProfileCompletionCard';
// import WithdrawModal from '@/components/dashboard/dashboard/WithdrawModal';
// import {
//   useUser,
//   useWallet,
//   useApplicationStats,
//   useApplications,
//   useProfileCompletion,
//   useWithdraw,
// } from '@/lib/hooks/useApi';
// import { dashboardApi } from '@/lib/api/dashboard';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
//   const [profile, setProfile] = useState(null);

//   // Fetch all data using React Query hooks
//   const { data: user, isLoading: userLoading } = useUser();
//   const { data: wallet, isLoading: walletLoading } = useWallet();
//   const { data: stats, isLoading: statsLoading } = useApplicationStats();
//   const { data: applications, isLoading: applicationsLoading } = useApplications();
//   const { data: profileCompletion, isLoading: profileLoading } = useProfileCompletion();

//   // Fetch profile data for user name
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await dashboardApi.getProfile();
//         // Handle nested response structure
//         const profileData = response?.data || response;
//         setProfile(profileData);
//         console.log('✅ Profile loaded:', profileData);
//       } catch (error) {
//         console.error('❌ Error loading profile:', error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Withdraw mutation
//   const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw({
//     onSuccess: (data) => {
//       console.log('Withdrawal successful:', data);
//       setIsWithdrawModalOpen(false);
//       alert('Withdrawal initiated successfully!');
//     },
//     onError: (error) => {
//       console.error('Withdrawal failed:', error);
//       alert('Withdrawal failed. Please try again.');
//     },
//   });

//   // Loading state
//   const isLoading = userLoading || walletLoading || statsLoading || applicationsLoading || profileLoading;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   // Handlers
//   const handleWithdraw = () => {
//     setIsWithdrawModalOpen(true);
//   };

//   const handleConfirmWithdraw = (amount) => {
//     withdraw(amount);
//   };

//   const handleCompleteProfile = () => {
//     // TODO: Navigate to profile page
//     // router.push('/profile');
//     alert('Navigating to profile page...');
//   };

//   const handleViewDetails = (applicationId) => {
//     // TODO: Navigate to application details or open modal
//     // router.push(`/applications/${applicationId}`);
//     alert(`Viewing application #${applicationId}`);
//   };

//   // Extract user name from profile
//   const userName = profile?.full_name || user?.name || 'User';

//   return (
//     <div className="min-h-screen bg-gray-50 mt-15">
//       <Header userName={userName} />

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Profile Completion Banner */}
//         <ProfileBanner
//           percentage={profileCompletion?.percentage}
//           onComplete={handleCompleteProfile}
//         />

//         {/* NEW LAYOUT */}
//         <div className="space-y-8">
//           {/* Top Section - Wallet Card and Stats Grid (Full Width) */}
//           <div className="space-y-8 lg:col-span-2">
//             {/* Wallet Card */}
//             <WalletCard
//               balance={wallet?.balance}
//               pendingPayment={wallet?.pendingPayment}
//               currency={wallet?.currency}
//               onWithdraw={handleWithdraw}
//             />

//             {/* Stats Grid */}
//             <StatsGrid stats={stats} />
//           </div>

//           {/* Bottom Section - Applications Table and Profile Completion (Side by Side) */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left - Applications Table (2/3 width) */}
//             <div className="lg:col-span-2">
//               <ApplicationsTable
//                 applications={applications}
//                 onViewDetails={handleViewDetails}
//               />
//             </div>

//             {/* Right - Profile Completion (1/3 width) */}
//             <div className="lg:col-span-1">
//               <ProfileCompletionCard
//                 profileData={profileCompletion}
//                 onCompleteProfile={handleCompleteProfile}
//               />
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Withdraw Modal */}
//       <WithdrawModal
//         isOpen={isWithdrawModalOpen}
//         onClose={() => setIsWithdrawModalOpen(false)}
//         balance={wallet?.balance}
//         onConfirm={handleConfirmWithdraw}
//         isLoading={isWithdrawing}
//       />
//     </div>
//   );
// }



// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '@/components/dashboard/layout/Header';
// import ProfileBanner from '@/components/dashboard/dashboard/ProfileBanner';
// import WalletCard from '@/components/dashboard/dashboard/WalletCard';
// import StatsGrid from '@/components/dashboard/dashboard/StatsGrid';
// import ApplicationsTable from '@/components/dashboard/dashboard/ApplicationsTable';
// import ProfileCompletionCard from '@/components/dashboard/dashboard/ProfileCompletionCard';
// import WithdrawModal from '@/components/dashboard/dashboard/WithdrawModal';
// import {
//   useUser,
//   useWallet,
//   useApplicationStats,
//   useApplications,
//   useProfileCompletion,
//   useWithdraw,
// } from '@/lib/hooks/useApi';
// import { dashboardApi } from '@/lib/api/dashboard';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
//   const [profile, setProfile] = useState(null);

//   // Fetch all data using React Query hooks
//   const { data: user, isLoading: userLoading } = useUser();
//   const { data: wallet, isLoading: walletLoading } = useWallet();
//   const { data: stats, isLoading: statsLoading } = useApplicationStats();
//   const { data: applications, isLoading: applicationsLoading } = useApplications();
//   const { data: profileCompletion, isLoading: profileLoading } = useProfileCompletion();

//   // Fetch profile data for user name
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await dashboardApi.getProfile();
//         // Handle nested response structure
//         const profileData = response?.data || response;
//         setProfile(profileData);
//         console.log('✅ Profile loaded:', profileData);
//       } catch (error) {
//         console.error('❌ Error loading profile:', error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Withdraw mutation
//   const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw({
//     onSuccess: (data) => {
//       console.log('Withdrawal successful:', data);
//       setIsWithdrawModalOpen(false);
//       alert('Withdrawal initiated successfully!');
//     },
//     onError: (error) => {
//       console.error('Withdrawal failed:', error);
//       alert('Withdrawal failed. Please try again.');
//     },
//   });

//   // Loading state
//   const isLoading = userLoading || walletLoading || statsLoading || applicationsLoading || profileLoading;

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   // Handlers
//   const handleWithdraw = () => {
//     setIsWithdrawModalOpen(true);
//   };

//   const handleConfirmWithdraw = (amount) => {
//     withdraw(amount);
//   };

//   const handleCompleteProfile = () => {
//     // TODO: Navigate to profile page
//     router.push('/dashboard/manual-fill');
//   };

//   const handleViewDetails = (applicationId) => {
//     // TODO: Navigate to application details or open modal
//     // router.push(`/applications/${applicationId}`);
//     alert(`Viewing application #${applicationId}`);
//   };

//   // Extract user name from profile
//   //full name
//   // const userName = profile?.full_name || user?.name || 'User';

//   //Surname
//   // const userName = (profile?.full_name || user?.name || 'User')
//   //   .trim().split(/\s+/)[0]
//   //   .toLowerCase().replace(/^\w/, c => c.toUpperCase());

//   // first name
//   const rawName = profile?.full_name || user?.name || 'User';

//   const userName = rawName
//     .trim()
//     .split(/\s+/)
//     .slice(-1)[0]               // take the LAST word
//     .toLowerCase()
//     .replace(/^\w/, c => c.toUpperCase());


//   return (
//     <div className="min-h-screen bg-gray-50 mt-15">
//       <Header userName={userName} />

//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {/* Profile Completion Banner */}
//         <ProfileBanner
//           percentage={profileCompletion?.percentage}
//           onComplete={handleCompleteProfile}
//         />

//         {/* NEW LAYOUT */}
//         <div className="space-y-8">
//           {/* Top Section - Wallet Card (2/3 width, left aligned) */}
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//             <div className="lg:col-span-3">
//               <WalletCard
//                 balance={wallet?.balance}
//                 pendingPayment={wallet?.pendingPayment}
//                 currency={wallet?.currency}
//                 onWithdraw={handleWithdraw}
//               />
//             </div>
//           </div>

//           {/* Stats Grid - Full Width */}
//           <StatsGrid stats={stats} />

//           {/* Bottom Section - Applications Table and Profile Completion (Side by Side) */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left - Applications Table (2/3 width) */}
//             <div className="lg:col-span-2">
//               <ApplicationsTable
//                 applications={applications}
//                 onViewDetails={handleViewDetails}
//               />
//             </div>

//             {/* Right - Profile Completion (1/3 width) */}
//             <div className="lg:col-span-1">
//               <ProfileCompletionCard
//                 profileData={profileCompletion}
//                 onCompleteProfile={handleCompleteProfile}
//               />
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Withdraw Modal */}
//       <WithdrawModal
//         isOpen={isWithdrawModalOpen}
//         onClose={() => setIsWithdrawModalOpen(false)}
//         balance={wallet?.balance}
//         onConfirm={handleConfirmWithdraw}
//         isLoading={isWithdrawing}
//       />
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/dashboard/layout/Header';
import BannerCarousel from '@/components/dashboard/dashboard/BannerCarousel';
import StatsGrid from '@/components/dashboard/dashboard/StatsGrid';
import ApplicationsTable from '@/components/dashboard/dashboard/ApplicationsTable';
import ProfileCompletionCard from '@/components/dashboard/dashboard/ProfileCompletionCard';
import WithdrawModal from '@/components/dashboard/dashboard/WithdrawModal';
import {
  useUser,
  useWallet,
  useApplicationStats,
  useApplications,
  useProfileCompletion,
  useWithdraw,
} from '@/lib/hooks/useApi';
import { dashboardApi } from '@/lib/api/dashboard';

export default function DashboardPage() {
  const router = useRouter();
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  // Fetch all data using React Query hooks
  const { data: user, isLoading: userLoading } = useUser();
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: stats, isLoading: statsLoading } = useApplicationStats();
  const { data: applications, isLoading: applicationsLoading } = useApplications();
  const { data: profileCompletion, isLoading: profileLoading } = useProfileCompletion();

  // Fetch profile data for user name
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await dashboardApi.getProfile();
        const profileData = response?.data || response;
        setProfile(profileData);
      } catch (error) {
        console.error('❌ Error loading profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // Withdraw mutation
  const { mutate: withdraw, isPending: isWithdrawing } = useWithdraw({
    onSuccess: () => {
      setIsWithdrawModalOpen(false);
      alert('Withdrawal initiated successfully!');
    },
    onError: () => {
      alert('Withdrawal failed. Please try again.');
    },
  });

  const isLoading = userLoading || walletLoading || statsLoading || applicationsLoading || profileLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handlers
  const handleWithdraw = () => setIsWithdrawModalOpen(true);
  const handleConfirmWithdraw = (amount) => withdraw(amount);
  const handleCompleteProfile = () => router.push('/dashboard/manual-fill');
  const handleViewDetails = (applicationId) => alert(`Viewing application #${applicationId}`);

  // Extract last name / first name
  const rawName = profile?.full_name || user?.name || 'User';
  const userName = rawName
    .trim()
    .split(/\s+/)
    .slice(-1)[0]
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <Header userName={userName} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Auto-rotating carousel: ProfileBanner ↔ WalletCard */}
        <BannerCarousel
          profileCompletion={profileCompletion}
          wallet={wallet}
          onComplete={handleCompleteProfile}
          onWithdraw={handleWithdraw}
        />

        <div className="space-y-8">
          {/* Stats Grid - Full Width */}
          <StatsGrid stats={stats} />

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ApplicationsTable
                applications={applications}
                onViewDetails={handleViewDetails}
              />
            </div>
            <div className="lg:col-span-1">
              <ProfileCompletionCard
                profileData={profileCompletion}
                onCompleteProfile={handleCompleteProfile}
              />
            </div>
          </div>
        </div>
      </main>

      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        balance={wallet?.balance}
        onConfirm={handleConfirmWithdraw}
        isLoading={isWithdrawing}
      />
    </div>
  );
}