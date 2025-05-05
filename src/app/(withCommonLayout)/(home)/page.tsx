// app/page.tsx (Home Page)

import Featured from "@/components/modules/Home/FeaturedSection";
import Features from "@/components/modules/Home/Features";
import Hero from "@/components/modules/Home/Hero";
import Testimonials from "@/components/modules/Home/Testimonial";

import CustomContainer from "@/components/ui/core/CustomContainer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CustomContainer>
        <Features />
        <Featured />
        <Testimonials />
      </CustomContainer>
    </main>
  );
}
