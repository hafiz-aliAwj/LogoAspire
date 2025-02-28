import React from 'react'
import { HeadingSection } from './ui/Heading'
import {
  Car,
  Book,
  Bike,
  Church,
  Building2,
  Users,
  Wallet,
  Umbrella,
  Wifi,
  GraduationCap,
  Plane,
  Heart,
  Music2,
  Navigation,
  Newspaper,
  PenTool,
  Trees,
  Headphones,
  Baby,
  MessageCircle,
  Construction,
  Activity,
  Phone,
  Pencil,
  Library,
  Utensils,
  Palette,
  Droplets,
} from "lucide-react"

const categories = [
  { icon: <Construction className="w-full h-full text-secondaryColor"  />, name: "Engineering" },
  { icon: <Church className="w-full h-full text-secondaryColor" />, name: "Religion" },
  { icon: <Wallet className="w-full h-full text-secondaryColor" />, name: "Financial" },
  { icon: <Activity className="w-full h-full text-secondaryColor" />, name: "Medical" },
  { icon: <MessageCircle className="w-full h-full text-secondaryColor" />, name: "Communication" },
  { icon: <Baby className="w-full h-full text-secondaryColor" />, name: "Children" },
  { icon: <Building2 className="w-full h-full text-secondaryColor" />, name: "Construction" },
  { icon: <Users className="w-full h-full text-secondaryColor" />, name: "Social" },
  { icon: <Umbrella className="w-full h-full text-secondaryColor" />, name: "Insurance" },
  { icon: <Heart className="w-full h-full text-secondaryColor" />, name: "Health" },
  { icon: <Headphones className="w-full h-full text-secondaryColor" />, name: "Entertainment" },
  { icon: <Pencil className="w-full h-full text-secondaryColor" />, name: "Craft" },
  { icon: <Wifi className="w-full h-full text-secondaryColor" />, name: "Technology" },
  { icon: <GraduationCap className="w-full h-full text-secondaryColor" />, name: "Education" },
  { icon: <Users className="w-full h-full text-secondaryColor" />, name: "Consultation" },
  { icon: <Plane className="w-full h-full text-secondaryColor" />, name: "Travel" },
  { icon: <Trees className="w-full h-full text-secondaryColor" />, name: "Environmental" },
  { icon: <Music2 className="w-full h-full text-secondaryColor" />, name: "Music" },
  { icon: <Car className="w-full h-full text-secondaryColor" />, name: "Automotive" },
  { icon: <Book className="w-full h-full text-secondaryColor" />, name: "Resource" },
  { icon: <PenTool className="w-full h-full text-secondaryColor" />, name: "Architectural" },
  { icon: <Heart className="w-full h-full text-secondaryColor" />, name: "Matrimony" },
  { icon: <Baby className="w-full h-full text-secondaryColor" />, name: "Fashion" },
  { icon: <Navigation className="w-full h-full text-secondaryColor" />, name: "Navigation" },
  { icon: <Library className="w-full h-full text-secondaryColor" />, name: "Catalogues" },
  { icon: <Bike className="w-full h-full text-secondaryColor" />, name: "Sports" },
  { icon: <Utensils className="w-full h-full text-secondaryColor" />, name: "Food" },
  { icon: <Palette className="w-full h-full text-secondaryColor" />, name: "Art" },
  { icon: <Droplets className="w-full h-full text-secondaryColor" />, name: "Spa" },
  { icon: <Newspaper className="w-full h-full text-secondaryColor" />, name: "News" },
]

export const ProjectCounterSection = () => {
  return (
    <div className={`py-[60px] bg-[url('https://www.logoaspire.com/assets/images/bg/no-of-projects-bg.jpg')]`}>
    
   <div className='container mx-auto px-[15px]'>
        <HeadingSection headingTop={'Logos, Web Designs & Development Solutions for'} headingMiddle={'Fortune 500 Companies From 40+ Industries'} para={'We take pride in delivering crystal clear and spotless work to our clients. Ensuring every step is according to your needs, Logo Aspire delivers what it promises. Keeping you in mind, we offer all types of website and logo designs, video animations, and mobile applications.'} />
   <div className="flex flex-wrap justify-center items-center gap-4 ">

  
  <div  className="  flex items-center flex-col flex-[0_0_16.67%] industry-number px-[15px] pt-[30px]">
  <h2 className='text-secondaryColor text-[35px] font-semibold'>400+</h2>
  <h3 className='text-darkGray text-[16px]'>Projects Ordered</h3>
  </div>
   <div  className="  flex items-center flex-col flex-[0_0_16.67%] industry-number px-[15px] pt-[30px]">
   <h2 className='text-secondaryColor text-[35px] font-semibold'>400+</h2>
   <h3 className='text-darkGray text-[16px]'>Projects Ordered</h3>
   </div>
   <div  className="  flex items-center flex-col flex-[0_0_16.67%] industry-number px-[15px] pt-[30px]">
        <h2 className='text-secondaryColor text-[35px] font-semibold'>400+</h2>
        <h3 className='text-darkGray text-[16px]'>Projects Ordered</h3>
        </div>
        <div  className="  flex items-center flex-col flex-[0_0_16.67%] industry-number px-[15px] pt-[30px]">
        <h2 className='text-secondaryColor text-[35px] font-semibold'>400+</h2>
        <h3 className='text-darkGray text-[16px]'>Projects Ordered</h3>
        </div>
 
  
        
       

    
    </div>
    <div className="flex flex-wrap  justify-center gap-8 pt-[100px]">
          {categories.map((category, index) => (
           <div className='md:w-1/5 text-darkGray w-full justify-center items-center flex-wrap flex gap-4 '>
              <div className="  w-8 h-11  fill-secondaryColor   ">
                {category.icon}
              </div>
              {/* <span className="text-sm font-medium text-gray-600 group-hover:text-primary"> */}
                {category.name}
           
            
           </div>
          ))}
        </div>
   </div>
    </div>
  )
}
