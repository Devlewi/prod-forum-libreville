/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
//import SectionImageLeftTextRight from "./Components/SectionImageLeftTextRight";
import SimpleHeader from "./SimpleHeader";
import { fetchPhilosophieData } from "../services/api";
import SectionImageLeftTextRightV2 from "./Components/SectionImageLeftTextRightV2";

export default function PhilosophieDuForumUI({ locale }: { locale: string }) {
  const t = useTranslations("Philosophie");
  
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPhilosophieData(locale);
      if (data) {
        setApiData(data);
        console.log(data);
      }
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  // Préparation du contenu (Priorité API > Priorité JSON local)
  const content = {
    header: {
      badge: apiData?.header?.badge || t('header.badge'),
      titre1: apiData?.header?.titre1 || t('header.titre1'),
      titre2: apiData?.header?.titre2 || t('header.titre2'),
      sousTitre: apiData?.header?.sousTitre || t('header.sousTitre'),
    },
    visionSection: {
      badge: apiData?.visionSection?.badge || t('header.badge'), // Fallback sur badge global si vide
      title: apiData?.visionSection?.title || t('content.title'),
      imageUrl: apiData?.visionSection?.imageUrl || "https://static.wikia.nocookie.net/totalwar-ar/images/c/c3/Omar_Bongo.jpg/revision/latest/scale-to-width-down/600",
      imageAlt: apiData?.visionSection?.imageAlt || "Illustration",
      description: apiData?.visionSection?.description ? (
        <div 
          className="text-justify leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: apiData.visionSection.description }} 
        />
      ) : (
        t.rich('content.text', {
          bold: (chunks) => <strong>{chunks}</strong>,
          br: () => <br />
        })
      )
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-extrabold uppercase tracking-widest text-xs">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <>
      <SimpleHeader
        texte1={content.header.badge}
        texte2={content.header.titre1}
        texte3={content.header.titre2}
        texte4={content.header.sousTitre}
      />
        
      <SectionImageLeftTextRightV2
        badge={content.visionSection.badge}
        title={content.visionSection.title}
        imageUrl={content.visionSection.imageUrl}
        imageAlt={content.visionSection.imageAlt}
        description={content.visionSection.description}
      />
    </>
  );
}