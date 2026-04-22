/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  id: number;
  titre: string;
  type: "IMAGE" | "VIDEO";
  image: string | null;
  video: string | null;
}

interface SectionCinqProps {
  sectioncinq: {
    titre: string;
    sous_titre: string;
    items: MediaItem[];
  };
  lang: "fr" | "en";
}

const FifthPartSection = ({ sectioncinq, lang }: SectionCinqProps) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  if (!sectioncinq) return null;

  const getVideoThumbnail = (videoUrl: string | null): string => {
    if (!videoUrl) return "/images/placeholder-media.webp";
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = videoUrl.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
    }
    return "/images/placeholder-media.webp";
  };

  const getEmbedUrl = (url: string | null) => {
    if (!url) return null;
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const id = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url; // Pour d'autres formats ou intégrations directes
  };

  const t = {
    fr: { viewAlbum: "Voir l'album complet", videoBadge: "Vidéo", photoBadge: "Photo", albumPath: "/fr/mediatheque" },
    en: { viewAlbum: "View full album", videoBadge: "Video", photoBadge: "Photo", albumPath: "/en/media-library" },
  };

  const currentT = t[lang] || t.fr;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between mb-12 gap-6 text-center md:text-left mt-[-50px]">
          <div>
            <span className="text-[#009e60]  text-xs uppercase font-extrabold block mb-2">{sectioncinq.sous_titre}</span>
            <h2 className="text-2xl  text-blue-950 uppercase font-extrabold">{sectioncinq.titre}</h2>
          </div>
          <div className="h-[2px] flex-grow mx-8 bg-gray-200 hidden md:block mb-4" />
          <Link href={currentT.albumPath} className="text-[10px]  uppercase font-extrabold text-blue-900 hover:text-[#009e60] transition-colors md:mb-4 lg:mt-[0px] mt-[-10px]">
            {currentT.viewAlbum} <i className="fa-solid fa-arrow-right ml-2" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[-40px]">
          {sectioncinq.items?.map((item) => {
            const isVideo = item.type === "VIDEO";
            const previewImage = item.image || (isVideo ? getVideoThumbnail(item.video) : "/images/placeholder-media.webp");

            return (
              <motion.div
                layoutId={`media-${item.id}`}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative overflow-hidden rounded-2xl bg-slate-900 aspect-video shadow-md cursor-pointer"
              >
                <div className={`absolute top-4 right-4 z-20 backdrop-blur-md text-white text-[8px]  uppercase font-extrabold px-2 py-1 rounded border ${isVideo ? "bg-black/50 border-white/20" : "bg-white/10 border-white/10"}`}>
                  {isVideo ? currentT.videoBadge : currentT.photoBadge}
                </div>

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 bg-[#009e60] rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-110 transition-transform duration-500">
                      <i className="fa-solid fa-play text-white text-sm ml-1" />
                    </div>
                  </div>
                )}

                <img src={previewImage} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isVideo ? "opacity-60 group-hover:opacity-40" : "opacity-80 group-hover:opacity-100"}`} alt={item.titre} />

                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <p className="text-white  text-xs uppercase font-sans leading-tight" dangerouslySetInnerHTML={{ __html: item.titre }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MODALE LIGHTBOX */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            <button className="absolute top-6 right-6 text-white text-3xl z-[110] hover:text-[#009e60] transition-colors">
              <i className="fa-solid fa-xmark"></i>
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === "VIDEO" ? (
                <iframe
                  src={getEmbedUrl(selectedItem.video) || ""}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={selectedItem.image || getVideoThumbnail(selectedItem.video)} 
                  className="w-full h-full object-contain" 
                  alt={selectedItem.titre} 
                />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white font-sans  uppercase text-lg" dangerouslySetInnerHTML={{ __html: selectedItem.titre }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FifthPartSection;