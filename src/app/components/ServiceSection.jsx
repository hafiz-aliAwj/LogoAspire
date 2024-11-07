"use client";
import { useState } from "react";
import {
  ChevronRight,
  Code,
  PenTool,
  BarChart,
  Smartphone,
  Film,
  FileText,
} from "lucide-react";
import Image from "next/image";
import { HeadingSection } from "./ui/Heading";
import { CategorySection } from "./ui/CategorySection";

export const services = {
  "Logo Design": [
    {
      icon: "https://www.vectorlabz.com/assets/images/webp/service-type/animation",
      title: "Brand Identity",
      description: "Create a unique visual identity for your brand",
    },
    {
      icon: "https://www.vectorlabz.com/assets/images/webp/service-type/animation",
      title: "Logo Redesign",
      description: "Refresh and modernize your existing logo",
    },
    {
      icon: "https://www.vectorlabz.com/assets/images/webp/service-type/animation",
      title: "Brand Identity",
      description: "Create a unique visual identity for your brand",
    },
    {
      icon: "https://www.vectorlabz.com/assets/images/webp/service-type/animation",
      title: "Brand Identity",
      description: "Create a unique visual identity for your brand",
    },
    {
      icon: "https://www.vectorlabz.com/assets/images/webp/service-type/animation",
      title: "Brand Identity",
      description: "Create a unique visual identity for your brand",
    },
    {
      icon: "https://www.vectorlabz.com/assets/images/webp/service-type/animation",
      title: "Brand Identity",
      description: "Create a unique visual identity for your brand",
    },
   
  ],
  "Web Development": [
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "Responsive Design",
      description: "Create websites that work on all devices",
    },
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "E-commerce Solutions",
      description: "Build online stores with secure payment gateways",
    },
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "E-commerce Solutions",
      description: "Build online stores with secure payment gateways",
    },
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "E-commerce Solutions",
      description: "Build online stores with secure payment gateways",
    },{
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "Responsive Design",
      description: "Create websites that work on all devices",
    },
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "E-commerce Solutions",
      description: "Build online stores with secure payment gateways",
    },
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "E-commerce Solutions",
      description: "Build online stores with secure payment gateways",
    },
    {
      icon: "https://www.logoaspire.com/assets/images/webp/service-type/website",

      title: "E-commerce Solutions",
      description: "Build online stores with secure payment gateways",
    },
    
    
  ],
  "Digital Marketing": [
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "SEO",
      description: "Improve your search engine rankings",
    },
    {
      icon: <BarChart className="w-8 h-8 text-primary" />,
      title: "Social Media Marketing",
      description: "Engage with your audience on social platforms",
    },
  ],
  "Mobile Apps": [
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "iOS Development",
      description: "Create apps for Apple devices",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "Android Development",
      description: "Build apps for Android devices",
    },
  ],
  "Video Animation": [
    {
      icon: <Film className="w-8 h-8 text-primary" />,
      title: "2D Animation",
      description: "Create engaging 2D animated videos",
    },
    {
      icon: <Film className="w-8 h-8 text-primary" />,
      title: "3D Animation",
      description: "Produce stunning 3D animated content",
    },
  ],
  "Marketing Collateral": [
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Brochure Design",
      description: "Design professional marketing brochures",
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Business Cards",
      description: "Create impactful business cards",
    },
  ],
};

export default function ServicesSection() {
  const servicesList = Object.keys(services);
console.log(servicesList)
  const [activeCategory, setActiveCategory] = useState(servicesList[0]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <HeadingSection
          headingTop={"Our unparalleled websites"}
          headingMiddle={"To Build Concrete Digital Existence."}
          para={
            " Our thorough website development process starts by comprehending your business aims and the targeted audience so that we can design and create striking websites, logo designs, digital marketing, mobile apps, and video animation."
          }
        />
       <CategorySection services={services} setActiveCategory={setActiveCategory} showSubCategories={false} activeCategory={activeCategory}/>
      {/* <CategorySection services={services[activeCategory]} setActiveCategory={setActiveCategory} /> */}
       <div className="flex m-auto items-center md:max-w-[1170px] justify-center flex-wrap">
        {services[activeCategory].map((service, index) => (
          <div className=" md:w-[23.5%] md:mr-[15px] mb-[20px]">
            <div
              key={index}
              className="bg-transparent p-3 md:p-0  cursor-pointer  flex flex-col justify-center items-center h-[221px] border-[#cccccc] hover:bg-white  border transition-all duration-500   hover:shadow-[0_29px_62px_0px_rgba(0,0,0,0.19)]  "
            >
              <div className="mb-4">
                <img
                  src={`${service.icon}/icon${index + 1}.webp`}
                  className="  block"
                />
              </div>
              <h4>{service.title}</h4>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
