"use client";

import React, { useState } from 'react';

export interface Sequence {
  id: string;
  title: string;
  tag: string;
  description: string | string[];
  footer: string;
  bgColor: string;
  hoverShadow: string;
  // Ajout optionnel pour plus de détails si besoin
  details?: string[]; 
}

interface ProgramSectionProps {
  title?: string;
  subtitle?: string;
  details_badge?: string;
  data: Sequence[];
}

const ProgramSection: React.FC<ProgramSectionProps> = ({ 
  title = "Le Programme de l'Excellence", 
  subtitle = "Une structure complète pour catalyser la transformation économique du Gabon.", 
  details_badge = "Structure du Forum 2026",
  data 
}) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">    
        
        {/* Header - Plus large pour introduire le contenu étoffé */}
        <div className="mb-20 border-l-4 border-[#C5A059] pl-8">
          <span className="text-[12px] uppercase font-extrabold tracking-[0.2em] text-[#C5A059] block mb-2">
            {details_badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-[#162554] mb-6">
            {title}
          </h2>
          <p className="text-slate-500 font-sans text-xl max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Liste Verticale Étoffée */}
        <div className="space-y-12">
          {data.map((item, index) => (
            <div 
              key={index}
              className="group relative flex flex-col md:flex-row gap-8 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl border border-slate-100 bg-slate-50/50"
              style={{ 
                borderLeft: `8px solid ${item.bgColor}` 
              }}
            >
              {/* Colonne ID & Tag */}
              <div className="flex flex-row md:flex-col justify-between items-start md:w-32 shrink-0">
                <span className="text-5xl font-black text-slate-200 group-hover:text-[#162554]/10 transition-colors">
                  {item.id}
                </span>
                {/*
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white shadow-sm border border-slate-100" style={{ color: item.bgColor }}>
                  {item.tag}
                </span>
                */}
              </div>

              {/* Colonne Contenu Principal */}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-[#162554] mb-4 group-hover:text-[#C5A059] transition-colors">
                  {item.title}
                </h3>
                
                <div className="prose prose-slate max-w-none">
                  {Array.isArray(item.description) ? (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      {item.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-[15px]">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.bgColor }} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-600 text-[16px] leading-relaxed italic">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Footer de section - ex: "Rapport final stratégique" */}
                {item.footer && (
                    <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-2">
                      {/* Remplacement de span par div pour supporter les structures HTML complexes */}
                              <div 
                                className="text-[#162554] text-[11px] lg:text-[16px] tracking-wide
                                          whitespace-pre-line 
                                          [&_p]:mb-2 last:[&_p]:mb-0"
                                dangerouslySetInnerHTML={{ __html: item.footer }}
                              />
                    </div>
                  )}
              </div>

              {/* Décoration d'arrière-plan discrète absolute right-0 top-0 w-32 h-full opacity-[0.03] */}
              <div 
                className="pointer-events-none rounded-r-[2.5rem]"
                style={{ backgroundColor: item.bgColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;