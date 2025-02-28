'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  return (
    <>
    <section className="pt-20 bg-[url('https://www.vectorlabz.com/assets/images/banner/banner-home.jpg')] bg-center bg-cover h-screen flex items-center">
    <div className="container mx-auto px-4 pt-16 flex flex-wrap items-center">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4">
        <h2 className="font-semibold text-xl md:text-2xl text-[#333333] m-0">
          PROFICIENT DESIGN AGENCY.
        </h2>
        <h1 className="text-3xl md:text-[50px] leading-tight md:leading-[65px] bg-gradient-to-r from-[#34D2FC] to-[#1064ab] font-extrabold mb-4 bg-clip-text text-transparent">
          Surpassing with <br /> the Modernization <br /> & Originality.
        </h1>
        <p className="text-gray-600 mb-8 text-base md:text-lg">
          Helping brands to digitally transform with a spice of innovation and technical expertise.
        </p>
        <a href="#" className="custom-btn">
          <span className="moving-circle"></span>
          Get Started
        </a>
      </div>

      {/* Hide image on mobile screens, show on medium and larger screens */}
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://www.vectorlabz.com/assets/images/webp/elements/banner-element-1.webp"
          alt="Design Showcase"
          width={670}
          height={500}
        />
      </div>
    </div>
  </section>
  
  </>
  )
}