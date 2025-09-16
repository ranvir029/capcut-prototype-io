import React, { useState } from "react";
import { RiVideoOnAiLine } from "react-icons/ri";
import { IoMdSearch, IoMdTrendingUp } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className=" top-0 sticky w-full bg-gradient-to-t from-sky-500 to-indigo-500 shadow-md border-b-1 border-blue-500 shadow-zinc-200 z-50">
      <div className="mx-auto  sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-25 px-8">
          {/* Logo */}
          <div className="flex items-center">
            <RiVideoOnAiLine
              size={50}
              color="#6cfc56"
              className="transform transition-transform duration-200 ease-in-out hover:-translate-y-1"
            />
            <div className="ml-2">
              <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
                CapnCut.io
              </h1>
              <h4 className="text-[darkblue] text-xs sm:text-sm md:text-base -mt-1">
                Where creators learn✨
              </h4>
            </div>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex items-center w-[32vw] ml-5">
            <div className="relative w-full bg-white rounded-xl">
              <IoMdSearch
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="search"
                placeholder="Search your favourite effects"
                className="w-full h-10 pl-10 pr-3 rounded-xl text-[14.2px] font-normal outline-none text-sm placeholder:text-zinc-400"
              />
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-6 items-center">
            <div className="inline-flex items-center cursor-pointer text-white hover:text-[darkblue] transition-colors">
              <MdOutlineHome className="text-inherit" size={20} />
              <h1 className="font-bold text-sm sm:text-base ml-1">Home</h1>
            </div>
            <div className="inline-flex items-center cursor-pointer text-white hover:text-[#5efb46] transition-colors">
              <IoMdTrendingUp className="text-inherit" size={20} />
              <h1 className="font-bold text-sm sm:text-base ml-1">Trending</h1>
            </div>
            <div className="flex items-center bg-[#5efb46] px-3 py-2 rounded-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
              <button className="font-medium text-[#2927d1] text-sm sm:text-base">
                + Ask a Question
              </button>
            </div>
            <button className="text-white hover:text-[#5efb46] cursor-pointer">
              <CgProfile size={22} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-3xl"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          {/* Mobile search */}
          <div className="relative mb-4">
            <IoMdSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="search"
              placeholder="Search your favorite effects"
              className="w-full h-10 pl-10 pr-3 outline-none text-sm bg-white rounded-2xl  text-gray-500"
            />
          </div>

          {/* Mobile links */}
          <div className="flex flex-col items-start space-y-3">
            <div className="inline-flex items-center cursor-pointer text-white hover:text-zinc-200 transition-colors">
              <MdOutlineHome className="text-inherit" size={20} />
              <h1 className="font-bold text-sm sm:text-base ml-1">Home</h1>
            </div>
            <div className="inline-flex items-center cursor-pointer text-white hover:text-[#5efb46] transition-colors">
              <IoMdTrendingUp className="text-inherit" size={20} />
              <h1 className="font-bold text-sm sm:text-base ml-1">Trending</h1>
            </div>
            <div className="flex items-center bg-[#5efb46] px-3 py-2 rounded-xl transform transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer w-full">
              <button className="font-medium text-[#2927d1] text-sm sm:text-base">
                + Ask a Question
              </button>
            </div>
            {/* <button className="text-white hover:text-[#5efb46]">
              <CgProfile size={22}/>
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
