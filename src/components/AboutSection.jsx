import Image from 'next/image'
import React from 'react'

export const AboutSection = () => {
  return (
    <div className='flex container max-w-[100vw] items-center px-[15px]  bg-center bg-cover bg-no-repeat justify-center gap-x-5 bg-[url("https://www.logoaspire.com/assets/images/bg/bg-cta.jpg")]'>
        <div className='mx-[15px] hidden md:block'>
          <Image src={'https://www.logoaspire.com/assets/images/webp/icon.webp'} width={570} height={502} className='transition-opacity duration-[500ms] w-[570px] relative left-0 top-0 z-[998] scale-125'/>
        </div>
       
        <div className="w-full md:w-[50%]  mb-8 md:mb-0 px-[15px]">
          <h2 className=" text-[16px]  md:text-[24px] text-[#34D2FC]  m-0">Endorse Your Business</h2>
          <h1 className="md:text-4xl text-[18px]  text-gray   md:font-extrabold mb-4  ">
          With Influential Client <br /> Experience-Driven Websites.
          </h1>
          <p className="text-darkGray mb-8 text-[13px] md:text-[16px]">The creative team at Logo Aspire knows how crucial a website presence in the digital world is. We believe in providing our customers with premium website solutions, therefore, we work closely with our clients to understand their requirements, deliver timely results, and boost up your business proficiency.</p>
          {/* <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full relative overflow-hidden group">
            <span className="relative z-10">GET STARTED</span>
            <span 
              className="absolute left-0 top-1/2 w-2 h-2 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{ left: `${dotPosition}%` }}
            ></span>
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
          </button> */}
        
          <a href="#"  className="custom-btn">
            <span className="moving-circle"></span>
            Get Started
          </a>

        
        </div>
    </div>
  )
}
