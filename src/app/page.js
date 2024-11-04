import Image from "next/image";
import HeroSection from "./components/Herosection";
import Navbar from "./components/Header";
import UniqueFeatures from "./components/UniqueFeatures";
import ServicesSection from "./components/ServiceSection";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { PackageSection } from "./components/PackageSection";
import { ContactusSection } from "./components/ContactusSection";

export default function Home() {
  return (
<div className="App">

<HeroSection/>
<UniqueFeatures/>
<ServicesSection/>
<ShowcaseSection/>
<PackageSection/>
<ContactusSection/>
</div>
  );
}
