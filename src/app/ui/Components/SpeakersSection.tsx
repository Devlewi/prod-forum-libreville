import React from 'react';

export interface Speaker {
  id: number;
  name: string;
  role: string;
  organization: string;
  image: string;
  category: 'institutionnel' | 'expert' | 'gouvernement';
  color: string; // ex: "#162554" ou "#C5A059"
}

interface SpeakersSectionProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  speakers: Speaker[];
}

const SpeakersSection: React.FC<SpeakersSectionProps> = ({ 
  title = "Intervenants de Prestige", 
  //subtitle = "Des leaders d'opinion et décideurs engagés pour l'avenir du continent.", 
  badge = "Les Intervenants.",
  speakers 
}) => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mt-[-50px] lg:mt-[-50px]">
        
        {/* Header de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[2px] bg-[#C5A059]" />
              <span className="text-[12px] lg:text-[16px]  uppercase font-extrabold tracking-widest text-[#C5A059]">
                {badge}
                </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#162554]">
              {title}
            </h2>
          </div>
          {/*          
          <p className="text-slate-500 font-sans max-w-sm text-md leading-relaxed">
            {subtitle}
          </p>
          */}
        </div>

        {/* Grille des Intervenants */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="group relative">
              {/* Conteneur Image avec bordure colorée au hover */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                <img 
                  src={speaker.image} 
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110  group-hover:grayscale-0"
                />
                
                {/* Overlay de couleur au survol (bas de l'image) */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundImage: `linear-gradient(to top, ${speaker.color}, transparent)` }}
                />
                
                {/* Badge Catégorie */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px]  text-[#162554] uppercase tracking-tighter shadow-sm font-extrabold">
                    {speaker.category}
                  </span>
                </div>
              </div>

              {/* Infos Speaker */}
              <div className="space-y-1 px-2">
                <h4 className="text-xl font-bold text-[#162554] group-hover:text-opacity-80 transition-colors">
                  {speaker.name}
                </h4>
                <p className="text-sm font-bold text-[#C5A059] uppercase tracking-widest italic">
                  {speaker.role}
                </p>
                <div className="pt-2">
                   <p className="text-slate-400 text-xs font-bold leading-tight border-l-2 border-slate-200 pl-3">
                    {speaker.organization}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;