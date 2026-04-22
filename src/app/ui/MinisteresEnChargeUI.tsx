/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fetchMinisteresEnChargeData } from "../services/api"; // Changement vers le bon service
import SectionImageLeftTextRightV3 from "./Components/SectionImageLeftTextRightV3";
import SimpleENHeader from "./SimpleENHeader";

export default function MinisteresEnChargeUI({ locale }: { locale: string }) {
  // Changement de la clé de traduction pour "Ministere"
  const t = useTranslations("Ministere");
  
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Appel du service spécifique aux ministères
      const data = await fetchMinisteresEnChargeData(locale);
      if (data) setApiData(data);
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  const content = {
    badge: apiData?.header?.badge || t('header.badge'),
    detailsBadge: apiData?.content?.badge || t('content.badge') || "Institutions",
    titre1: apiData?.header?.titre1 || t('header.titre1'),
    titre2: apiData?.header?.titre2 || t('header.titre2'),
    sousTitre: apiData?.header?.sousTitre || t('header.sousTitre'),
    detailsTitle: apiData?.content?.title || t('content.title'),
    // Fallback alt adapté aux ministères
    imageAlt: apiData?.content?.imageAlt || "Ministères en charge", 
    // Image par défaut si aucune image n'est définie dans WP
    imageUrl: apiData?.content?.imageUrl || "/images/ministere-default.webp",
    description: apiData?.content?.description ? (
      <div 
        className="text-justify leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: apiData.content.description }} 
      />
    ) : (
      // Utilisation du texte de secours défini dans tes fichiers de langue
      t.rich('content.text', {
        bold: (chunks) => <strong>{chunks}</strong>,
        br: () => <br />
      })
    )
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <>
      <SimpleENHeader
        texte1={content.badge}
        texte2={content.titre1}
        texte3={content.titre2}
        texte4={content.sousTitre}
      />
      <SectionImageLeftTextRightV3
        badge={content.detailsBadge} 
        title={content.detailsTitle}
        imageUrl={content.imageUrl}
        imageAlt={''}//content.imageAlt
        description={content.description}
      />
    </>
  );
}