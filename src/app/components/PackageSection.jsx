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

    <div className=' py-[64px] px-[15px] container max-w-[1170px] mx-auto'>
        <HeadingSection headingTop={'Our Price Model'} headingMiddle={'That Suits Everyone!'} para={'To provide your business with customized and unique website development services at reasonable prices'}/>
       <CategorySection services={services} setActiveCategory={setActiveCategory}/>
      <div className='flex w-full gap-5 '>

       {Array.from({ length: 3 }).map((_, index) => (
           <PackageCard key={index} />
        ))}
        </div>
    </div>
  )
}
