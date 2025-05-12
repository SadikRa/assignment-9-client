import Hero from "@/components/modules/Home/Hero";

import CustomContainer from "@/components/ui/core/CustomContainer";
import WhyTrustUs from "@/components/modules/Home/WhyTrustUs";
import Testimonials from "@/components/modules/Home/Testimonial";
import FeaturedProducts from "@/components/modules/Home/FeaturedProducts";

export default function Home() {
  return (
    <main>
      <Hero />
      <CustomContainer>
        <FeaturedProducts />
        <WhyTrustUs />
        <Testimonials />
      </CustomContainer>
    </main>
  );
}
