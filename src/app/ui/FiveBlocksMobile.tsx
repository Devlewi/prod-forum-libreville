/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const FiveBlocksMobile = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6 lg:p-20 mb-40 sm:mb-0">
      {/* Bloc 1 : Actualité */}
      <div className="p-6 rounded-lg flex flex-col justify-between lg:ml-[-40px] mt-[-23px]">
        <h3 className="text-4xl lg:text-5xl font-bold text-[#2e76bc] text-center pt-0 lg:pt-8 relative">
          Actualités
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-1/3 h-[6px] bg-[#2e76bc]"></span>
        </h3>
      </div>

      {/* Bloc 1 : NOS PROJETS */}
<div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32 transition-all duration-300 sm:hover:scale-105 sm:hover:rotate-2 sm:hover:bg-[#1f5e8e] cursor-pointer">
  <div className="bg-white p-0 mb-4 flex justify-center items-center shadow-lg border-4 border-white">
    <div className="w-full flex justify-center items-center">
      <img
        src="/images/hotel.jpg"
        alt="Icon"
        className="w-full h-auto max-w-[350px] sm:max-w-[280px] lg:w-52 lg:h-44 object-cover"
      />
    </div>
  </div>
  <div className="text-center">
    <h3 className="text-[25px] font-semibold sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
      NOS PROJETS
    </h3>
    <p className="text-[16px] mt-2 sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
      La construction d’un 2ème hôtel de classe internationale
    </p>
    <div className="flex items-center justify-center mt-2">
      <FaCalendarAlt className="text-white mr-2" size={30} />
      <p className="text-sm lg:text-[17px] mt-4">24 Mars 2025</p>
    </div>
    <Link href={""}>
      <span className="mt-4 mb-4 text-[17px] inline-block bg-gray-900 text-[#fff] font-semibold py-1 px-6 rounded-full hover:bg-gray-900 hover:text-[#fff] transition-colors duration-300">
        Voir plus
      </span>
    </Link>
  </div>
</div>


      {/* Bloc 2 : AUTRE INFO */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32 transition-all duration-300 sm:hover:scale-105 sm:hover:rotate-2 sm:hover:bg-[#1f5e8e] cursor-pointer">
  <div className="bg-white p-0 mb-4 flex justify-center items-center shadow-lg border-4 border-white">
    <div className="w-full flex justify-center items-center">
      <img
        src="/images/dev-durable.jpg"
        alt="Icon"
        className="w-full h-auto max-w-[350px] sm:max-w-[280px] lg:w-52 lg:h-44 object-cover"
      />
    </div>
  </div>
  <div className="text-center">
    <h3 className="text-[25px] font-semibold sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
    DEVELOPPEMENT DURABLE
    </h3>
    <p className="text-[16px] mt-2 sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
      Notre objectif est de developper un portefeuille varié de services
      ...
    </p>
    <div className="flex items-center justify-center mt-2">
      <FaCalendarAlt className="text-white mr-2" size={30} />
      <p className="text-sm lg:text-[17px] mt-4">24 Mars 2025</p>
    </div>
    <Link href={""}>
      <span className="mt-4 mb-4 text-[17px] inline-block bg-gray-900 text-[#fff] font-semibold py-1 px-6 rounded-full hover:bg-gray-900 hover:text-[#fff] transition-colors duration-300">
        Voir plus
      </span>
    </Link>
  </div>
      </div>


      {/* Bloc 3 : AUTRE INFO */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32 transition-all duration-300 sm:hover:scale-105 sm:hover:rotate-2 sm:hover:bg-[#1f5e8e] cursor-pointer">
  <div className="bg-white p-0 mb-4 flex justify-center items-center shadow-lg border-4 border-white">
    <div className="w-full flex justify-center items-center">
      <img
        src="/images/carriere.jpg"
        alt="Icon"
        className="w-full h-auto max-w-[350px] sm:max-w-[280px] lg:w-52 lg:h-44 object-cover"
      />
    </div>
  </div>
  <div className="text-center">
    <h3 className="text-[25px] font-semibold sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
    CARRIERES
    </h3>
    <p className="text-[16px] mt-2 sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
    L&apos;hôtel Hilton récrute 2 Maîtres d&apos;hôtel
    </p>
    <div className="flex items-center justify-center mt-2">
      <FaCalendarAlt className="text-white mr-2" size={30} />
      <p className="text-sm lg:text-[17px] mt-4">24 Mars 2025</p>
    </div>
    <Link href={""}>
      <span className="mt-4 mb-4 text-[17px] inline-block bg-gray-900 text-[#fff] font-semibold py-1 px-6 rounded-full hover:bg-gray-900 hover:text-[#fff] transition-colors duration-300">
        Voir plus
      </span>
    </Link>
  </div>
      </div>



      {/* Bloc 4 : AUTRE INFO */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32 transition-all duration-300 sm:hover:scale-105 sm:hover:rotate-2 sm:hover:bg-[#1f5e8e] cursor-pointer">
  <div className="bg-white p-0 mb-4 flex justify-center items-center shadow-lg border-4 border-white">
    <div className="w-full flex justify-center items-center">
      <img
        src="/images/publications.jpg"
        alt="Icon"
        className="w-full h-auto max-w-[350px] sm:max-w-[280px] lg:w-52 lg:h-44 object-cover"
      />
    </div>
  </div>
  <div className="text-center">
    <h3 className="text-[25px] font-semibold sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
    PUBLICATIONS
    </h3>
    <p className="text-[16px] mt-2 sm:h-[65px] sm:overflow-hidden sm:leading-[1.4em]">
    L&apos;hôtel Hilton récrute 2 Maîtres d&apos;hôtel
    </p>
    <div className="flex items-center justify-center mt-2">
      <FaCalendarAlt className="text-white mr-2" size={30} />
      <p className="text-sm lg:text-[17px] mt-4">24 Mars 2025</p>
    </div>
    <Link href={""}>
      <span className="mt-4 mb-4 text-[17px] inline-block bg-gray-900 text-[#fff] font-semibold py-1 px-6 rounded-full hover:bg-gray-900 hover:text-[#fff] transition-colors duration-300">
        Voir plus
      </span>
    </Link>
  </div>
      </div>
    </div>
  );
};

export default FiveBlocksMobile;
