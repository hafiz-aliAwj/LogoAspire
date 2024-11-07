"use client"
import { Facebook, Linkedin, Instagram, ArrowRightSquareIcon, ChevronRight } from "lucide-react"
import Link from "next/link"
import { services } from "./ServiceSection"

export default function Footer() {
  return (
    <footer className="bg-black bg-center bg-no-repeat bg-cover bg-[url('https://www.logoaspire.com/assets/images/bg/footer-bg.jpg')] text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Company Description */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">Aspire</h2>
            <p className="text-sm text-gray-400 mb-4">
              Full-stack Web, Mobile Design and Development Company.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:bg-white border border-white rounded-full p-2">
                <Facebook size={20} className="text-secondaryColor"/>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:bg-white border border-white rounded-full p-2">
                <Linkedin size={20} className="text-secondaryColor"/>
                <span className="sr-only">LinkedIn</span>
              </Link>
             
              <Link href="#" className="text-gray-400 border border-white rounded-full p-2 hover:bg-darkGray">
                <Instagram size={20} className="text-secondaryColor" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "showcase", "reviews"].map((item) => (
                <li key={item} className="flex gap-1 items-center ">
                <svg stroke="#0e1863" fill="#0e1863" stroke-width="0"  viewBox="0 0 192 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>

                  <Link href={`/${item}`} className="text-gray-400 hover:text-darkGray text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {Object.keys(services).map((item) => (
                <li key={item} className="flex gap-1 items-center ">
                <svg stroke="#0e1863" fill="#0e1863" stroke-width="0"  viewBox="0 0 192 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>

                  <Link href={`/${item}`} className="text-gray-400 hover:text-darkGray text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">More Services</h3>
            <ul className="space-y-2" >
              {["SMM", "Creative Copywriting", "Mobile Apps", "SEO Services"].map((item) => (
                <li key={item} className="flex gap-1 items-center ">
                <svg stroke="#0e1863" fill="#0e1863" stroke-width="0"  viewBox="0 0 192 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>

                  <Link href={`/${item}`} className="text-gray-400 hover:text-darkGray text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch Now! */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Get in Touch Now!</h3>
            <ul className="space-y-2">
              <li>
                <Link href="tel:(855)535-9320" className="text-gray-400 hover:text-white text-sm">
                  Sales: (855) 535-9320
                </Link>
              </li>
              <li>
                <Link href="tel:(855)535-9320" className="text-gray-400 hover:text-white text-sm">
                  Support: (855) 535-9320
                </Link>
              </li>
              <li>
                <Link href="mailto:info@logoaspire.com" className="text-gray-400 hover:text-white text-sm">
                  info@logoaspire.com
                </Link>
              </li>
              <li className="text-gray-400 text-sm">
                5670 Wilshire Blvd, Los Angeles, CA 90036, United States
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}