/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

interface SectionTroisProps {
  sectiontrois: {
    element_1: string;          // "Vision Stratégique"
    element_2: string;          // "Démocratie, Climat des Affaires"
    element_3: string;          // "& Intelligence Artificielle..."
    element_4: string;          // Le contenu HTML <p>...</p>
    element_5_ligne_1: string;  // "Cadre des"
    element_5_ligne_2: string;  // "Affaires"
    element_6_ligne_1: string;  // "Innovation"
    element_6_ligne_2: string;  // "Technologique"
    image: {
      url: string;
      alt: string;
      title: string;
    };
    element_7_ligne_1: string;  // "Palais des Congrès"
    element_7_ligne_2: string;  // "Omar Bongo Ondimba"
    element_7_ligne_3: string;  // "Libreville, Gabon"
  };
}

const ThirdPartSection = ({ sectiontrois }: SectionTroisProps) => {
  // Sécurité si les données sont absentes
  if (!sectiontrois) return null;

  return (
    <section className="relative py-10 z-32 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-[-50px] lg:mt-[-70px]">
          
          {/* TEXTE - ORDRE MOBILE : 2 / DESKTOP : 1 */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[#C5A059]" />
                <span className="text-[#C5A059] text-[10px] uppercase font-extrabold">
                  {sectiontrois.element_1}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl text-[#0A1F44] leading-[1.1] font-extrabold hyphens-auto [text-justify:inner-character]">
                {sectiontrois.element_2}&nbsp;
                <span className="text-[#006837] ml-0">
                  {sectiontrois.element_3}
                </span>
              </h2>
            </div>

            <div className="space-y-5">
              {/* Injection du HTML de l'API (élément <p>) */}
              {/*  border-l-4 border-[#C5A059] pl-6  */}
              <div 
                className="text-md text-[#0A1F44] font-sans leading-relaxedtext-justify mt-[-10px]"
                dangerouslySetInnerHTML={{ __html: sectiontrois.element_4 }}
              />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-[#C5A059] text-[9px]  uppercase font-extrabold">
                  {sectiontrois.element_5_ligne_1}
                </span>
                <span className="text-[#0A1F44]  text-[11px] font-extrabold">
                  {sectiontrois.element_5_ligne_2}
                </span>
              </div>
              <div className="flex flex-col text-center lg:text-left">
                <span className="text-[#C5A059] text-[9px]  uppercase font-extrabold">
                  {sectiontrois.element_6_ligne_1}
                </span>
                <span className="text-[#0A1F44]  text-[11px] font-extrabold">
                  {sectiontrois.element_6_ligne_2}
                </span>
              </div>
            </div>
          </div>

          {/* IMAGE & BADGE - ORDRE MOBILE : 1 / DESKTOP : 2 */}
          <div className="relative order-1 lg:order-2">
            <div className="relative group w-full">
              {/* Éléments de design (bordures) */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-[#C5A059]/30 transition-all duration-700 group-hover:-top-2 group-hover:-left-2 -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-[#006837]/30 transition-all duration-700 group-hover:-bottom-2 group-hover:-right-2 -z-10"></div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-2 border border-slate-100 mt-[34px]">
                <div className="relative overflow-hidden rounded-xl aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3]">
                  <img
                    src={sectiontrois.image.url}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    alt={sectiontrois.image.alt || "Libreville 2026"}
                  />
                  <div className="absolute inset-0  bg-gradient-to-t from-[#0A1F44]/50 via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

              {/* Badge de localisation flottant */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#0A1F44] px-6 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center justify-center gap-3 min-w-max z-20">
                <i className="fa-solid fa-location-dot text-[#C5A059] text-xs" />
                <div className="flex flex-col items-center text-center">
                  <span className="text-white text-[10px]  uppercase font-extrabold leading-tight">
                    {sectiontrois.element_7_ligne_1}
                  </span>
                  <span className="text-white text-[10px]  uppercase font-extrabold leading-tight">
                    {sectiontrois.element_7_ligne_2}
                  </span>
                  <span className="text-slate-400 text-[8px] font-sans uppercase tracking-[0.2em]">
                    {sectiontrois.element_7_ligne_3}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ThirdPartSection;