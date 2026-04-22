import React from 'react';

interface Logo {
  src: string;
  alt: string;
}

interface LogoGridProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  logos: Logo[];
}

const LogoGrid = ({ 
  badge = "Écosystème de Réussite", 
  title, 
  //titleAccent, 
  description, 
  logos 
}: LogoGridProps) => {
  return (
    <section className="relative py-20 bg-[#0A1F44] overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header de la section */}
        <div className="text-center mb-16">
          <span className="text-[#C5A059] text-[10px]  uppercase font-extrabold block mb-4 tracking-widest">
            {badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {title} {/*titleAccent && (
              <span className="text-[#C5A059] block md:inline font-sans">
                {titleAccent}
              </span>
            )*/}
          </h2>
          {description && (
            <p className="text-slate-300 font-sans text-sm md:text-base max-w-2xl mx-auto leading-relaxed opacity-80 italic">
              {description}
            </p>
          )}
        </div>

        {/* Grille des logos */}
        {/* Grille des logos centrée */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-4 md:gap-4 items-center justify-items-center">
  {logos.map((logo, index) => (
    <div 
      key={index} 
      className="group flex flex-col items-center justify-center w-full lg:w-[calc(20%-2rem)] min-w-[200px]"
    >
      <div className="w-full h-auto min-h-[130px] md:min-h-[150px] bg-white backdrop-blur-lg rounded-2xl flex items-center justify-center p-4 border border-white/10 hover:border-[#C5A059]/40 hover:bg-white/[0.12] transition-all duration-500 cursor-pointer shadow-xl">
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-full h-auto max-h-[110px] md:max-h-[130px] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default LogoGrid;