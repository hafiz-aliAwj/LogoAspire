"use client";
import React, { useState } from "react";
import { HeadingSection } from "./ui/Heading";
import { CategorySection } from "./ui/CategorySection";
import { services } from "./ServiceSection";

import { Plus} from 'lucide-react'


import Image from "next/image";
import Fancybox from "./ui/Fancybox";
import Link from "next/link";
export const ShowcaseSection = ({children}) => {
  

  
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(services)[0]
  );
 
  return (
    <div className="container max-w-[1356px] px-[15px] mx-auto relative">
      <div className="container max-w-[1170px]  mx-auto pt-[90px]">
      <HeadingSection
        headingTop={"Goal and Client-Oriented Web Designs"}
        headingMiddle={"Together With Focused Marketing Methods"}
        para={
          "We create brands with impeccable logo and design knowledge incorporated with terms that attract your target audience."
        }
      />
      <CategorySection
        services={services}
        showSubCategories={true}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
        showToggleButton={true}
      />
      </div>

      <Fancybox
  options={{
    Carousel: {
      infinite: false,
    },
  }}
>
      <div className="flex m-auto items-center  md:max-w-[1300px] justify-center flex-wrap">
        {services[activeCategory].map((service, index) => (
           <Link
           data-fancybox="gallery" href={`https://www.logoaspire.com/assets/images/webp/portfolio/website/thumb-${index+1}.webp`}
           className="relative md:flex-[0_0_23.5%] md:mr-[15px] mb-[20px] overflow-hidden"
         >
           <Image
             src={`https://www.logoaspire.com/assets/images/webp/portfolio/website/thumb-${index+1}.webp`}
             className="block w-full h-auto" width={150} height={200}
             />
           <div className="absolute bottom-0 right-0 w-full h-full bg-[#c40e1487] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:bottom-0 hover:right-0 flex items-center justify-center">
             <Plus className="text-white w-[50px] h-[50px]" strokeWidth={5} />
           </div>
         </Link>
         
        ))}
      </div>
      
      </Fancybox>
  {children}
    </div>
  );
};
