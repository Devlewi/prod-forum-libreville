/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SectionImageLeftTextRight from "./Components/SectionImageLeftTextRight";
import SimpleHeader from "./SimpleHeader";
import { fetchThematiqueData } from "../services/api"; // Importe ta nouvelle fonction

export default function Thematique({ locale }: { locale: string }) {
  const t = useTranslations("Thematique");
  
  // --- ÉTATS ---
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- CHARGEMENT DES DONNÉES WP ---
  useEffect(() => {
    async function loadData() {
      const data = await fetchThematiqueData(locale);
      //console.warn(data);
      if (data) {
        setApiData(data);
      }
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  // --- LOGIQUE DE FALLBACK ---
  // On utilise les données de l'API si elles existent, sinon on prend le JSON local
  const content = {
    badge: apiData?.header?.badge || t('header.badge'),
    titre1: apiData?.header?.titre1 || t('header.titre1'),
    titre2: apiData?.header?.titre2 || t('header.titre2'),
    sousTitre: apiData?.header?.sousTitre || t('header.sousTitre'),
    detailsBadge: apiData?.details?.badge || t('details.badge'),
    detailsTitle: apiData?.details?.title || t('details.title'),
    // Pour la description, si c'est l'API on affiche le HTML, si c'est le JSON on utilise t.rich
    description: apiData?.details?.description ? (
      <div 
        className="text-justify leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: apiData.details.description }} 
      />
    ) : (
      t.rich('details.description', {
        bold: (chunks) => <strong>{chunks}</strong>,
        br: () => <br />
      })
    )
  };

  // Optionnel : petit squelette de chargement
  if (isLoading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-pulse text-slate-400 font-serif uppercase tracking-widest text-xs">Chargement...</div>
    </div>;
  }

  return (
    <>
      {/* En-tête de la page */}
      <SimpleHeader
        texte1={content.badge}
        texte2={content.titre1}
        texte3={content.titre2}
        texte4={content.sousTitre}
      />

      {/* Section thématique détaillée */}
      <SectionImageLeftTextRight
        badge={content.detailsBadge}
        title={content.detailsTitle}
        imageUrl={apiData?.details?.imageUrl || "/images/slide-5-1200.webp"}
        imageAlt={content.detailsTitle}
        description={content.description}
      />
    </>
  );
}