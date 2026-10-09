import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import PartnerSlider from "@/components/PartnerSlider";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import JsonLdSchema from "@/components/JsonLdSchema";
import StickyFeatureSection from "@/components/ui/sticky-scroll-cards-section";
import RotatingGradientRight from "@/components/ui/rotating-gradient-right";
import ClientReviewsMarquee from "@/components/ui/marquee-card";
import { CrowdCanvas } from "@/components/ui/skiper39";

// Lazy load below-the-fold components for better performance 
const SolutionsSection = lazy(() => import("@/components/SolutionsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
  </div>
);

const Index = () => {
  const location = useLocation();

  // Scroll to contact section when navigated with ?contact=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contactRequested = params.get("contact");
    if (contactRequested) {
      const tryScroll = () => {
        const el = document.getElementById("contact-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          setTimeout(tryScroll, 250);
        }
      };
      // Delay slightly to allow lazy-loaded component to mount
      setTimeout(tryScroll, 250);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <HeroSection />
      <PartnerSlider />
      <AboutSection />
      
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <SolutionsSection />
        </Suspense>
      </ErrorBoundary>
      
      <WhyChooseSection />
      
      {/* Services Sticky Stack Section */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <StickyFeatureSection />
      </ErrorBoundary>

      {/* Rotating Gradient Callout to Avinyax */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <RotatingGradientRight />
      </ErrorBoundary>

      {/* Standalone Client Reviews Section */}
      <section className="pt-20 pb-0 bg-white border-t border-gray-100 overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 text-center tracking-tight" style={{ fontFamily: "'Rostex', sans-serif" }}>
            CLIENT <span className="text-black/85">REVIEWS</span>
          </h2>
          <p className="text-center text-sm md:text-base text-gray-500 max-w-xl mx-auto mb-10">
            Trusted by fast-growing startups and global enterprises for secure, mission-critical IT infrastructure.
          </p>
          <div className="w-full relative z-10 mb-8">
            <ErrorBoundary fallback={<SectionLoader />}>
              <ClientReviewsMarquee />
            </ErrorBoundary>
          </div>
        </div>

        {/* Crowd Canvas at bottom - strictly below cards with zero overlap */}
        <div className="w-full relative h-[180px] sm:h-[190px] overflow-hidden bg-white">
          <CrowdCanvas
            src="/openpeeps.png"
            rows={15}
            cols={7}
            className="w-full h-full block"
          />
        </div>
      </section>
      
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </ErrorBoundary>
      
    </div>
  );
};

export default Index;
