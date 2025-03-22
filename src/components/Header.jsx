"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, Phone, X } from "lucide-react";

import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,

} from "./ui/navigation-menu";


import {  ContactUsPopup } from "./ContactUsCard";



export default function Navbar({services}) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const toggleServices = () => setIsServicesOpen(!isServicesOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setHasScrolled(scrollTop > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<<<<<<< HEAD
    <>
     
    <nav className={`fixed  border-b z-[999] border-[#ddd7db] top-0 left-0 right-0 bg-white  transition-shadow duration-300 ${hasScrolled ? 'shadow-[0px_2px_20px_1px_#e0e0e0]' : ''}    w-screen`}>
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
=======
    <Dialog>
      <ContactUsModal/>
    <nav className={`fixed  border-b z-[999] border-[#ddd7db] top-0 left-0 right-0 bg-white  transition-shadow duration-300 ${hasScrolled ? 'shadow-[0px_2px_20px_1px_#e0e0e0]' : ''}   lg:w-[1356px] w-screen`}>
      <div className="mx-auto py-2 max-w-full px-4 sm:px-6 lg:px-8">
>>>>>>> 58f8cd9e8f0a1da12eb988592bf11d5df52c270a
        <div className="flex justify-between h-20">
          <div className="flex items-center w-[20%]">
            <Link href="/" className="flex-shrink-0">
              <Image src="/images/logo.gif" alt="Logo" width={180} height={32} />
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-8 w-[40%]">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about-us">About</NavLink>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {Object.keys(services).map((service) => (
                      <Link href={`/${service.replace(" ", "-")}`} key={service}>
                        <ListItem title={service} />
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <NavLink href="/showcase">Showcase</NavLink>
            <NavLink href="/reviews">Review</NavLink>
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <a href="tel:628313-4168" className="flex gap-2 items-center text-gray-600">
              <Image src="/flag.png" width={32} height={32} alt="Phone Flag" />
              <span>(628) 313-4168</span>
            </a>
            
             {/* <DialogTrigger className="hidden lg:flex" asChild >
                <button className="bg-gradient-to-r py-2 px-4  from-[#2db2b8] to-[#1064ab] text-white rounded-full transition-all duration-300 ease-in-out hover:from-[#1064ab] hover:to-[#2db2b8] hover:shadow-lg">
                  Get In Touch
                </button>
           </DialogTrigger> */}
             <ContactUsPopup/>
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden p-5 pb-0 max-w-full w-full overflow-hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/about">About</MobileNavLink>
            <div className="relative">
              <button
                onClick={toggleServices}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4 inline" />
              </button>
              {isServicesOpen && (
                <div className="  text-center rounded-sm m-auto px-4 py-2">
                  {Object.keys(services).map((service) => (
                    <MobileDropdownItem key={service} href={`/${service.replace(" ", "-")}`}>
                      {service}
                    </MobileDropdownItem>
                  ))}
                </div>
              )}
            </div>
            <MobileNavLink href="/showcase">Showcase</MobileNavLink>
            <MobileNavLink href="/reviews">Reviews</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 flex justify-center items-center flex-col gap-2">
            <div className="flex w-full flex-col gap-y-4 items-center ">
       
              <a href="tel:628313-4168" className="flex gap-2 items-center text-gray-600">
              <Image src="/flag.png" width={32} height={32} alt="Phone Flag" />
              <span>(628) 313-4168</span>
            </a>
            <button onClick={()=>document.getElementById('contact')?.scrollIntoView({ behavior: "smooth"})} className="bg-gradient-to-r w-full  py-2 px-4  justify-center  from-[#2db2b8] to-[#1064ab] text-white rounded-full transition-all duration-300 ease-in-out hover:from-[#1064ab] hover:to-[#2db2b8] hover:shadow-lg">
                  Get In Touch
                </button>
            </div>
          
            {/* <DialogTrigger asChild >
                <button className="bg-gradient-to-r  py-2 px-4 w-11/12 justify-center  from-[#2db2b8] to-[#1064ab] text-white rounded-full transition-all duration-300 ease-in-out hover:from-[#1064ab] hover:to-[#2db2b8] hover:shadow-lg">
                  Get In Touch
                </button>
           </DialogTrigger> */}
          </div>
        </div>
      )}
    </nav>
    </>
    
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="px-1 pt-1 text-lg font-medium text-gray-500 hover:text-gray-700">
      {children}
    </Link>
  );
}

function ListItem({ title }) {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a className="block p-3 text-sm font-medium leading-none hover:bg-accent hover:text-accent-foreground">
          {title}
        </a>
      </NavigationMenuLink>
    </li>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
      {children}
    </Link>
  );
}

function MobileDropdownItem({ href, children }) {
  return (
    <Link href={href} className="block py-2 text-sm border-b border-darkGray mb-2">
      {children}
    </Link>
  );
}
