import React from 'react'

export const HeadingSection = ({headingTop,headingMiddle,para,className1,className2,classNameSpan}) => {
  return (
    <div className='mb-10   w-full'>
    <h2 className={`  text-2xl font-semibold  text-center text-secondaryColor mb-2 ${className1}`}>{headingTop.slice(0,4) } <span className={`${classNameSpan}`}>{headingTop.slice(4)}</span></h2>
   <h1 className={`text-[36px] text-gray text-center mb-2 ${className2}` }>{headingMiddle}</h1>
   <p className="text-center text-[#666666] ] text-[16px] mx-auto">
     {para}
   </p>
</div>
  )
}
