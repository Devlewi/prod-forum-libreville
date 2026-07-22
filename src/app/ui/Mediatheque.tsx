/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

import MediaGrid from "./Components/MediaGrid";
import SimpleHeader from "./SimpleHeader";
import { fetchMedias, MediaItem } from "../services/api";

const getYouTubeThumbnail = (url: string | null) => {
  if (!url) return "/images/placeholder-video.jpg";
  
  // Cette Regex capture l'ID après v=, embed/, youtu.be/ ou shorts/
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[1].length === 11) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return "/images/placeholder-video.jpg";
};

export default function Mediatheque() {
  const t = useTranslations("Mediatheque");
  const locale = useLocale();

  // --- ÉTATS ---
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      /** * OPTION 1 : On récupère tout d'un coup. 
       * Le backend ignore maintenant page/perPage car on a mis -1 en PHP,
       * mais on garde des valeurs par défaut pour la sécurité.
       */
      const data = await fetchMedias(locale, 1, 100);

      if (data && data.items) {
        const formattedItems = data.items.map((item: MediaItem) => {
          const isVideo = item.media_details.type === "VIDEO";
          let finalThumbnail = item.media_details.thumbnail;
          
          if (isVideo && !finalThumbnail) {
            finalThumbnail = getYouTubeThumbnail(item.media_details.video_url);
          }

          // Nettoyage des caractères spéciaux WordPress
          const cleanTitle = item.media_details.title
            .replace(/&rsquo;/g, "'")
            .replace(/&nbsp;/g, " ");

          return {
            id: item.id,
            title: cleanTitle,
            // On garde les labels fixes pour que le filtrage JS dans MediaGrid soit stable
            type: isVideo ? "Vidéo" : "Photo", 
            date: item.media_details.date,
            thumbnail: finalThumbnail,
            category: item.media_details.category,
            videoUrl: item.media_details.video_url
          };
        });
        
        setItems(formattedItems);
      }
      setLoading(false);
    }

    loadData();
  }, [locale]);

  return (
    <>
      <SimpleHeader 
        texte1={t('header.badge')} 
        texte2={t('header.titre1')} 
        texte3={t('header.titre2')} 
        texte4={t('header.sousTitre')}
      />

      {loading ? (
        <div className="flex flex-col justify-center items-center py-32">
          <div className="w-12 h-12 border-4 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500 font-serif">{t('loading')}</p>
        </div>
      ) : (
        <div className="pb-20">
            {items.length > 0 ? (
                /* MediaGrid recevra TOUS les items et gérera le filtrage/recherche en local */
                <MediaGrid items={items} />
            ) : (
                <div className="text-center py-20 text-gray-400 font-serif">
                    <p>{t('noContent')}</p>
                </div>
            )}
        </div>
      )}
    </>
  );
}