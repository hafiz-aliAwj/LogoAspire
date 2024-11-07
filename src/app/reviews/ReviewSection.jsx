import React from 'react'
import { HeadingSection } from '../components/ui/Heading'
import { ReviwLongCard } from './ReviwLongCard'

export const ReviewSection = () => {
  return (
    <div>
        <div className=' py-[64px] px-[15px] container w-[1250px] max-w-[1250px] flex-wrap mx-auto'>
        <HeadingSection headingTop={'This Is What Industry’s'} headingMiddle={'Top Clientele Sounds Like'} para={'On one hand, we strive to outperform excellence in our processes and business behaviors for unceasing success, while on the other hand, we place customer satisfaction as the utmost priority. our main aim is to foster a culture that not only focuses on providing innovative solutions to present technology ecosystem but also reinvent the future.'}/>
    

      <div className='flex w-full   flex-wrap'>

       {Array.from({ length: 6 }).map((_, index) => (
           <ReviwLongCard key={index} />
        ))}
        </div>
    </div>
    </div>
  )
}
