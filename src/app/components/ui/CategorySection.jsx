import React, { useState } from "react";

export const CategorySection = ({  showSubCategories,services,setActiveCategory,activeCategory }) => {
    const serviceList=Object.keys(services)
  return (
    <div>
      {" "}
      <div className={` flex flex-wrap justify-center gap-6 mb-12`}>
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
      <div className={`${showSubCategories?'flex':'hidden'} flex-wrap justify-center gap-6 mb-12`}>
        {services[activeCategory]?.map((category,id) => (
        
          <button
            key={id}
            className={`border-animate hover:text-[#b90c12]`}
            
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
};
