
import React from 'react'
import HeroSecondarySection from '@/components/HeroSecondarySection'
import ServiceCard from './Services'
import { ProjectCounterSection } from '@/components/ProjectCounterSection'
import { ContactusSection } from '@/components/ContactusSection'




const page = () => {
  return (
    <div>       
       <HeroSecondarySection bannerImage={"bg-[url('https://www.logoaspire.com/assets/images/banner/banner-aboutus.jpg')]"}  para={'We believe that within each impossible, it is possible to try to get out. We are a team of creative thinkers and problem solvers dedicated to pushing the limits of what is possible by helping brands achieve their goals.'} headingMiddle={<>Digital marketing and Design agency</>} sideImage={'https://www.logoaspire.com/assets/images/webp/banner/banner-item-aboutus.webp'}/>
<ServiceCard name={<>Content <br/> Mangement</>} imageUrl={'https://www.logoaspire.com/assets/images/webp/mix/ms/6.webp'} />
<ProjectCounterSection/>
<ContactusSection/>

  </div>
  )
}

export default page
