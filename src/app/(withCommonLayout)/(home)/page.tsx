// app/page.tsx (Home Page)

import { HeroSection } from "@/components/modules/Home/HeroSection";
import Hero from "@/components/modules/Home/Hero";

import CustomContainer from "@/components/ui/core/CustomContainer";
import WhyTrustUs from "@/components/modules/Home/WhyTrustUs";
import Testimonials from "@/components/modules/Home/Testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <CustomContainer>
        <HeroSection
          title="Discover Trusted Product Reviews"
          subtitle="Thousands of honest reviews to help you choose smarter."
          showSearch={true}
        />
        <WhyTrustUs />
        <Testimonials />
      </CustomContainer>
    </main>
  );
}
