"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { formatDate } from '@/app/lib/utils';

interface MediaItem {
  id: number;
  title: string;
  type: string; 
  date: string;
  thumbnail: string;
  category: string;
  videoUrl?: string;
}

interface MediaGridProps {
  items: MediaItem[];
}

const getEmbedUrl = (url?: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
  }
  return url;
};

const MediaGrid: React.FC<MediaGridProps> = ({ items }) => {
  const t = useTranslations("Mediatheque.grid");
  const locale = useLocale(); 
  
  // --- ÉTATS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  // --- ÉTATS PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Réinitialise la page à 1 lors d'une recherche ou d'un changement de filtre
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  // Gestion du scroll et de la touche Echap pour la modale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };
    if (selectedMedia) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedMedia]);

  const filters = [
    { key: "all", label: t("filters.all") },
    { key: "Photo", label: t("filters.photos") },
    { key: "Vidéo", label: t("filters.videos") }
  ];

  // 1. Filtrage global
  const filteredMedia = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "all" || item.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter, items]);

  // 2. Calcul des tranches pour la pagination
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMedia.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll fluide vers le haut de la grille
    const gridElement = document.getElementById('media-grid-start');
    if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="media-grid-start" className="py-24 bg-white px-4 sm:px-6 mt-[-40px] lg:mt-[-80px]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- FILTRES & RECHERCHE --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 border-b border-slate-100 pb-10">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-8 py-2.5 rounded-full text-[10px]  uppercase tracking-widest transition-all duration-300 font-extrabold ${
                  activeFilter === filter.key 
                  ? "bg-[#0A1F44] text-white shadow-lg scale-105" 
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80 group">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full font-extrabold bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none text-[10px]  tracking-widest focus:ring-1 focus:ring-[#C5A059] transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* --- GRILLE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <article key={item.id} className="group cursor-pointer" onClick={() => setSelectedMedia(item)}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5rem] mb-6 shadow-sm bg-slate-100">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  <div className="absolute inset-0 bg-[#0A1F44]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <i className={`fa-solid ${item.type === 'Vidéo' ? 'fa-play' : 'fa-expand'} text-[#0A1F44] text-sm`} />
                    </div>
                  </div>

                  <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 rounded-full text-[8px] font-extrabold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md">
                      {item.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-[#C5A059]" />
                    <p className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest">
                      {formatDate(item.date, locale)}
                    </p>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A1F44] leading-tight group-hover:text-[#006837] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-sans italic">
              {t("noResults")}
            </div>
          )}
        </div>

        {/* --- PAGINATION LOCALE --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20 font-sans">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-3 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    currentPage === i + 1 
                    ? "bg-[#0A1F44] text-white shadow-lg" 
                    : "bg-white text-slate-600 border border-slate-100 hover:border-[#C5A059]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-3 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-all"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        )}

        {/* --- MODALE --- */}
        {selectedMedia && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1F44]/95 backdrop-blur-xl p-4 md:p-10 animate-in fade-in duration-300" onClick={() => setSelectedMedia(null)}>
            <button className="absolute top-8 right-8 text-white/50 hover:text-white text-3xl z-[110]">
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="relative max-w-5xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
              {selectedMedia.type === "Photo" ? (
                <img 
                    src={selectedMedia.thumbnail} 
                    className="max-h-[75vh] w-auto rounded-3xl object-contain shadow-2xl border border-white/10" 
                    alt={selectedMedia.title} 
                />
              ) : (
                <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  <iframe 
                    src={getEmbedUrl(selectedMedia.videoUrl) || ""} 
                    className="w-full h-full" 
                    allowFullScreen
                    allow="autoplay; fullscreen"
                  ></iframe>
                </div>
              )}
              
              <div className="mt-8 text-center max-w-2xl px-4">
                <span className="text-[#C5A059] text-[10px]  uppercase tracking-[0.3em] mb-3 block font-sans">
                   {formatDate(selectedMedia.date, locale)}
                </span>
                <h2 className="text-white text-2xl md:text-3xl font-sans font-bold leading-tight">
                  {selectedMedia.title}
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MediaGrid;