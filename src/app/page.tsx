import FaqCtaSection from "@/components/layout/sections/faq-section";
import FeaturesSection from "@/components/layout/sections/features-section";
import RoomsSection from "@/components/layout/sections/room-section";
import StatsSection from "@/components/layout/sections/states-section";
import TestimonialsSection from "@/components/layout/sections/testimonials-section";
import Footer from "@/components/shadcn-studio/blocks/hero-section-41/footer";
import Header from "@/components/shadcn-studio/blocks/hero-section-41/header";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-41/hero-section-41";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/menu-navigation";

const navigationData: NavigationSection[] = [
  {
    title: "About Us",
    href: "#",
  },
  {
    title: "Testimonials",
    href: "#",
  },
  {
    title: "Contact us",
    href: "#",
  },
  {
    title: "Offers",
    href: "#",
  },
];

const menudata = [
  {
    id: 1,
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-18.png",
    imgAlt: "plate-1",
    userComment:
      "The ambiance is perfect and the food is absolutely delicious. Highly recommended!",
    userAvatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png",
  },
  {
    id: 2,
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-19.png",
    imgAlt: "plate-2",
    userComment:
      "Best dining experience in town. The staff is friendly and the menu is exceptional.",
    userAvatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png",
  },
  {
    id: 3,
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-20.png",
    imgAlt: "plate-3",
    userComment:
      "Every dish is crafted with care. This place never disappoints!",
    userAvatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
  },
  {
    id: 4,
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-05.png",
    imgAlt: "plate-4",
    userComment:
      "Great atmosphere and incredible flavors. A must-visit restaurant!",
    userAvatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png",
  },
  {
    id: 5,
    img: "https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-20.png",
    imgAlt: "plate-3",
    userComment:
      "Every dish is crafted with care. This place never disappoints!",
    userAvatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png",
  },
];

const HeroSectionPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Header navigationData={navigationData} />

      <main className="flex flex-col pt-17.5">
        {/* 1. Hero */}
        <HeroSection menudata={menudata} />

        {/* 2. Features / Why Choose Us */}
        <FeaturesSection />

        {/* 3. Room Showcase */}
        <section id="rooms">
          <RoomsSection />
        </section>

        {/* 4. Stats / Social Proof */}
        <StatsSection />

        {/* 5. Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* 6. FAQ + Final CTA */}
        <FaqCtaSection />
      </main>

      <Footer />
    </div>
  );
};

export default HeroSectionPage;
