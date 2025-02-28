import React from 'react'
import HeroSecondarySection from '@/components/HeroSecondarySection'
import { ServiceTypes } from './ServiceTypes'
import { ServiceShowcaseSecton } from './ServiceShowcaseSecton'
import { PackageSection } from '@/components/PackageSection'

const page = async({params}) => {
    const service=await params.service
    const [firstWord,secondWord]=service.split('-')
    function capitalizeFirstLetter(val) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
    const servicenName=capitalizeFirstLetter(firstWord)+ " " +capitalizeFirstLetter(secondWord)
  return (
    <div>
        <HeroSecondarySection istranparentbtn={true} children={<a href="#" id='non-transparent' className="custom-btn  border-2 border-white ">Avail Flat 70% Off</a>} className={'herosec'} sideImage={'https://www.logoaspire.com/assets/images/webp/banner/banner-item-wd.webp'} bannerImage={"bg-[url('https://www.logoaspire.com/assets/images/banner/banner-wd.jpg')]"} headingTop={'Customized'} headingMiddle={<>{firstWord} <span className='text-yellow-300'>{secondWord}</span></>} para={'Scalable, efficient, and customized web development solutions are just one tap away! Logo Aspire is one of the leading web development companies in San Jose. We offer customized web development solutions that are interactive, high-tech, and adaptive. Hire our team of experts today!'}/>
    <ServiceTypes service={servicenName}/>
    <ServiceShowcaseSecton service={servicenName}/>
    <PackageSection />    
    </div>
  )
}

export default page