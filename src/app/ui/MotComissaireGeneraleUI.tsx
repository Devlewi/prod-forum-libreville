/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
//import SectionImageLeftTextRight from "./Components/SectionImageLeftTextRight";
import SimpleHeader from "./SimpleHeader";
import { fetchMotCommissaireData } from "../services/api";
//import SectionImageLeftTextRightV2 from "./Components/SectionImageLeftTextRightV3";
import SectionImageLeftTextRightV3 from "./Components/SectionImageLeftTextRightV3";

export default function MotComissaireGeneraleUI({ locale }: { locale: string }) {
  const t = useTranslations("MotCommissaire");
  
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchMotCommissaireData(locale);
      if (data) setApiData(data);
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  const content = {
    badge: apiData?.header?.badge || t('header.badge'),
    detailsBadge: apiData?.content?.badge || t('content.badge') || "Perspectives",
    titre1: apiData?.header?.titre1 || t('header.titre1'),
    titre2: apiData?.header?.titre2 || t('header.titre2'),
    sousTitre: apiData?.header?.sousTitre || t('header.sousTitre'),
    detailsTitle: apiData?.content?.title || t('content.title'),
    // RÉCUPÉRATION DU CHAMP ALT (Nina Abouna...)
    imageAlt: apiData?.content?.imageAlt || "Commissaire Générale", 
    imageUrl: apiData?.content?.imageUrl || "/images/commissaire.webp",
    description: apiData?.content?.description ? (
      <div 
        className="text-justify leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: apiData.content.description }} 
      />
    ) : (
      t.rich('content.text', {
        bold: (chunks) => <strong>{chunks}</strong>,
        br: () => <br />
      })
    )
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <>
      <SimpleHeader
        texte1={content.badge}
        texte2={content.titre1}
        texte3={content.titre2}
        texte4={content.sousTitre}
      />
      <SectionImageLeftTextRightV3
        badge={content.detailsBadge} 
        title={content.detailsTitle}
        imageUrl={apiData?.content?.imageUrl || "/images/commissaire.webp"}
        imageAlt={content.imageAlt}
        description={content.description}
      />
    </>
  );
}