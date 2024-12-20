'use client'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/app/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"

export default function PackageCard() {
  const [isHover, setIsHover] = useState(false)

  return (
    <Card
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`md:w-[366.67px] md:h-[550px] cursor-pointer transition-all hover:border-none duration-100 ease-in-out transform hover:text-[#fff] 
      hover:bg-gradient-to-tr hover:from-[#2baeb7] hover:to-[#0874b2] bg-cover flex bg-no-repeat  justify-around
      bg-center flex-col bg-[url('https://www.logoaspire.com/assets/images/webp/mix/pricing-bg.webp')] 
      border-2 border-secondaryColor shadow-lg rounded-lg`}
    >
      <CardHeader className="pb-2 transition-all duration-300 ease-in-out">
        <h2 className={`${isHover ? 'text-white' : 'text-gray-700'} text-[18px] font-semibold transition-colors duration-300`}>
          E-Commerce Website 
        </h2>
        <span className={`${isHover ? 'text-white' : 'text-gray-500'} text-[18px] mt-0 space-y-0 font-semibold transition-colors duration-300`}>
          Package
        </span>
        <div className="mt-2">
          <p className={`${isHover ? 'text-black' : 'text-darkGray'} text-[18px] transition-colors duration-300`}>
            <span className={`${isHover ? 'text-black decoration-white' : 'text-darkGray'} line-through transition-colors duration-300`}>
              $2999.00
            </span> Only
          </p>
          <h1 className={`text-[42px] font-bold transition-colors duration-300 ${isHover ? 'text-white' : 'text-secondaryColor'}`}>
            $2999.00
          </h1>
        </div>
      </CardHeader>

      <CardContent className="pt-0 mb-[15px]  transition-all duration-300 ease-in-out">
        <p className={`${isHover ? 'text-white' : 'text-gray-600'} text-[12px] font-semibold mb-4 transition-colors duration-300`}>
          Suitable for potential super-startups and brand revamps for companies.
        </p>
        
        {/* Scrollable list */}
        <ul id="style-2" className="scrollbar-custom space-y-2 text-[12px] h-[140px] overflow-y-scroll">
  {[
    "Custom Ecommerce Website",
    "Up to 200 Products",
    "CMS /Admin Panel Integration",
    "Fully Mobile Responsive",
    "Shopping Cart Integration",
    "Payment Gateway Integration",
    "Product Listing & Management",
  ].map((item, index) => (
    <li key={index} className="flex mb-[5px] items-center transition-colors duration-300">
      <CheckCircle2 size={12} className={`${isHover ? 'text-black' : 'text-secondaryColor'} mr-2 transition-colors duration-300`} />
      <span className={`text-[12px] ${isHover ? 'text-white' : 'text-gray-700'} transition-colors duration-300`}>{item}</span>
    </li>
  ))}
</ul>
      </CardContent>

      <CardFooter className="flex flex-col  items-stretch">
        <Button
          className={`w-2/3 h-[56px] mx-auto border-2 font-bold py-[14px] px-[55px] rounded-full transition-all hover:bg-white duration-300 ease-in-out 
          ${isHover ? 'bg-white border-none text-secondaryColor' : 'bg-transparent border-secondaryColor text-gray-700'}`}
        >
          ORDER NOW
        </Button>
        <div className="mt-4 text-[12px] font-semibold text-gray-500 flex justify-between transition-colors duration-300">
          <div>Share your idea?</div>
          <div>Want to discuss?</div>
        </div>
        <div className="text-md text-gray-600 font-extrabold flex justify-between transition-colors duration-300">
          <div>(855) 535-9320</div>
          <div className="text-secondaryColor">Live Chat Now</div>
        </div>
      </CardFooter>
    </Card>
  )
}
