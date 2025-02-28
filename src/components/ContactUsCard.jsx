"use client";

import { CircleUserRound,  X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
 
} from "@/components/ui/dialog"
import Image from "next/image";
import { useRef, useState } from "react";
 function ContactUsCard() {
  return (
    <div className=" h-[530px] outline-none  w-[970px]  bg-gradient-to-r from-[#0E1863] to-[#2b3fd8] text-white p-10 rounded-lg">
          {/* Close Button */}
          
          <div className="flex flex-col md:gap-0 gap-6">
          <div className="mb-8">
              <h5 className="font-extralight text-xl"><strong>Wait! </strong>Looking for an <strong>Amazing Offer?</strong></h5>
              <h4 className="font-light text-[42px]">Get Your <strong>Design Now</strong></h4>
              </div>
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Form */}
            <div className="md:w-[45%] space-y-4">
             
<div className="flex flex-row-reverse relative">

              <form className="space-y-3 mr-4 " onSubmit={(e) => e.preventDefault()}>
                <div className=" ">
                  <div className="relative mb-4 ">
                  <CircleUserRound class="absolute top-0 bottom-0 m-auto flex items-center left-[18px]  text-gray"></CircleUserRound>

                  <Input 
                    type="text" 
                    placeholder="Enter Your Name"
                    className="w-full bg-white text-gray border border-[#959595] h-[56px] rounded-[35px] px-[15px] pl-[50px] text-[14px]"
                    />
                    </div>
                    <div className="relative mb-4 ">
                  <CircleUserRound class="absolute top-0 bottom-0 m-auto flex items-center left-[18px]  text-gray"></CircleUserRound>

                  <Input 
                    type="text" 
                    placeholder="Enter Your Name"
                    className="w-full bg-white text-gray border border-[#959595] h-[56px] rounded-[35px] px-[15px] pl-[50px] text-[14px]"
                    />
                    </div>
                    <div className="relative mb-4 ">
                  <CircleUserRound class="absolute top-0 bottom-0 m-auto flex items-center left-[18px]  text-gray"></CircleUserRound>

                  <Input 
                    type="text" 
                    placeholder="Enter Your Name"
                    className="w-full bg-white text-gray border border-[#959595] h-[56px] rounded-[35px] px-[15px] pl-[50px] text-[14px] focus-within:outline-none"
                    />
                    </div>
                </div>

                <button
                  type="submit"
                  className="custom-btn w-full !px-[30px] !py-[11px] !border border-white !text-[18px] !font-bold"
                >
                  GET IN TOUCH
                </button>

                <p className="text-xs">
                  By clicking "Submit," you confirm that you agree to Logo Aspire{' '}
                  <a href="#" className="underline">Privacy Policy</a>.
                </p>

              </form>
            <div class="w-[1px] h-full  bg-darkGray absolute "></div>
</div>

            </div>

            {/* Right Column - Contact Details */}
            <div className="flex-1 space-y-4 flex flex-col justify-between">

              <div className="space-y-3 ml-5 " >
                <div className="space-y-1 w-3/5 mb-[15px] pb-[15px] border-b border-white">
                  <h6 className="text-2xl font-bold">Email</h6>
                  <h4 className="text-base">info@logoaspire.com</h4>
                </div>
       

                <div className="space-y-1">
                <h6 className="text-2xl font-bold">Phone</h6>
                  <h4 className="text-base">(855) 535-9320</h4>
                </div>
              </div>

           
            </div>
          </div>
          </div>

        </div>

  );
}
export const ContactUsModal = () => {
  return (
 
  
<DialogContent
    className="md:w-[970px] bg-transparent overflow-visible m-auto max-w-[1200px] md:h-[530px] p-0"
>
    <ContactUsCard />
    <Image
        src={'/popup-img.png'}
        className="absolute bottom-0 -right-[20%] "
        width={447}
        height={449}
    />
</DialogContent>

  )
}



export const ContactUsPopup = () => {
  const [open, setOpen] = useState(false);

//   const onOpenModal = () => setOpen(true);
//   const onCloseModal = () => setOpen(false);

  return (
    <>
    {/* Button to Open Modal */}
    <button       onClick={() => setOpen(true)}
 className="bg-gradient-to-r  py-2 px-4  justify-center  from-[#2db2b8] to-[#1064ab] text-white rounded-full transition-all duration-300 ease-in-out hover:from-[#1064ab] hover:to-[#2db2b8] hover:shadow-lg">
                  Get In Touch
                </button>

    {/* Modal */}
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: "custom-overlay", // Custom overlay styles
          modal: "custom-modal",     // Custom modal styles
        }}
     closeIcon={<button className="rounded-full  border-2 border-white w-10 h-10 flex justify-center items-center"><X strokeWidth={4} className="w-4 h-4" /></button> }
        
      >
        {/* Modal Content */}
        <div className="flex flex-col md:gap-0 gap-6">
          <div className="mb-8">
            <h5 className="font-extralight text-xl">
              <strong>Wait! </strong>Looking for an <strong>Amazing Offer?</strong>
            </h5>
            <h4 className="font-light text-[42px]">
              Get Your <strong>Design Now</strong>
            </h4>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Form */}
            <div className="md:w-[45%] flex flex-row-reverse ">
              <form
                className="space-y-3 mr-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative mb-4">
                      <CircleUserRound className="absolute top-0 bottom-0 m-auto flex items-center left-[18px] text-gray" />
                      <Input
                        type="text"
                        placeholder="Enter Your Name"
                        className="w-full bg-white text-gray border border-[#959595] h-[56px] rounded-[35px] px-[15px] pl-[50px] text-[14px]"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="custom-btn w-full !px-[30px] !py-[11px] !border border-white !text-[18px] !font-bold"
                >
                  GET IN TOUCH
                </button>
                <p className="text-xs">
                  By clicking "Submit," you confirm that you agree to Logo
                  Aspire{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
              <div className="w-[1px] h-3/5 bg-darkGray absolute"></div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4 flex flex-col justify-between">
              <div className="space-y-3 ml-5">
                <div className="space-y-1 w-3/5 mb-[15px] pb-[15px] border-b border-white">
                  <h6 className="text-2xl font-bold">Email</h6>
                  <h4 className="text-base">info@logoaspire.com</h4>
                </div>
                <div className="space-y-1">
                  <h6 className="text-2xl font-bold">Phone</h6>
                  <h4 className="text-base">(855) 535-9320</h4>
                </div>
              </div>
            </div>
            <Image
        src={'/popup-img.png'}
        className="absolute bottom-0 -right-[20%] "
        width={447}
        height={449}
    />
          </div>
        </div>
      </Modal>
  </>
  );
};
