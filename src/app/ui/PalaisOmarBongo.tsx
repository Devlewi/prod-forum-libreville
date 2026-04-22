/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import ImageGallery from "./Components/ImageGallery";
import SectionImageLeftTextRight from "./Components/SectionImageLeftTextRight";
import SimpleHeader from "./SimpleHeader";
import Spinner from "./Spinner"; 
import { fetchPalaisData } from "../services/api";

export default function PalaisOmarBongo({ locale }: { locale: string }) {
  const t = useTranslations("Palais");
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await fetchPalaisData(locale);
      if (data) setApiData(data);
      setIsLoading(false);
    }
    loadData();
  }, [locale]);

  if (isLoading) return <Spinner />;

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
      imageUrl: apiData?.presentation?.imageUrl || "/images/slide-3-1200.webp",
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
    gallery: {
      // RÉCUPÉRATION DU BADGE SPÉCIFIQUE À LA GALERIE
      badge: apiData?.gallery?.badge || t('gallery.badge'), 
      title: apiData?.gallery?.title || t('gallery.title'),
      images: apiData?.gallery?.images?.length > 0 ? apiData.gallery.images : [
        {
          src: "/images/slide-4-1200.webp",
          alt: "Auditorium Principal",
          label: "Auditorium Principal"
        },
        {
          src: "/images/slide-1-1200.webp",
          alt: "Salon VIP",
          label: "Salons VIP & Networking"
        }
      ]
    }
  };

  return (
    <>
      <SimpleHeader
        texte1={content.header.badge}
        texte2={content.header.titre1}
        texte3={content.header.titre2}
        texte4={content.header.sousTitre}
      />

      <SectionImageLeftTextRight
        badge={content.presentation.badge}
        title={content.presentation.title}
        imageUrl={content.presentation.imageUrl}
        imageAlt={content.presentation.title}
        description={content.presentation.description}
      />

      {content.gallery.images.length > 0 && (
        <ImageGallery
          badge={content.gallery.badge} // PASSAGE DU BADGE CI-DESSOUS
          title={content.gallery.title}
          images={content.gallery.images}
        />
      )}
    </>
  );
}