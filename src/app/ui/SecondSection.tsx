/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link"; // Utilisation de Link de Next.js pour le routing
import { getLocalizedLink } from "../lib/utils";
import { useTranslations } from "next-intl";

interface SectionDeuxProps {
  sectiondeux: {
    element_1_ligne_1: string; // "Impact"
    element_1_ligne_2: string; // "Sommet 2026"
    element_2_ligne_1: string; // "+ 500"
    element_2_ligne_2: string; // "Entreprises"
    element_3_ligne_1: string; // "25"
    element_3_ligne_2: string; // "Pays"
    element_4_ligne_1: string; // "40"
    element_4_ligne_2: string; // "Intervenants"
    element_5_ligne_1: string; // "Forum"
    element_5_ligne_2: string; // "Networking"
    texte_element_6: string;   // "La Thématique"
    url_element_6: string;     // "/la-thematique"
  };
  lang: string; // Ajout de la prop lang
}

const SecondSection = ({ sectiondeux,lang }: SectionDeuxProps) => {
  //const pathname = usePathname();
  const t = useTranslations("Inscription");
    const getLink = (slug: string) => getLocalizedLink(lang, slug);
  // Sécurité si les données ne sont pas encore là
  if (!sectiondeux) return null;

  return (
    <section className="bg-[transparent] relative z-30 max-w-7xl mx-auto px-6 -mt-14 md:-mt-14">
      <h2 className="sr-only">Impact du Sommet</h2>
      <div className="bg-blue-950 rounded-2xl md:rounded-full border border-white/10 p-2 md:p-3 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center">
          
          {/* Bloc 1: Impact / Sommet */}
          <div className="px-8 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
            <i className="fa-solid fa-chart-line text-[#009e60] text-[10px] animate-pulse mb-2" />
            <span className="text-[#009e60] text-[9px] font-extrabold uppercase tracking-[0.2em] leading-tight">
              {sectiondeux.element_1_ligne_1}
            </span>
            <span className="text-white text-[11px] uppercase font-extrabold opacity-60">
              {sectiondeux.element_1_ligne_2}
            </span>
          </div>

          <div className="flex-grow grid grid-cols-2 md:grid-cols-4 py-6 md:py-2">
            {/* Bloc 2: Entreprises */}
            <div className="px-6 md:px-10 flex flex-col items-center md:items-start group">
              <span className="text-3xl md:text-4xl text-white font-extrabold transition-transform group-hover:-translate-y-1 duration-300">
                {sectiondeux.element_2_ligne_1}
              </span>
              <p className="text-[9px] font-extrabold text-white/90 uppercase mt-1 group-hover:text-white/60 transition-colors">
                {sectiondeux.element_2_ligne_2}
              </p>
            </div>

            {/* Bloc 3: Pays */}
            <div className="px-6 md:px-10 flex flex-col items-center md:items-start border-l border-white/5 group">
              <span className="text-3xl md:text-4xl font-extrabold text-white  transition-transform group-hover:-translate-y-1 duration-300">
                {sectiondeux.element_3_ligne_1}
              </span>
              <p className="text-[9px] font-extrabold text-white/90 uppercase mt-1 group-hover:text-white/60 transition-colors">
                {sectiondeux.element_3_ligne_2}
              </p>
            </div>

            {/* Bloc 4: Intervenants */}
            <div className="px-6 md:px-10 flex flex-col items-center md:items-start border-l border-white/5 group">
              <span className="text-3xl md:text-4xl font-extrabold text-white  transition-transform group-hover:-translate-y-1 duration-300">
                {sectiondeux.element_4_ligne_1}
              </span>
              <p className="text-[9px] font-extrabold text-white/90 uppercase mt-1 group-hover:text-white/60 transition-colors">
                {sectiondeux.element_4_ligne_2}
              </p>
            </div>

            {/* Bloc 5: Forum / Networking */}
            <div className="px-6 md:px-10 flex flex-col items-center md:items-start border-l border-white/5 group">
              <span className="text-3xl md:text-4xl font-extrabold text-[#009e60] transition-transform group-hover:-translate-y-1 duration-300">
                {sectiondeux.element_5_ligne_1}
              </span>
              <p className="text-[9px] font-extrabold text-white/90 uppercase mt-1 group-hover:text-white/60 transition-colors">
                {sectiondeux.element_5_ligne_2}
              </p>
            </div>
          </div>

          {/* Bloc 6: Bouton d'action */}
          {/* Bloc 6: Bouton d'action - Largeur équilibrée */}
          <div className="hidden lg:block px-4">
            <Link
              href={getLink(sectiondeux.url_element_6)}
              className="bg-[#009e60] hover:bg-white hover:text-blue-950 text-white 
                         min-w-[180px] text-center px-8 py-4 rounded-full 
                         text-[11px] font-extrabold uppercase 
                         transition-all duration-300 shadow-xl inline-block
                         hover:scale-105 active:scale-95"
            >
              {sectiondeux.texte_element_6}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;