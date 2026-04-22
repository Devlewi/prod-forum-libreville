/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const FiveBlocksDesktop = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6 lg:p-20 mb-40 sm:mb-150">
      {/* Bloc 1 : Actualité */}
      
      <div className="p-6 rounded-lg flex flex-col justify-between lg:ml-[-40px] mt-[-23px]">
        <h3 className="text-4xl lg:text-5xl font-bold text-[#2e76bc] text-center pt-0 lg:pt-8 relative">
          Actualités
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-1/3 h-[6px] bg-[#2e76bc]"></span>
        </h3>
      </div>


      {/* Bloc 1 : NOS PROJETS */}
      <div className="w-full rounded-3xl flex flex-col justify-center items-center text-white relative cursor-pointer sm:perspective lg:perspective mt-0 sm:mt-[-400px] lg:mt-[-400px] sm:mb-40 lg:mb-0">
        <div className="relative w-full h-ful transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
          {/* Face Avant */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#2e76bc] p-4 rounded-3xl shadow-lg text-white z-10 flex flex-col justify-center items-center">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
                La construction d’un 2ème hôtel de classe internationale
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>
          {/* Face Arrière */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#1f5e8e] text-white rounded-3xl p-4 flex flex-col justify-center items-center z-10 rotate-y-180">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
                Ce projet est conçu pour booster le tourisme et stimuler
                l’économie locale. 
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Bloc 1 : NOS PROJETS */}
      <div className="w-full rounded-3xl flex flex-col justify-center items-center text-white relative cursor-pointer sm:perspective lg:perspective mt-0 sm:mt-[-400px] lg:mt-[-400px] mb-0 sm:mb-40 lg:mb-0">
        <div className="relative w-full h-ful transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
          {/* Face Avant */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#2e76bc] p-4 rounded-3xl shadow-lg text-white z-10 flex flex-col justify-center items-center">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
                La construction d’un 2ème hôtel de classe internationale
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>
          {/* Face Arrière */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#1f5e8e] text-white rounded-3xl p-4 flex flex-col justify-center items-center z-10 rotate-y-180">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
              Ce projet est conçu pour booster le tourisme et stimuler
              l’économie locale. 
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Bloc 1 : NOS PROJETS */}
      <div className="w-full rounded-3xl flex flex-col justify-center items-center text-white relative cursor-pointer perspective mt-0 sm:mt-[-400px] lg:mt-[-400px] mb-52 sm:mb-40 lg:mb-0">
        <div className="relative w-full h-ful transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
          {/* Face Avant */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#2e76bc] p-4 rounded-3xl shadow-lg text-white z-10 flex flex-col justify-center items-center">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
                La construction d’un 2ème hôtel de classe internationale
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>

          {/* Face Arrière */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#1f5e8e] text-white rounded-3xl p-4 flex flex-col justify-center items-center z-10 rotate-y-180">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
              Ce projet est conçu pour booster le tourisme et stimuler
              l’économie locale. 
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Bloc 1 : NOS PROJETS */}
      <div className="w-full rounded-3xl flex flex-col justify-center items-center text-white relative cursor-pointer perspective mt-0 sm:mt-[-400px] lg:mt-[-400px] mb-52 sm:mb-40 lg:mb-0">
        <div className="relative w-full h-ful transition-transform duration-700 transform-style preserve-3d hover:rotate-y-180">
          {/* Face Avant */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#2e76bc] p-4 rounded-3xl shadow-lg text-white z-10 flex flex-col justify-center items-center">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
                La construction d’un 2ème hôtel de classe internationale
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>

          {/* Face Arrière */}
          <div className="sm:absolute lg:absolute w-full h-ful backface-hidden bg-[#1f5e8e] text-white rounded-3xl p-4 flex flex-col justify-center items-center z-10 rotate-y-180">
            <div className="bg-white mb-4 flex justify-center items-center shadow-lg border-4 border-white rounded-lg overflow-hidden">
              <img
                src="/images/hotel.jpg"
                alt="Icon"
                className="w-full h-auto max-w-[300px] object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="text-[25px] font-semibold">NOS PROJETS</h3>
              <p className="text-[16px] mt-2">
              Ce projet est conçu pour booster le tourisme et stimuler
              l’économie locale. 
              </p>
              <div className="flex items-center justify-center mt-4">
                <FaCalendarAlt className="text-white mr-2" size={20} />
                <p className="text-sm">24 Mars 2025</p>
              </div>
              <Link href="">
                <span className="mt-4 inline-block bg-gray-900 text-white font-semibold py-1 px-6 rounded-full hover:bg-gray-800 transition-colors duration-300">
                  Voir plus
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
};

export default FiveBlocksDesktop;
