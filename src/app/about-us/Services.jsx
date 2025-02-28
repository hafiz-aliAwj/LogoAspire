"use client"
import { useState } from 'react'


import { HeadingSection } from '@/components/ui/Heading'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight,ArrowRight } from 'lucide-react'
import { services } from '@/components/ServiceSection'

export default function ServiceCard({ name, imageUrl }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    function splitStringWithBr(str) {
        const parts = str.split(' '); // Split the string at the space
        return <p>{parts[0]}<br/>{parts[1]}</p>; // Combine with <br>
    }
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex + 5 >= Object.keys(services).length ? 0 : prevIndex + 5
        )
      }
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex - 5 < 0 ? Math.max(Object.keys(services).length - 5, 0) : prevIndex - 5
        )
      }  
  


  return (
    <div className='py-[80px] container mx-auto'> 
        <HeadingSection headingTop={'Logo Aspire Services'} headingMiddle={'A wide variety of premium services we offer'} para={'We are one of the leading digital design firms concerned with meeting the needs of their clients. Our work is impeccable and incomparable. We enhance your business efficiency and results through our innovative and fantastic work ethic'}/>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
            >
              {Object.keys(services).slice(currentIndex, currentIndex +4).map((serviceName, index) => (
                <TeacherCard
                  key={index}
                  name={splitStringWithBr(services[serviceName][0].title)}
                 
                  imageUrl={imageUrl}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={prevSlide}
            aria-label="Previous teachers"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
            onClick={nextSlide}
            aria-label="Next teachers"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
    
    </div>
  )
}
 function TeacherCard({ name, imageUrl }) {
    const [isHovered, setIsHovered] = useState(false)
  
    return (
      <motion.div
        className="relative w-64 h-80 rounded-lg overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          
              <h3 className="text-xl mb-5  font-bold text-white">{name}</h3>
              {/* <p className="text-sm text-[#86C43A]">{designation}</p> */}
          
            {/* <ArrowRight className="w-5 h-5" /> */}
         
        </motion.div>
      </motion.div>
    )
  }