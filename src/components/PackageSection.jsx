'use client'
import React, { useState } from 'react'
import PackageCard from './ui/PackageCard'
import { HeadingSection } from './ui/Heading'
import { CategorySection } from './ui/CategorySection'
import { services } from './ServiceSection'

export const PackageSection = () => {
    const [activeCategory, setActiveCategory] = useState(
        Object.keys(services)[0]
      );
  return (

    <div className=' py-[64px] px-[15px] container max-w-[320px] md:max-w-[1170px] sm:max-w-screen-sm mx-auto'>
        <HeadingSection headingTop={'Our Price Model'} headingMiddle={'That Suits Everyone!'} para={'To provide your business with customized and unique website development services at reasonable prices'}/>
       <CategorySection services={services} setActiveCategory={setActiveCategory}/>
      <div className='md:flex-row flex w-full gap-5  flex-col'>

       {Array.from({ length: 3 }).map((_, index) => (
           <PackageCard key={index} />
        ))}
        </div>
    </div>
  )
}
