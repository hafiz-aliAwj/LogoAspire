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
  { icon: <Construction className="w-6 h-6"  />, name: "Engineering" },
  { icon: <Church className="w-6 h-6 " />, name: "Religion" },
  { icon: <Wallet className="w-6 h-6 fill-red-50" />, name: "Financial" },
  { icon: <Activity className="w-6 h-6" />, name: "Medical" },
  { icon: <MessageCircle className="w-6 h-6" />, name: "Communication" },
  { icon: <Baby className="w-6 h-6" />, name: "Children" },
  { icon: <Building2 className="w-6 h-6" />, name: "Construction" },
  { icon: <Users className="w-6 h-6" />, name: "Social" },
  { icon: <Umbrella className="w-6 h-6" />, name: "Insurance" },
  { icon: <Heart className="w-6 h-6" />, name: "Health" },
  { icon: <Headphones className="w-6 h-6" />, name: "Entertainment" },
  { icon: <Pencil className="w-6 h-6" />, name: "Craft" },
  { icon: <Wifi className="w-6 h-6" />, name: "Technology" },
  { icon: <GraduationCap className="w-6 h-6" />, name: "Education" },
  { icon: <Users className="w-6 h-6" />, name: "Consultation" },
  { icon: <Plane className="w-6 h-6" />, name: "Travel" },
  { icon: <Trees className="w-6 h-6" />, name: "Environmental" },
  { icon: <Music2 className="w-6 h-6" />, name: "Music" },
  { icon: <Car className="w-6 h-6" />, name: "Automotive" },
  { icon: <Book className="w-6 h-6" />, name: "Resource" },
  { icon: <PenTool className="w-6 h-6" />, name: "Architectural" },
  { icon: <Heart className="w-6 h-6" />, name: "Matrimony" },
  { icon: <Baby className="w-6 h-6" />, name: "Fashion" },
  { icon: <Navigation className="w-6 h-6" />, name: "Navigation" },
  { icon: <Library className="w-6 h-6" />, name: "Catalogues" },
  { icon: <Bike className="w-6 h-6" />, name: "Sports" },
  { icon: <Utensils className="w-6 h-6" />, name: "Food" },
  { icon: <Palette className="w-6 h-6" />, name: "Art" },
  { icon: <Droplets className="w-6 h-6" />, name: "Spa" },
  { icon: <Newspaper className="w-6 h-6" />, name: "News" },
]

export const ProjectCounterSection = () => {
  return (
    <div className={`py-[60px] bg-[url('https://www.logoaspire.com/assets/images/bg/no-of-projects-bg.jpg')]`}>
    
   <div className='container mx-auto px-[15px]'>
        <HeadingSection headingTop={'Logos, Web Designs & Development Solutions for'} headingMiddle={'Fortune 500 Companies From 40+ Industries'} para={'We take pride in delivering crystal clear and spotless work to our clients. Ensuring every step is according to your needs, Logo Aspire delivers what it promises. Keeping you in mind, we offer all types of website and logo designs, video animations, and mobile applications.'} />
   <div className="flex  justify-center items-center gap-4 ">
{
  Array(4).fill(0).map((_, index) => {
    return (
      <div key={index} className="  flex items-center flex-col flex-[0_0_16.67%] industry-number px-[15px] pt-[30px]">
        <h2 className='text-secondaryColor text-[35px] font-semibold'>400+</h2>
        <h3 className='text-darkGray text-[16px]'>Projects Ordered</h3>
        </div>
  )})
  
        
       
}
    
    </div>
    <div className="flex flex-wrap  justify-center gap-6 pt-[100px]">
          {categories.map((category, index) => (
           <div className='w-1/6 items-center flex gap-4 '>
              <div className="mb-2 p-2  fill-secondaryColor   ">
                {category.icon}
              </div>
              <span className="text-sm font-medium text-gray-600 group-hover:text-primary">
                {category.name}
              </span>
            
           </div>
          ))}
        </div>
   </div>
    </div>
  )
}
