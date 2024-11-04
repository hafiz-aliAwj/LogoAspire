"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
const countries = [
  { code: "+92", name: "Pakistan", flagUrl: "https://flagcdn.com/w20/pk.png" },
  {
    code: "+1",
    name: "United States",
    flagUrl: "https://flagcdn.com/w20/us.png",
  },
  {
    code: "+44",
    name: "United Kingdom",
    flagUrl: "https://flagcdn.com/w20/gb.png",
  },
  { code: "+91", name: "India", flagUrl: "https://flagcdn.com/w20/in.png" },
  // Add more countries as needed
];
export const ContactUsForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };
  return (
    <div className="form-wrap">
      <span className="form-child-wrap"></span>
      <div className="container flex relative ">
        <div className="px-[15px] w-[42%] flex-[0_0_42%] relative">
          <div className="bg-gradient-to-r from-[#111111] to-[#0b0b0b] flex flex-col justify-center    h-[410px] mt-3 p-[85px_60px_60px_40px]">
            <div class="quote">
              <p>Let creativity take over</p>
            </div>
            <h2 className="text-[18px]  font-semibold mb-[30px] text-[#ffffff7d]">
              Ask us anything, we have the friendliest customer service folks
            </h2>
            <a
              href="tel:(628)313-4168"
              className="mb-2 text-2xl font-semibold text-white no-underline"
            >
              (628) 313-4168
            </a>
            <a className="mb-2 text-2xl font-semibold text-white no-underline">
              info@logoaspire.com
            </a>
            <Button className="font-semibold mt-2 px-6 py-3 bg-white rounded w-2/3 text-[#333333] ">
              <strong className="text-secondaryColor">Chat now</strong>
              to avail this offer
            </Button>
          </div>
        </div>
        <div className="relative w-[42%] px-[15px] flex-[0_0_42%] ">
          <h1 className="text-secondaryColor text-[50px] font-bold ">
            Let’s get started!
          </h1>
          <h3 className="text-darkGray text-[16px] mb-4">
            Contact us by using the form below or send us an email.
          </h3>
          <div className="flex flex-col">
            <input
              placeholder="Enter Your Name"
              className="h-[54px] rounded-[50px] pl-[20px] pr-[8px] py-[12px] text-[15px] text-black mb-[25px] border border-gray-300 "
            />
            <input
              placeholder="Enter Your Email"
              type="email"
              className="h-[54px] rounded-[50px] pr-[8px] py-[12px] pl-[20px] text-[15px] text-black mb-[25px] border border-gray-300 "
            />
            <div className="relative w-full     ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="absolute left-0 top-0 h-full flex items-center px-4 py-2  cursor-pointer border border-gray-300 rounded-l-full bg-gray-100">
                    <Image
                      src={selectedCountry.flagUrl}
                      alt={`${selectedCountry.name} Flag`}
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                    <span className="text-gray-700 text-sm">
                      {selectedCountry.code}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 max-h-48 overflow-y-auto">
                  {countries.map((country) => (
                    <DropdownMenuItem
                      key={country.code}
                      onClick={() => handleSelectCountry(country)}
                      className="flex items-center px-4 py-4 cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src={country.flagUrl}
                        alt={`${country.name} Flag`}
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      <span>
                        {country.code} {country.name}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-full outline-none text-sm text-gray-700 placeholder-gray-400 pl-[20px] pr-[8px] py-[12px]"
                style={{ paddingLeft: "90px" }} // Additional padding for flag & code
              />
            </div>
            <span className="my-[20px] text-[10px] ml-3">By clicking "Submit," you confirm that you agree to Logo Aspire Privacy Policy.</span>
            <a href="#" className="custom-btn w-[200px]">
            <span className="moving-circle"></span>
            <span className="text-[12px]">Send Now</span>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
};
