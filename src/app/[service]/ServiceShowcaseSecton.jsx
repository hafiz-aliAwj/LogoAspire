'use client'
import React, { useState } from 'react'
import { HeadingSection } from '../components/ui/Heading'
import { services } from '../components/ServiceSection'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import Image from 'next/image'
import { Button } from '../components/ui/button'
export const ServiceShowcaseSecton = ({service}) => {
    const serviceList = Object.keys(services);
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
    <div>
        <HeadingSection headingTop={'Our Recent Projects'} headingMiddle={'Browse Our Portfolio To See Creative Grind.'} para={'We create a logo with an out of the box design sense combined with words that grab the interest of your target audience.'}/>
        <div className="flex m-auto items-center md:max-w-[1300px] justify-around flex-wrap">
        {services[service]?.map((service, index) => (
          <div
            onClick={() => openModal(index)}
            className="relative md:flex-[0_0_23.5%] md:mr-[15px] mb-[20px] overflow-hidden"
          >
            <img
              src={`https://www.logoaspire.com/assets/images/webp/portfolio/website/thumb-${index+1}.webp`}
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
  )
}
