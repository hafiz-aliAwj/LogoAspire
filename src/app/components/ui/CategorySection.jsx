import React, { useState } from "react";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
export const CategorySection = ({  showSubCategories,services,setActiveCategory,activeCategory,showToggleButton }) => {
  const [isIndustryWise, setIsIndustryWise] = useState(false); 

  const serviceList=Object.keys(services)
  return (
    <div>
      {" "}
      <div className={` flex flex-wrap justify-around gap-6 mb-12`}>
        {serviceList?.map((category) => (
          <button
            key={category}
            className={`border-animate hover:text-secondaryColor 
              ${activeCategory===category?'text-secondaryColor':'text-black'}
                 ${activeCategory === category ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-secondaryColor after:animate-[borderSlide_0.5s_forwards]' : ''}
              `}
            onClick={() => {setActiveCategory(category);
    console.log(activeCategory)

            }}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={` ${showToggleButton?'block':'hidden'} w-full max-w-5xl mx-auto space-y-6`}>
        <div className="flex bg-gradient-to-r mb-[30px] max-w-sm md:h-[56px] mx-auto from-[#2db2b8] to-[#1064ab] items-center justify-center space-x-2 rounded-[40px]  p-[15px] shadow-[0_5px_20px_10px_#dadadafc] ">
          <Label
            htmlFor="industry-toggle"
            className={`cursor-pointer py-[5px] px-[15px]  text-[16px] font-bold transition-colors text-white `}
          >
            Category Wise
          </Label>
          <Switch
            id="industry-toggle"
            checked={isIndustryWise}
            onCheckedChange={setIsIndustryWise}
            className="h-[10px] w-[44px] data-[state=checked]:bg-secondaryColor data-[state=unchecked]:bg-background"
          />
          <Label
            htmlFor="industry-toggle"
            className={`cursor-pointer py-[5px] px-[15px]  text-[16px] font-bold transition-colors text-white `}
          >
            Industry Wise
          </Label>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {currentServices.map((service, index) => (
          <Button key={index} variant="outline" className="w-full">
            {service}
          </Button>
        ))}
      </div> */}
        {/* <CategorySection services={services} showSubCategories={true} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/> */}
      </div>
      <div className={`${showSubCategories?'flex':'hidden'} flex-wrap justify-around gap-6 mb-12`}>
        {services[activeCategory]?.map((category,id) => (
        
          <button
            key={id}
            className={`border-animate hover:text-secondaryColor`}
            
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};
