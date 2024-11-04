"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function HeroSecondarySection({
  bannerImage,
  sideImage,
  headingTop,
  headingMiddle,
  para,
  className,
  children,
  istranparentbtn
}) {
  const [dotPosition, setDotPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setDotPosition((prevPosition) => {
        const newPosition = prevPosition + direction * 2;
        if (newPosition >= 100 || newPosition <= 0) {
          setDirection((prevDirection) => -prevDirection);
        }
        return newPosition;
      });
    }, 50);

    return () => clearInterval(animationInterval);
  }, [direction]);

  return (
    <section
      className={` pt-[80px] ${bannerImage} bg-center bg-no-repeat bg-cover min-h-[550px] flex items-center ${className}`}
    >
      <div className="container mx-auto w-full px-4  flex  justify-between items-center">
        <div className="w-full  mb-8 md:mb-0 px-[15px]">
          <h2 className="   text-[16px] text-gray m-0">{headingTop}</h2>
          <h1 className="md:text-[54px] md:leading-[70px]  bg-gradient-to-r from-[#2db2b8]    to-[#1064ab]   md:font-extrabold mb-4 bg-clip-text text-transparent ">
            {headingMiddle}
          </h1>
          <p className="text-[#1d1a42] mb-8 text-[16px]">{para}</p>
          {/* <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full relative overflow-hidden group">
            <span className="relative z-10">GET STARTED</span>
            <span 
              className="absolute left-0 top-1/2 w-2 h-2 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{ left: `${dotPosition}%` }}
            ></span>
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
          </button> */}
          {children}
          <a href="#" id={`${istranparentbtn?"transparent":""}`} className="custom-btn">
            <span className="moving-circle"></span>
            Get Started
          </a>

        </div>
        <div className=" md:w-[90%] hidden md:block  relative">
          <Image
            src={sideImage}
            alt="Design Showcase"
            width={670}
            height={500}
            className="w-full "
          />
          
          {/* <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white p-2 rounded-lg shadow-md">
            <Image src="/placeholder.svg?height=40&width=40" alt="HTML5" width={40} height={40} />
          </div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 bg-white p-2 rounded-lg shadow-md">
            <Image src="/placeholder.svg?height=40&width=40" alt="CSS3" width={40} height={40} />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-md">
            <Image src="/placeholder.svg?height=40&width=40" alt="JavaScript" width={40} height={40} />
          </div> */}
        </div>
      </div>
    </section>
  );
}
