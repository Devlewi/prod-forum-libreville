/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SectionImageLeftTextRight from "./Components/SectionImageLeftTextRight";
import SimpleHeader from "./SimpleHeader";
import Spinner from "./Spinner"; 
import { fetchPartenairesData } from "../services/api";
//import LogoGrid from "./Components/LogoGrid";
import HebergementGrid from "./Components/HebergementGrid";
import SponsorsGrid from "./Components/SponsorsGrid";

export default function Partenaires({ locale }: { locale: string }) {
  const t = useTranslations("Partenaires");
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPartenairesData(locale);
      if (data) setApiData(data);
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  if (isLoading) return <Spinner />;

  // Construction dynamique du contenu
  const content = {
    header: {
      badge: apiData?.header?.badge || t('header.badge'),
      titre1: apiData?.header?.titre1 || t('header.titre1'),
      titre2: apiData?.header?.titre2 || t('header.titre2'),
      sousTitre: apiData?.header?.sousTitre || t('header.sousTitre'),
    },
    presentation: {
      badge: apiData?.presentation?.badge || t('presentation.badge'),
      title: apiData?.presentation?.title || t('presentation.title'),
      imageUrl: apiData?.presentation?.imageUrl || "/images/18516.jpg",
      description: apiData?.presentation?.description ? (
        <div 
          className="text-justify leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: apiData.presentation.description }} 
        />
      ) : (
        t.rich('presentation.description', {
          bold: (chunks) => <strong>{chunks}</strong>,
          br: () => <br />
        })
      )
    },
    // Grille 1 : Partenaires Stratégiques (ANPI, FEG...)
    grid: {
      title: apiData?.grid?.title || t('grid.title'),
      titleAccent: apiData?.grid?.titleAccent || t('grid.titleAccent'),
      description: apiData?.grid?.description || t('grid.description'),
      logos: apiData?.grid?.logos?.length > 0 ? apiData.grid.logos : []
    },
    // Grille 2 : Hébergement (Radisson, Crystal...)
    hebergement: {
      title: apiData?.hebergement?.title || "Hébergement",
      badge: apiData?.hebergement?.badge || "Nos partenaires hôteliers",
      description: apiData?.hebergement?.description || "",
      logos: apiData?.hebergement?.hotels || [] // Ce tableau contient src, alt et surtout l'URL cliquable
    },
    // Grille 3 : Sponsors (NOUVEAU)
    sponsors: {
      title: apiData?.sponsors?.title || "Sponsors",
      badge: apiData?.sponsors?.badge || "Nos soutiens",
      description: apiData?.sponsors?.description || "",
      logos: apiData?.sponsors?.items || []
    }
  };

  return (
    <>
      {/* En-tête de la page */}
      <SimpleHeader
        texte1={content.header.badge}
        texte2={content.header.titre1}
        texte3={content.header.titre2}
        texte4={content.header.sousTitre}
      />

      {/* Section de présentation détaillée (Texte + Image) */}
      <SectionImageLeftTextRight
        badge={content.presentation.badge}
        title={content.presentation.title}
        imageUrl={content.presentation.imageUrl}
        imageAlt={content.presentation.title}
        description={content.presentation.description}
      />

      {/* 1. Affichage des Partenaires Stratégiques */}
      {/*
      {content.grid.logos.length > 0 && (
        <LogoGrid
          title={content.grid.title}
          titleAccent={content.grid.titleAccent}
          description={content.grid.description}
          logos={content.grid.logos}
        />
      )}

      */}
      {/* 2. Affichage des Partenaires Hébergement (Radisson, Crystal) */}
      {/* On réutilise le même LogoGrid pour la cohérence visuelle */}
      {content.hebergement.logos.length > 0 && (
        <div className="pb-20"> 
            <HebergementGrid
              title={content.hebergement.title}
              titleAccent={content.hebergement.badge}
              description={content.hebergement.description}
              logos={content.hebergement.logos}
            />
        </div>
      )}

      {/* 3. Affichage des Sponsors (Duplication de la logique Hébergement) */}
      {content.sponsors.logos.length > 0 && (
        <div className="pb-20"> 
            <SponsorsGrid
              title={content.sponsors.title}
              titleAccent={content.sponsors.badge}
              description={content.sponsors.description}
              logos={content.sponsors.logos}
            />
        </div>
      )}
    </>
  );
}