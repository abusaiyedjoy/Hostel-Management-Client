import FaqCtaSection from "@/components/layout/sections/faq-section";
import FeaturesSection from "@/components/layout/sections/features-section";
import RoomsSection from "@/components/layout/sections/room-section";
import StatsSection from "@/components/layout/sections/states-section";
import TestimonialsSection from "@/components/layout/sections/testimonials-section";
import HeroSection from "@/components/shadcn-studio/blocks/hero-section-41/hero-section-41";

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
        {/* <StatsSection /> */}

        {/* 6. FAQ + Final CTA */}
        <FaqCtaSection />

        {/* 5. Testimonials */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>
      </main>
    </div>
  );
};

export default HeroSectionPage;
