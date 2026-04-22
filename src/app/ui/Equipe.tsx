/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SectionImageLeftTextRight from "./Components/SectionImageLeftTextRight";
import SimpleHeader from "./SimpleHeader";
import { fetchEquipeData } from "../services/api"; // Assure-toi que le service est exporté ici

export default function Equipe({ locale }: { locale: string }) {
  const t = useTranslations("Equipe");
  
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Appel au service que nous avons défini avec les slugs 'lequipe' / 'the-team'
      const data = await fetchEquipeData(locale);
      if (data) {
        setApiData(data);
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
    directionSection: {
      badge: apiData?.header?.badge || t('header.badge'), 
      title: apiData?.content?.title || t('content.title'),
      imageUrl: apiData?.content?.imageUrl || "/images/2150917194.jpg",
      description: apiData?.content?.description ? (
        <div 
          className="text-justify leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: apiData.content.description }} 
        />
      ) : (
        t.rich('content.description', {
          bold: (chunks) => <strong>{chunks}</strong>,
          br: () => <br />
        })
      )
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-serif uppercase tracking-widest text-xs">
          Chargement ...
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

      <SectionImageLeftTextRight
        badge={content.directionSection.badge}
        title={content.directionSection.title}
        imageUrl={content.directionSection.imageUrl}
        imageAlt={content.directionSection.title}
        description={content.directionSection.description}
      />
    </>
  );
}