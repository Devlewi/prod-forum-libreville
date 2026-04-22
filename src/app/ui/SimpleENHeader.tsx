/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { usePathname } from "next/navigation";
import { getLocalizedLink } from "../lib/utils";

// 1. Define the shape of your props
interface SimpleHeaderProps {
  texte1: string;
  texte2: string;
  texte3: string;
  texte4: string;
}
// We destructure the props here so they are usable inside the component
const SimpleENHeader = ({ texte1, texte2, texte3, texte4 }:SimpleHeaderProps) => {

  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/en") ? "en" : "fr";
  // CETTE LIGNE EST LA CLÉ : Elle pré-remplit le premier argument pour toi
  const getLink = (slug: string) => getLocalizedLink(currentLocale, slug);

  return (
    <>
      <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src={getLink("/images/slide-1-1200.webp")} 
            alt="L'Équipe du Forum"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/50 to-blue-950/90" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-[1px] w-8 bg-[#C5A059]/50" />
            <span className="text-[#C5A059] font-extrabold  lg:text-[16px] text-[12px] uppercase tracking-widest">
              {texte1 || "..."}
            </span>
            <span className="h-[1px] w-8 bg-[#C5A059]/50" />
          </div>

          <h1 className="text-3xl md:text-7xl font-sans font-bold text-white leading-[1.2] mb-8">
            
            <span className="relative inline-block text-transparent font-sans bg-clip-text bg-gradient-to-br from-[#009e60] via-[#00ff99] to-[#C5A059] px-4">
              {texte3 || "..."}              
            </span>
          </h1>


{/*
<p className="text-slate-300 mt-4 lg:text-[20px] text-[14px] max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-6 font-sans text-center hyphens-auto">
  <span className="text-[#C5A059] text-2xl lg:text-3xl align-middle mr-2 leading-none">
    &ldquo;
  </span>
  
  <span className="inline">
    {texte4 || "..."}
  </span>
  <span className="text-[#C5A059] text-2xl lg:text-3xl align-middle ml-2 leading-none">
    &rdquo;
  </span>
</p>
*/}
<div className="relative max-w-3xl mx-auto mt-10">
  {/* Éléments graphiques forts */}
  <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#C5A059]"></div>
  <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#C5A059]"></div>

  <p className="text-white lg:text-[24px] text-[16px] leading-relaxed font-sans text-center px-8 py-4 font-medium tracking-wide bg-white/5 backdrop-blur-sm rounded-sm">
    {texte4 || "..."}
  </p>
</div>
        </div>
      </header>
    </>
  );
};

export default SimpleENHeader;