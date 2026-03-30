import Footer from "@/components/shadcn-studio/blocks/hero-section-41/footer";
import Header from "@/components/shadcn-studio/blocks/hero-section-41/header";
import { NavigationSection } from "@/components/shadcn-studio/blocks/menu-dropdown";

const navigationData: NavigationSection[] = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Testimonials",
    href: "/testimonials",
  },
  {
    title: "Contact us",
    href: "/contact",
  },
];

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header navigationData={navigationData} />
      {children}
      <Footer />
    </>
  );
};

export default CommonLayout;
