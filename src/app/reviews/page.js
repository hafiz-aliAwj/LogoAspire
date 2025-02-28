import React from 'react'
import { ReviewSection } from './ReviewSection'
import HeroSecondarySection from '@/components/HeroSecondarySection'

const page = () => {
  return (
    <div>
      <HeroSecondarySection sideImage={null} headingMiddle={'We listen to our client’s feedback & improvise.'} bannerImage={"bg-[url('https://www.logoaspire.com/assets/images/banner/banner-reviews.jpg')]"} para={'We are a team of creative thinkers and problem solvers dedicated to pushing the limits of what is possible by helping brands achieve their goals.'} headingTop={'Clients Love Us'}/>
        <ReviewSection/>
    </div>
  )
}

export default page