import React, { Suspense } from 'react';
import HeroSection from "@/components/Herosection";
import UniqueFeatures from "@/components/UniqueFeatures";
import ServicesSection from "@/components/ServiceSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { PackageSection } from "@/components/PackageSection";
import { ContactusSection } from "@/components/ContactusSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactUsForm } from "@/components/ContactUsForm";
import SentEmails from "@/components/SentEmails";

export default function Home() {
  return (
    <div className="App">
      <HeroSection />
      {/* <FancyboxGallery/> */}
      <UniqueFeatures />
      <ServicesSection />
      <AboutSection />
      <ShowcaseSection />
      <PackageSection />
      <ContactusSection />
      <ContactUsForm />
      
      {/* Wrap SentEmails in Suspense to handle loading
      <Suspense fallback={<div>Loading Sent Emails...</div>}>
        <SentEmails />
      </Suspense> */} 
    </div>
  );
}
