"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSecondarySection({
  bannerImage,
  sideImage,
  headingTop,
  headingMiddle,
  para,
  className,
  children,
  istranparentbtn,
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
      className={`pt-20 ${bannerImage} bg-center bg-no-repeat bg-cover min-h-[550px] flex items-center ${className}`}
    >
      <div className="container mx-auto w-full px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Text Section */}
        <div className="w-full mb-8 md:mb-0 px-4 text-center md:text-left md:w-1/2">
          <h2 className="text-[16px] text-gray-600 m-0">{headingTop}</h2>
          <h1 className="text-[30px] leading-[40px] md:text-[50px] md:leading-[60px] bg-gradient-to-r from-[#34D2FC] to-[#1064ab] font-extrabold mb-4 bg-clip-text text-transparent">
            {headingMiddle}
          </h1>
          <p className="text-[#1d1a42] mb-8 text-[16px] md:text-[16px]">{para}</p>
          <div className="md:flex-row gap-2 flex-col flex  items-center">
          {children}
          <a
            href="#"
            id={`${istranparentbtn ? "transparent" : ""}`}
            className="custom-btn inline-block "
          >
            <span className="moving-circle"></span>
            Get Started
          </a>
        </div>
</div>
        {/* Image Section */}
        <div className="w-full md:w-1/2 px-4 hidden md:flex justify-center relative">
          {sideImage && (
            <Image
              src={sideImage}
              alt=""
              width={670}
              height={500}
              className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[670px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
