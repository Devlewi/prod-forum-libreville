import React from 'react';

interface Logo {
  src: string;
  alt: string;
  url?: string; // Ajout de la propriété URL optionnelle
}

interface SponsorsGridProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  logos: Logo[];
}

const SponsorsGrid = ({ 
  //badge = "", 
  title, 
  description, 
  logos 
}: SponsorsGridProps) => {
  return (
    <section className="relative py-20 bg-[#f9fafb] overflow-hidden mt-[-80px]">
      {/* Effet de lumière en arrière-plan */}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header de la section */}
        <div className="text-center flex flex-col items-center justify-center w-full mb-16">
  {/* Le badge / description courte */}
  <span className="text-[#C5A059] text-[10px] uppercase font-extrabold block mb-4 tracking-widest">
    {description}
  </span>

  {/* Le titre */}
  <h2 className="text-3xl md:text-5xl font-bold text-[#3d3c3c] mb-6">
    {title}
  </h2>

  {/* La barre centrée avec mx-auto */}
  <div className="w-12 h-1 bg-[#C5A059] mt-2 rounded-full mx-auto" />
</div>
        

        {/* Grille des logos centrée */}
        {/* Grille des logos centrée */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center gap-6 md:gap-4 items-center justify-items-center">
  {logos.map((logo, index) => (
    <div 
      key={index} 
      className="group flex flex-col items-center justify-center w-full lg:w-[calc(20%-2rem)] md:min-w-[200px]"
    >
      <a 
        href={logo.url || "#"} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full max-w-[320px] md:max-w-none h-auto min-h-[130px] md:min-h-[150px] bg-white backdrop-blur-lg rounded-2xl flex items-center justify-center p-6 border border-white/10 hover:border-[#C5A059]/40 hover:bg-white/[0.12] transition-all duration-500 cursor-pointer shadow-xl"
      >
        <img
          src={logo.src}
          alt={logo.alt}
          className="w-full h-auto max-h-[110px] md:max-h-[130px] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </a>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default SponsorsGrid;