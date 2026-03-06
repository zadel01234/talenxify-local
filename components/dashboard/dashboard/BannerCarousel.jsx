'use client';

import { useState, useEffect, useCallback } from 'react';
import ProfileBanner from '@/components/dashboard/dashboard/ProfileBanner';
import WalletCard from '@/components/dashboard/dashboard/WalletCard';

const SLIDE_INTERVAL = 2 * 60 * 1000; // 2 minutes

export default function BannerCarousel({
  profileCompletion,
  wallet,
  onComplete,
  onWithdraw,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index) => {
      if (index === activeIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 300);
    },
    [activeIndex, isTransitioning]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % 2);
  }, [activeIndex, goTo]);

  // Auto-advance every 2 minutes
  useEffect(() => {
    const timer = setInterval(goNext, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  const slides = [
    <ProfileBanner
      key="banner"
      percentage={profileCompletion?.percentage}
      onComplete={onComplete}
    />,
    <div key="wallet" className="lg:w-3/5">
      <WalletCard
        balance={wallet?.balance}
        pendingPayment={wallet?.pendingPayment}
        currency={wallet?.currency}
        onWithdraw={onWithdraw}
      />
    </div>,
  ];

  return (
    <div className="relative mb-8">
      {/* Slide container */}
      <div
        className="transition-all duration-300"
        style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)' }}
      >
        {slides[activeIndex]}
      </div>


    </div>
  );
}