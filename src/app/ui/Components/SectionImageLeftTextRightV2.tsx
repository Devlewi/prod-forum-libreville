import React from 'react';

interface VisionSectionProps {
  badge?: string;
  title: string;
  description: React.ReactNode; 
  imageUrl: string;
  imageAlt?: string;
}

const SectionImageLeftTextRightV2 = ({ 
  badge = "Vision Fondatrice", 
  title, 
  description, 
  imageUrl, 
  imageAlt = "Illustration" 
}: VisionSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden">
      {/* CHANGEMENT : items-start au lieu de items-center pour bloquer l'alignement en haut */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-start">
        
        {/* Colonne Image */}
        <div className="relative order-1 lg:sticky mt-[-40px] lg:mt-[-50px]"> 
          <div className="relative group">
            <div className="absolute -top-6 -left-2 w-24 h-24 border-t-2 border-l-2 border-[#C5A059]/30 transition-all duration-700 group-hover:-top-3 group-hover:-left-3"></div>
            
            {/* Fixer un aspect-ratio (4/3 ou 3/2) évite que l'image ne change de taille selon le contenu voisin */}
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_60px_-15px_rgba(10,31,68,0.1)] bg-[#0A1F44] aspect-[4/3] w-full flex items-center justify-center">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-contain filter group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A1F44]/20 via-transparent to-transparent"></div>
              {/* AFFICHAGE DU TEXTE SOUS LA PHOTO */}            
            </div>
            {imageAlt && (
              <p className="mt-4 lg:text-[14px] text-[12px] font-extrabold  tracking-widest text-[#0A1F44] opacity-70 border-l-2 border-[#C5A059] pl-4">
                {imageAlt}
              </p>
            )}
          </div>
        </div>

        {/* Colonne Texte */}
        <div className="space-y-8 order-2 flex flex-col mt-[-30px] lg:mt-[-80px] items-start">
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-4 mb-2">
              <div className="inline-flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#C5A059]" />
                <span className="text-[12px] lg:text-[16px]  uppercase font-extrabold tracking-widest text-[#C5A059]">
                  {badge}
                </span>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold  leading-[1.1] tracking-tighter text-[#0A1F44] ">
              {title}
            </h2>
          </div>
          
          <div className="w-full max-w-xl">
            {/* Utilisation de text-slate-500 pour une meilleure lisibilité et inter-word pour la justification */}
            <div className="text-base text-slate-500 font-sans leading-relaxed text-justify [text-justify:inter-word] whitespace-pre-line hyphens-auto text-justify [text-justify:inner-character]">
              {description}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SectionImageLeftTextRightV2;