/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";


interface PartnerLogo {
  image: string;
  lien: string;
}

interface sectionseptProps {
  sectionsept: {
    titre: string;
    sous_titre: string;
    logos: PartnerLogo[];
  };
  lang: "fr" | "en";
}

const SeventhPartSection = ({ sectionsept, lang }: sectionseptProps) => {
  // Sécurité si les données ne sont pas encore chargées ou vides
  if (!sectionsept || !sectionsept.logos || sectionsept.logos.length === 0) return null;

  const t = {
    fr: {
      becomePartner: "Réserver votre séjour", // Adapté pour l'hébergement
      partnerPath: "/fr/contact",
    },
    en: {
      becomePartner: "Book your stay",
      partnerPath: "/en/contact",
    },
  };

  //const currentT = t[lang] || t.fr;

  return (
    <section className="py-20 bg-[#0f2350] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center flex flex-col items-center justify-center w-full">
          <span className="text-[#009e60] text-xs uppercase font-extrabold block mb-2 tracking-widest">
            {sectionsept.sous_titre || (lang === 'fr' ? "Nos Hôtels Partenaires" : "Our Partner Hotels")}
          </span>
          
          <h2 className="text-2xl md:text-3xl text-white uppercase font-extrabold leading-tight">
            {sectionsept.titre || (lang === 'fr' ? "Hébergement" : "Accommodation")}
          </h2>
          <div className="w-12 h-1 bg-[#C5A059] mt-4 rounded-full" />
        </div>
      </div>

      {/* CONTENEUR DES LOGOS CLIQUABLES */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-6 md:gap-10 justify-center items-center">
          {sectionsept.logos.map((partner, index) => (
            <div key={index} className="w-full sm:w-auto flex-none">
              <a 
                href={partner.lien || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-[220px] md:w-[280px] h-[120px] md:h-[150px] 
                          bg-white rounded-xl shadow-sm border border-slate-100 
                          flex items-center justify-center p-8
                          transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block"
                title={lang === 'fr' ? "Visiter le site" : "Visit website"}
              >
                <img
                  src={partner.image}
                  alt={`Logo Hôtel ${index + 1}`}
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500"
                  draggable="false"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default SeventhPartSection;