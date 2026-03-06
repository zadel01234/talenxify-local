// import AboutSection from "@/components/shared/home/about";
// import Hero from "@/components/shared/home/hero";
// import HowItWorks from "@/components/shared/home/how-it-works";
// import JobSearchSection from "@/components/shared/home/stats";
// import Target from "@/components/shared/home/target";
// import TestimonialsSection from "@/components/shared/home/testimonials";
// import WhyChooseTalenxify from "@/components/shared/home/why-choose";

// export default function Home() {
//   return (
//     <div>
//       <Hero />
//       <JobSearchSection />
//       <AboutSection />
//       <Target />
//       <HowItWorks />
//       <WhyChooseTalenxify />
//       <TestimonialsSection />
//     </div>
//   );
// }

// app/page.tsx


// import dynamic from 'next/dynamic'
// import Hero from "@/components/shared/home/hero"
// import JobSearchSection from "@/components/shared/home/stats"

// const AboutSection = dynamic(() => import("@/components/shared/home/about"))
// const Target = dynamic(() => import("@/components/shared/home/target"))
// const HowItWorks = dynamic(() => import("@/components/shared/home/how-it-works"))
// const WhyChooseTalenxify = dynamic(() => import("@/components/shared/home/why-choose"))
// const TestimonialsSection = dynamic(() => import("@/components/shared/home/testimonials"))

// export default function Home() {
//   return (
//     <div>
//       <Hero />
//       <JobSearchSection />
//       <AboutSection />
//       <Target />
//       <HowItWorks />
//       <WhyChooseTalenxify />
//       <TestimonialsSection />
//     </div>
//   );
// }


import dynamic from 'next/dynamic'

const Hero = dynamic(() => import("@/components/shared/home/hero"))
const JobSearchSection = dynamic(() => import("@/components/shared/home/stats"))
const AboutSection = dynamic(() => import("@/components/shared/home/about"))
const Target = dynamic(() => import("@/components/shared/home/target"))
const HowItWorks = dynamic(() => import("@/components/shared/home/how-it-works"))
const WhyChooseTalenxify = dynamic(() => import("@/components/shared/home/why-choose"))
const TestimonialsSection = dynamic(() => import("@/components/shared/home/testimonials"))

export default function Home() {
  return (
    <div>
      <Hero />
      <JobSearchSection />
      <AboutSection />
      <Target />
      <HowItWorks />
      <WhyChooseTalenxify />
      <TestimonialsSection />
    </div>
  );
}