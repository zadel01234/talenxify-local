// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import ProfileBanner from '@/components/dashboard/dashboard/ProfileBanner';
// import WalletCard from '@/components/dashboard/dashboard/WalletCard';

// const SLIDE_INTERVAL = 2 * 60 * 1000; // 2 minutes

// export default function BannerCarousel({
//   profileCompletion,
//   wallet,
//   onComplete,
//   onWithdraw,
// }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const goTo = useCallback(
//     (index) => {
//       if (index === activeIndex || isTransitioning) return;
//       setIsTransitioning(true);
//       setTimeout(() => {
//         setActiveIndex(index);
//         setIsTransitioning(false);
//       }, 300);
//     },
//     [activeIndex, isTransitioning]
//   );

//   const goNext = useCallback(() => {
//     goTo((activeIndex + 1) % 2);
//   }, [activeIndex, goTo]);

//   // Auto-advance every 2 minutes
//   useEffect(() => {
//     const timer = setInterval(goNext, SLIDE_INTERVAL);
//     return () => clearInterval(timer);
//   }, [goNext]);

//   const slides = [
//     <ProfileBanner
//       key="banner"
//       percentage={profileCompletion?.percentage}
//       onComplete={onComplete}
//     />,
//     <div key="wallet" className="lg:w-3/5">
//       <WalletCard
//         balance={wallet?.balance}
//         pendingPayment={wallet?.pendingPayment}
//         currency={wallet?.currency}
//         onWithdraw={onWithdraw}
//       />
//     </div>,
//   ];

//   const labels = ['Profile', 'Wallet'];

//   return (
//     <div className="relative mb-8">
//       {/* Slide container */}
//       <div
//         className="transition-all duration-300"
//         style={{ opacity: isTransitioning ? 0 : 1, transform: isTransitioning ? 'translateY(6px)' : 'translateY(0)' }}
//       >
//         {slides[activeIndex]}
//       </div>

//       {/* Dot indicators + labels */}
//       <div className="flex items-center justify-center gap-3 mt-4">
//         {labels.map((label, i) => (
//           <button
//             key={i}
//             onClick={() => goTo(i)}
//             className="flex items-center gap-1.5 group focus:outline-none"
//             aria-label={`Show ${label}`}
//           >
//             <span
//               className={`block rounded-full transition-all duration-300 ${
//                 i === activeIndex
//                   ? 'w-6 h-2 bg-indigo-500'
//                   : 'w-2 h-2 bg-gray-300 group-hover:bg-gray-400'
//               }`}
//             />
//             <span
//               className={`text-xs font-medium transition-colors duration-200 ${
//                 i === activeIndex ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'
//               }`}
//             >
//               {label}
//             </span>
//           </button>
//         ))}
//       </div>

//       {/* Countdown progress bar */}
//       <CountdownBar key={activeIndex} duration={SLIDE_INTERVAL} onComplete={goNext} />
//     </div>
//   );
// }

// function CountdownBar({ duration, onComplete }) {
//   const [width, setWidth] = useState(100);

//   useEffect(() => {
//     setWidth(100);
//     const start = Date.now();
//     const interval = setInterval(() => {
//       const elapsed = Date.now() - start;
//       const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
//       setWidth(remaining);
//       if (remaining === 0) clearInterval(interval);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [duration]);

//   return (
//     <div className="mt-3 h-0.5 bg-gray-100 rounded-full overflow-hidden">
//       <div
//         className="h-full bg-indigo-300 rounded-full transition-none"
//         style={{
//           width: `${width}%`,
//           transition: `width 1s linear`,
//         }}
//       />
//     </div>
//   );
// }



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