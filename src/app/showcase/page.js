import React from 'react'
import HeroSecondarySection from '../components/HeroSecondarySection'
import { ShowcaseSection } from '../components/ShowcaseSection'

 const page = () => {
  return (
    <div className=''>
        <HeroSecondarySection headingTop={'Serving Clients Worldwide'} headingMiddle={'At Logo Aspire, Everything Is Possible'} para={'We are a team of creative thinkers and problem solvers dedicated to expanding the limits of what is possible by helping brands achieve their goals.'} bannerImage={"bg-[url('https://www.logoaspire.com/assets/images/banner/banner-portfolio.jpg')]"} sideImage={'https://www.logoaspire.com/assets/images/webp/banner/banner-item-portfolio.webp'}/>
   <div className='py-[70px] relative'>
   <ShowcaseSection/>
   <div class="element element-16"><img src="https://www.logoaspire.com/assets/images/webp/elements/element-16.webp"/></div>
    </div>
   </div>
  )
}
export default page
