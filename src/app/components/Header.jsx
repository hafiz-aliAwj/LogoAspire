"use client"

import React,{ useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, Phone, X } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
const services = [
  "Website Development",
  "Logo Design",
  "Ecommerce Solutions",
  "Animation",
  "Illustration",
  "Marketing Collateral",
  "Mobile Apps",
  "SEO Services",
  "SMM",
  "Creative Copywriting"
]

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const toggleServices = () => setIsServicesOpen(!isServicesOpen)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      if (scrollTop > 0) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <nav className={`fixed border-b border-[#ddd7db] top-0 left-0 right-0 bg-white z-50 transition-shadow duration-300 ${hasScrolled ? 'shadow-[0px_2px_20px_1px_#e0e0e0]' : ''}`}>
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center w-[30%]">
            <Link href="/" className="flex-shrink-0">
              <Image src="data:image/webp;base64,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" alt="Logo" width={32} height={32} />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8 w-[40%]">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about-us">About</NavLink>
            
             
              <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
          {services.map((service,idx) => (
                      <ListItem title={service} key={service}/>
                    
                    ))}
          </NavigationMenuContent>
          </NavigationMenuItem>
          </NavigationMenuList>
          </NavigationMenu>
           
            <NavLink href="/showcase">Showcase</NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-6 ">
            <a  href="tel:(628)313-4168" className="flex gap-2 items-center text-gray-600">
             <Image src={'/flag.png'} width={32} height={32}/>
              <span>(628) 313-4168</span>
            </a>
            <Button  
  className="bg-gradient-to-r from-[#2db2b8] to-[#1064ab] text-white rounded-full transition-all duration-300 ease-in-out hover:from-[#1064ab] hover:to-[#2db2b8]  hover:shadow-lg">
  Get In Touch
</Button>



          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/about">About</MobileNavLink>
            <div className="relative">
              <button
                onClick={toggleServices}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4 inline" />
              </button>
              {isServicesOpen && (
                <div className="bg-gray-100 px-4 py-2">
                  {services.map((service) => (
                    <MobileDropdownItem key={service} href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}>
                      {service}
                    </MobileDropdownItem>
                  ))}
                </div>
              )}
            </div>
            <MobileNavLink href="/packages">Packages</MobileNavLink>
            <MobileNavLink href="/combo-packages">Combo Packages</MobileNavLink>
            <MobileNavLink href="/showcase">Showcase</MobileNavLink>
            <MobileNavLink href="/reviews">Reviews</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-3 text-base font-medium text-gray-800">(628) 313-4168</div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Get In Touch</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700"
    >
      {children}
    </Link>
  )
}

function DropdownItem({ href, children,className }) {
  return (
    <Link
      href={href}
      className={`block  ${className}   py-2 text-sm text-black hover:bg-gray-800 `}
      role="menuitem"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
    >
      {children}
    </Link>
  )
}

function MobileDropdownItem({ href, children }) {
  return (
    <Link
      href={href}
      className="block py-2 text-sm text-gray-700 hover:text-gray-900"
      role="menuitem"
    >
      {children}
    </Link>
  )
}
const ListItem = (({ className, title, ...props }) => {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a
         
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          
        </a>
      </NavigationMenuLink>
    </li>
  )
})