'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

interface ImageGalleryProps {
  badge?: string;
  title: string;
  images: GalleryImage[];
}

const ImageGallery = ({ badge, title, images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // État pour stocker la direction de l'animation ('next' ou 'prev')
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Fonctions de navigation
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection('next'); // Définir la direction
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  }, [selectedIndex, images.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setDirection('prev'); // Définir la direction
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  }, [selectedIndex, images.length]);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <section className="py-0 bg-white overflow-hidden mt-[20px] mb-[20px]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Identique */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] text-[10px]  uppercase font-extrabold tracking-widest">
              {badge}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44]">
            {title}
          </h2>
        </div>

        {/* Grille - Identique */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              onClick={() => {
                setDirection('next'); // Direction par défaut pour l'ouverture
                setSelectedIndex(index);
              }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-slate-100"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="flex font-extrabold items-center gap-2 text-white text-[10px]  uppercase tracking-[0.2em] bg-[#0A1F44]/60 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 shadow-xl transition-transform duration-300 group-hover:scale-110 pointer-events-auto">
                  <Maximize2 size={12} className="text-[#C5A059]" />
                  Agrandir
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A1F44]/90 via-[#0A1F44]/40 to-transparent">
                <p className="text-white text-[10px]  uppercase font-sans tracking-widest">
                  {image.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Slider ANIMÉ */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0A1F44]/95 backdrop-blur-md flex items-center justify-center overflow-hidden"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Bouton Fermer - Identique */}
          <button 
            className="absolute top-6 right-6 z-[120] text-white/70 hover:text-white transition-all hover:rotate-90 duration-300"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={40} strokeWidth={1} />
          </button>

          {/* Navigation Gauche */}
          <button 
            className="absolute left-4 md:left-8 z-[120] p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={showPrev}
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Conteneur de l'Image et du Label */}
          <div className="relative flex flex-col items-center max-w-[90vw] z-[110]" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-lg shadow-2xl relative">
                {/* HACK D'ANIMATION :
                  1. key={selectedIndex} : Force React à recréer l'<img> à chaque changement d'index.
                  2. animate-in : Utilise le plugin tailwindcss-animate pour l'entrée.
                  3. slide-in-from-right/left : Définit l'effet selon la direction.
                */}
                <img 
                  key={selectedIndex}
                  src={images[selectedIndex].src} 
                  className={`max-h-[80vh] w-auto object-contain 
                    animate-in duration-500 ease-in-out
                    ${direction === 'next' ? 'slide-in-from-right-20 fade-in' : 'slide-in-from-left-20 fade-in'}
                  `}
                  alt={images[selectedIndex].alt}
                />
            </div>

            {/* Label - Légère animation de fondu aussi */}
            <div key={`label-${selectedIndex}`} className="mt-6 text-center animate-in fade-in duration-700 delay-100">
                <p className="text-[#C5A059] text-[10px]  uppercase tracking-[0.3em] mb-1">
                    Image {selectedIndex + 1} / {images.length}
                </p>
                <p className="text-white font-sans text-lg md:text-xl">
                    {images[selectedIndex].label}
                </p>
            </div>
          </div>

          {/* Navigation Droite */}
          <button 
            className="absolute right-4 md:right-8 z-[120] p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={showNext}
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;