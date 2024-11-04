import React from "react";
import { Card, CardContent, CardFooter,CardHeader } from "../components/ui/card";
import Image from "next/image";
import { StarIcon } from "lucide-react";

export const ReviwLongCard = () => {
  return (
    <div>
      <Card
       
        className={`flex-[0_0_33.33%]  w-[366.67px]  h-[550px] hover:border-secondaryColor hover:shadow-2xl bg-white border-2 border-[#d7d7d7] rounded-lg p-6 mb-8 relative z-10 transition-all duration-400 ease-in-out`}
      >
        <CardHeader className="border-b mb-[10px] pb-[20px] border-darkGray transition-all flex flex-col duration-300 ease-in-out">
          <Image
            width={100}
            height={100}
            src="https://www.logoaspire.com/assets/images/webp/review/by/r-1.webp"
            alt=""
          />
          <h1 className="mt-5 mb-[5px] text-gray text-[24px]">Life Saver</h1>
          <h3 className="text-[16px] text-darkGray">Overall Rating from 49 Users</h3>
        </CardHeader>
        <CardContent className="mb-[20px] pb-[30px] border-b border-darkGray ">
          <p>
            I found Logo Aspire to be easy to use and with just a click. These
            guys helped me to decide on which logo I wanted for my business.
            Logo Aspire has made my business look more professional and
            meaningful!
          </p>
        </CardContent>
        <CardFooter>
            <div className="flex flex-col gap-[5px] items-center">
                <h2 className="text-[24px] text-[#282828]">Samantha Manning</h2>
                <div className="flex items-center gap-[15px]">

                <p>Director of Operations</p> 
               <ul className="inline-block">
               {
                    Array.from({length:5}).map((elem)=>(
                        <li>
                            <StarIcon size={16} color="#f38010"/>
                        </li>
                    ))
                }
               </ul>
                </div>

            </div>
        </CardFooter>
      </Card>
    </div>
  );
};
