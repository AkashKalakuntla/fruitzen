import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Why } from "@/components/sections/why";
import { Menu } from "@/components/sections/menu";
import { Wellness } from "@/components/sections/wellness";
import { Gallery } from "@/components/sections/gallery";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Marquee />
      <About />
      <Why />
      <Menu />
      <Wellness />
      <Gallery />
      <Contact />
    </>
  );
}
