/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link";

interface PartnerLogo {
  image: string;
  lien: string;
}

interface SectionSixProps {
  sectionsix: {
    titre: string;
    sous_titre: string;
    logos: PartnerLogo[];
  };
  lang: "fr" | "en";
}

const SixthPartSection = ({ sectionsix, lang }: SectionSixProps) => {
  if (!sectionsix) return null;

  const t = {
    fr: {
      becomePartner: "Devenir partenaire de l'édition 2026",
      partnerPath: "/fr/contact",
    },
    en: {
      becomePartner: "Become a partner for the 2026 edition",
      partnerPath: "/en/contact",
    },
  };

  const currentT = t[lang] || t.fr;

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center flex flex-col items-center justify-center w-full">
          <span className="text-[#009e60] text-xs uppercase font-extrabold block mb-2 tracking-widest">
            {sectionsix.titre}
          </span>
          <h2 className="text-2xl md:text-3xl text-blue-950 uppercase font-extrabold leading-tight">
            {sectionsix.sous_titre}
          </h2>
          <div className="w-12 h-1 bg-[#C5A059] mt-4 rounded-full" />
        </div>
      </div>

      {/* CONTENEUR DES LOGOS */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-6 md:gap-10 justify-center items-center">
          {sectionsix.logos?.map((partner, index) => {
            // Sécurité au cas où l'API renvoie encore un string au lieu d'un objet
            const logoSrc = typeof partner === 'string' ? partner : partner.image;
            const logoLink = typeof partner === 'object' ? partner.lien : '#';

            return (
              <div key={index} className="w-full sm:w-auto flex-none">
                <a 
                  href={logoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-[200px] md:w-[260px] h-[120px] md:h-[160px] 
                            bg-white rounded-xl shadow-sm border border-slate-100 
                            flex items-center justify-center p-6
                            transition-all duration-300 hover:shadow-md hover:-translate-y-1 block"
                >
                  <img
                    src={logoSrc}
                    alt={`Partner logo ${index + 1}`}
                    className="w-full h-full object-contain transition-all duration-500"
                    draggable="false"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="mt-16 text-center">
        <Link
          href={currentT.partnerPath}
          className="inline-flex items-center gap-4 group"
        >
          <span className="text-[10px] uppercase font-extrabold text-slate-400 group-hover:text-[#009e60] transition-colors">
            {currentT.becomePartner}
          </span>
          <span className="h-[1px] w-12 bg-slate-200 group-hover:w-20 group-hover:bg-[#009e60] transition-all" />
        </Link>
      </div>
    </section>
  );
};

export default SixthPartSection;