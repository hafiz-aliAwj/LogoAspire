"use client";
import React, { useState } from "react";
import { services } from "@/components/ServiceSection";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowLeftSquare,
  ArrowRight,
  ArrowRightSquare,
  ChevronLeftSquare,
  ChevronRightSquare,
} from "lucide-react";
import Image from "next/image";

export const ServiceTypes = ({ service }) => {
  const serviceList = Object.keys(services);
  const [activeCategory, setActiveCategory] = useState(serviceList[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => prevIndex - 1);
  };
  return (
    <div className="container max-w-[1350px] ">
      <div className="bg-black md:pt-[60px] py-10 md:pb-[200px]">
        <div className="container mx-auto px-[15px]">
          <h1
            className={`md:text-4xl text-[25px] text-white text-center mb-4 `}
          >
            Premium Quality{" "}
            <span className="text-secondaryColor">{service}</span>
          </h1>
          <p className="text-center text-[#e7e6ff] md:w-[60%] nd:mb-12   w-full  md:text-[15px] md:leading-7 text-sm  mx-auto">
            We help businesses, startups, entrepreneurs, and different
            organizations grow exponentially through our result, and
            conversion-oriented {service} approach.
          </p>
        </div>
      </div>
      <div className="md:pb-[80px] py-10">
        <div className="container md:w-[1170px] sm:max-w-screen-sm sm:w-screen max-w-[320px] md:max-w-[1200px] mx-auto">
          <div
            className={`  w-full flex md:flex-row flex-col px-[15px] md:p-0 justify-center   md:mt-[-160px] border-b text-center bg-white rounded-tr-[10px] rounded-tl-[10px]  `}
          >
            {serviceList?.map((category) => (
              <button
                key={category}
                className={`p-[24px_30.8px] hover:bg-[#d9d9d9] 
              ${activeCategory === category ? "bg-[#d9d9d9]" : "bg-transparent"}
                 
              `}
                onClick={() => {
                  setActiveCategory(category);
                  console.log(activeCategory);
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="bg-white px-[15px]">
            <div className="p-[2rem_2.2rem]">
              <h1
                className={`text-[23px] md:text-4xl   mb-4 text-secondaryColor `}
              >
                eCommerce {service}
              </h1>
              <p className=" text-[#666]  mb-12 text-[16px] font-sans  md:text-[18px]  ">
                We bring forward a broad spectrum of eCommerce comprehensive
                solutions that your website requires. Optimize the efficiency of
                your business & custom web development services through upscale,
                versatile, and user-friendly eCommerce sites {service} approach.
              </p>
            </div>
            <div className="flex m-auto items-center md:max-w-[1300px] justify-around flex-wrap">
              {services[activeCategory].slice(0, 4).map((service, index) => (
                <div
                  onClick={() => openModal(index)}
                  className="relative border border-[#ccc] md:border-0 md:flex-[0_0_20%] md:mr-[15px] mb-[20px] overflow-hidden"
                >
                  <img
                    src={`	https://www.logoaspire.com/assets/images/webp/portfolio/website/inner/ecommerce/${
                      index + 1
                    }.webp`}
                    className="block w-full h-auto"
                  />
                </div>
              ))}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="max-w-7xl h-1/2  w-full bg-transparent border-none p-4">
                <div className="relative flex  justify-between">
                  <div className="">
                    <Image
                      src={`https://www.logoaspire.com/assets/images/webp/portfolio/website/inner/ecommerce/${
                        currentImageIndex + 1
                      }.webp`}
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
                    <ArrowLeft
                      width={32}
                      height={32}
                      className="h-5 w-5 bg-[#292929] p-1 border-none"
                    />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2  bg-transparent hover:bg-transparent border-none"
                    onClick={nextImage}
                  >
                    <ArrowRight
                      className="h-5 w-5 bg-[#292929] p-1 stroke-[#fff7f7]"
                      width={32}
                      height={32}
                    />
                    <span className="sr-only">Next image</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
