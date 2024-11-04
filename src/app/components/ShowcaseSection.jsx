"use client";
import React, { useState } from "react";
import { HeadingSection } from "./ui/Heading";
import { CategorySection } from "./ui/CategorySection";
import { services } from "./ServiceSection";

import { Plus, ChevronLeftSquare, ChevronRightSquare } from "lucide-react";

import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Switch } from "@/app/components/ui/switch"
import { Label } from "@/app/components/ui/label"
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
export const ShowcaseSection = () => {
    const [isIndustryWise, setIsIndustryWise] = useState(false)

    const categoryWiseServices = [
      "Abstract", "Iconic", "Illustration", "Mascot", "Minimal", "Monogram - Badge"
    ]
  
    const industryWiseServices = [
      "Technology", "Finance", "Healthcare", "Education", "Retail", "Entertainment"
    ]
  
    const currentServices = isIndustryWise ? industryWiseServices : categoryWiseServices
  const [activeCategory, setActiveCategory] = useState(
    Object.keys(services)[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };
  return (
    <div className="">
      <HeadingSection
        headingTop={"Goal and Client-Oriented Web Designs"}
        headingMiddle={"Together With Focused Marketing Methods"}
        para={
          "We create brands with impeccable logo and design knowledge incorporated with terms that attract your target audience."
        }
      />
           <CategorySection services={services} showSubCategories={true} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>

      <div className="w-full max-w-5xl mx-auto space-y-6">
      <div className="flex bg-gradient-to-r mb-[30px] max-w-sm md:h-[56px] mx-auto from-[#2db2b8] to-[#1064ab] items-center justify-center space-x-2 rounded-[40px]  p-[15px] shadow-[0_5px_20px_10px_#dadadafc] ">
        <Label
          htmlFor="industry-toggle"
          className={`cursor-pointer py-[5px] px-[15px]  text-[16px] font-bold transition-colors text-white `}
        >
          Category Wise
        </Label>
        <Switch
          id="industry-toggle"
          checked={isIndustryWise}
          onCheckedChange={setIsIndustryWise}
          className="h-[10px] w-[44px] data-[state=checked]:bg-[#b90c12] data-[state=unchecked]:bg-background"
        />
        <Label
          htmlFor="industry-toggle"
          className={`cursor-pointer py-[5px] px-[15px]  text-[16px] font-bold transition-colors text-white `}
        >
          Industry Wise
        </Label>
      </div>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {currentServices.map((service, index) => (
          <Button key={index} variant="outline" className="w-full">
            {service}
          </Button>
        ))}
      </div> */}
      {/* <CategorySection services={services} showSubCategories={true} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/> */}
    </div>
      <div className="flex m-auto items-center md:max-w-[1300px] justify-around flex-wrap">
        {services[activeCategory].map((service, index) => (
          <div
            onClick={() => openModal(index)}
            className="relative md:flex-[0_0_25%] md:mr-[15px] mb-[20px] overflow-hidden"
          >
            <img
              src={`https://www.logoaspire.com/assets/images/logo-tab-port/logo-Industry-wise/apparels-clothing/${
                index + 1
              }.jpg`}
              className="block w-full h-auto"
            />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[#c40e1487] opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 hover:bottom-0 hover:right-0 flex items-center justify-center">
              <Plus className="text-white w-[50px] h-[50px]" strokeWidth={5} />
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl h-1/2  w-full bg-transparent border-none p-4">
          <div className="relative flex  justify-between">
            <div className="">
              <Image
                src={`https://www.logoaspire.com/assets/images/logo-tab-port/logo-Industry-wise/apparels-clothing/${
                  currentImageIndex + 1
                }.jpg`}
                alt={"sss"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute bg-transparent hover:bg-transparent border-none w-[50px] h-[50px] left-2 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeftSquare
                fill="white"
                width={32}
                height={32}
                className="h-8 w-8 border-none"
              />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2  bg-transparent hover:bg-transparent border-none"
              onClick={nextImage}
            >
              <ChevronRightSquare
                fill="white"
                className="border-none"
                width={32}
                height={32}
              />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
