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