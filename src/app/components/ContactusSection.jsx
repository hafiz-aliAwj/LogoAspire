"use client"
import React from "react";
import { HeadingSection } from "./ui/Heading";
import { Phone, PhoneCall } from "lucide-react";
import Image from "next/image";

export const ContactusSection = () => {
  return (
    <div className="border-t flex flex-col max-w-[1300px]  items-center border-[#cccccc] pt-[167px] pb-[77px]">
      <HeadingSection
        headingTop={"READY"}
        headingMiddle={"TO WORK WITH US?"}
        para={"Contact us to discuss your logo design or general inquiries"}
        className1={"text-[54px] boldtext text-gray max-w-[77%] "}
        className2={"pt-[24px] text-[24px]"}
        classNameSpan={"before-bg"}
      />
      <div className="flex items-center justify-around w-full">
        <div className="flex items-center">
          <div className="py-[20px] px-[24px] border-2 border-black">
            <Image
              width={40}
              height={55}
              src={
                "https://www.logoaspire.com/assets/images/webp/mix/tele_icon.webp"
              }
            />
          </div>
          <div className="relative right-[2%] pb-[8px]  bg-white">
            <p className="text-darkGray">Call Us Anytime</p>
            <a className="text-[24px] font-bold" href="tel:(628)313-4168" >(628) 313-4168</a>
          </div>
          </div>
          <div className="flex items-center ">
          <div className="py-[20px] px-[24px] border-2 border-black">
            <Image
              width={40}
              height={55}
              src={
                "https://www.logoaspire.com/assets/images/webp/mix/chat_icon.webp"
              }
            />
          </div>
          <div className="relative right-[2%] pb-[8px] bg-white">
            <p className="text-darkGray">Talk To Us Now To</p>
            <p className="text-[24px] font-bold">Discuss Your Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};
