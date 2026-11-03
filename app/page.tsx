import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/sections/about";
import { Why } from "@/components/sections/why";
import { Menu } from "@/components/sections/menu";
import { Wellness } from "@/components/sections/wellness";
import { Gallery } from "@/components/sections/gallery";
import { Partner } from "@/components/sections/partner";
import { Contact } from "@/components/sections/contact";
import { getResource } from "@/lib/resources";

export default function Home() {
  // Only link the cold-pressed guide when that page is reachable
  // (published in production; drafts are reachable in dev).
  const showColdPressLink = getResource("cold-pressed-juice-kukatpally") !== null;

  return (
    <>
      <Hero />
      <SocialProof />
      <Marquee />
      <About showColdPressLink={showColdPressLink} />
      <Why />
      <Menu />
      <Wellness />
      <Gallery />
      <Partner />
      <Contact />
    </>
  );
}
