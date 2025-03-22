"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission

    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: selectedCountry.code + formData.phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage("✅ Your Details have been Recorded!");
        setFormData({ name: "", email: "", phone: "" }); // Reset form
      } else {
        setResponseMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResponseMessage("❌ Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrap md:-right-16">
      <span className="form-child-wrap hidden md:flex"></span>
      <div className="md:container max-w-full md:text-start text-center   flex relative md:flex-row flex-col">
        <div className="px-[15px] md:w-[42%] w-full flex-[0_0_42%] relative">
          <div className="bg-gradient-to-r from-[#111111] to-[#0b0b0b] flex flex-col justify-center w-full   h-auto md:h-[410px] mt-3 px-[20px] py-[25px] md:p-[85px_60px_60px_40px]">
            <div class="md:block quote hidden ">
              <p>Let creativity take over</p>
            </div>
            <div class="md:hidden   block bg-white p-[20px] mb-[20px]">
              <p className="text-[16px] font-bold text-gray  md:text-start text-center">
                Let creativity take over
              </p>
            </div>
            <h2 className="text-[18px]  font-semibold mb-[10px] md:text-start text-center md:mb-[30px] text-[#ffffff7d]">
              Ask us anything, we have the friendliest customer service folks
            </h2>
            <a
              href="tel:(628)313-4168"
              className="mb-2 text-[16px] md:text-2xl font-semibold text-white no-underline"
            >
              (628) 313-4168
            </a>
            <a className="mb-2 text-[16px] md:text-2xl font-semibold text-white no-underline">
              info@logoaspire.com
            </a>
            <Button
              variant="outline"
              className="font-semibold mt-2 px-6 py-3 bg-white rounded w-full  md:w-3/5 text-[#333333] "
            >
              <strong className="text-secondaryColor">Chat now</strong>
              to avail this offer
            </Button>
          </div>
        </div>
        <div className="relative max-w-full md:w-[42%] px-[15px] flex-[0_0_42%] ">
          <h1 className="text-secondaryColor text-[30px] md:text-[50px] font-bold ">
            Let’s get started!
          </h1>
          <h3 className="text-darkGray text-[16px] mb-4">
            Contact us by using the form below or send us an email.
          </h3>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="h-[54px] rounded-[50px] pl-[20px] pr-[8px] py-[12px] text-[15px] text-black mb-[25px] border border-gray-300 "
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-full outline-none text-sm text-gray-700 placeholder-gray-400 pl-[20px] pr-[8px] py-[12px]"
                style={{ paddingLeft: "90px" }} // Additional padding for flag & code
              />
            </div>
            <span className="my-[20px] text-[10px] ml-3">
              By clicking "Submit," you confirm that you agree to Logo Aspire
              Privacy Policy.
            </span>
            <button className="custom-btn w-[200px]" type="button" onClick={handleSubmit}>
              {loading ? "Sending..." : (
                <>
                  <span className="moving-circle"></span>
                  <span className="text-[12px]">Send Now</span>
                </>
              )}
            </button>

            {responseMessage && <p className="mt-2 ">{responseMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
