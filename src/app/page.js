import Image from "next/image";
import HeroSection from "./components/Herosection";
import Navbar from "./components/Header";
import UniqueFeatures from "./components/UniqueFeatures";
import ServicesSection from "./components/ServiceSection";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { PackageSection } from "./components/PackageSection";
import { ContactusSection } from "./components/ContactusSection";
import HeroSecondarySection from "./components/HeroSecondarySection";
import { AboutSection } from "./components/AboutSection";

export default function Home() {
  return (
<div className="App ">

<HeroSection/>
<UniqueFeatures/>
<ServicesSection/>
<AboutSection/>
<ShowcaseSection/>
<PackageSection/>
<ContactusSection/>
</div>
  );
}
