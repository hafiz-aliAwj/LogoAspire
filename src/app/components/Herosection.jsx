'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

export default function HeroSection() {
  const [dotPosition, setDotPosition] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setDotPosition((prevPosition) => {
        const newPosition = prevPosition + direction * 2
        if (newPosition >= 100 || newPosition <= 0) {
          setDirection((prevDirection) => -prevDirection)
        }
        return newPosition
      })
    }, 50)

    return () => clearInterval(animationInterval)
  }, [direction])

  return (
    <section className=" pt-[80px] bg-[url('https://www.vectorlabz.com/assets/images/banner/banner-home.jpg')] bg-center bg-cover h-screen flex items-center">
      <div className="container mx-auto px-4 pt-16 flex flex-wrap items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 px-[15px]">
          <h2 className="  font-semibold text-2xl text-[#333333] m-0">PROFICIENT DESIGN AGENCY.</h2>
          <h1 className="md:text-[50px] md:leading-[65px] bg-gradient-to-r from-[#34D2FC]    to-[#1064ab]   md:font-extrabold mb-4 bg-clip-text text-transparent ">
            Surpassing with <br/> the Modernization <br/> & Originality.
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Helping brands to digitally transform with a spice of innovation and technical expertise.
          </p>
          {/* <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold py-3 px-8 rounded-full relative overflow-hidden group">
            <span className="relative z-10">GET STARTED</span>
            <span 
              className="absolute left-0 top-1/2 w-2 h-2 bg-white rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out"
              style={{ left: `${dotPosition}%` }}
            ></span>
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-teal-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
          </button> */}
  <a href="#" 
   className="custom-btn">
    
   
    <span className="moving-circle"></span>
    Get Started
</a>


        </div>
        <div className="w-full md:w-1/2 relative">
          <Image
            src="https://www.vectorlabz.com/assets/images/webp/elements/banner-element-1.webp"
            alt="Design Showcase"
            width={670}
            height={500}
            className=""
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
  )
}