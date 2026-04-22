"use client";

import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import { getTranslation } from "../utils/i18n";
import { getAutresPosts } from "../lib/utils";
import he from "he";
import { usePathname } from "next/navigation";

type Props = {
  article: {
    id: number;
    title: string;
    content: string;
    date: string;
    featured_image: string | null;
  };
  locale: string;
};

export default function AutresDetailClient({ article, locale }: Props) {
  const localeStr = Array.isArray(locale) ? locale[0] : locale || "fr";
  const t = getTranslation(localeStr);
  const autreTitle = getAutresPosts(t);
  const postedon = t.others.publiele;
  const accueil = t.menu.accueil;
  const imagenotfound = t.others.imagenotfound;
  const publications = t.slug?.publications.title;
  const [clientLocale, setClientLocale] = useState<string | null>(null);

  //const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const slugActif: string = parts.length > 1 ? parts[1] : "";

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  // ✅ 1. Extraire images et nettoyer le HTML
  const { cleanedHtml, imageUrls } = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(he.decode(article.content), "text/html");
    const images = Array.from(doc.querySelectorAll("img"));
    const urls = images.map((img) => img.src);

    // Supprimer toutes les balises <img>
    images.forEach((img) => img.remove());

    return {
      cleanedHtml: doc.body.innerHTML,
      imageUrls: urls,
    };
  }, [article.content]);

  // ✅ 2. Visionneuse
  useEffect(() => {
    const imgs = document.querySelectorAll(".extracted-gallery img");

    const handleClick = (e: Event) => {
      const img = e.currentTarget as HTMLImageElement;
      const instance = basicLightbox.create(`
        <img src="${img.src}" class="max-w-full max-h-screen" />
      `);
      instance.show();
    };

    imgs.forEach((img) => img.addEventListener("click", handleClick));

    return () => {
      imgs.forEach((img) => img.removeEventListener("click", handleClick));
    };
  }, [imageUrls]);

  useEffect(() => {
  // Enregistre le locale actuel dans localStorage
  if (locale === "fr" || locale === "en") {
    localStorage.setItem("locale", locale);
    setClientLocale(locale); // mise à jour immédiate
  } else {
    // fallback si jamais locale absent
    const storedLocale = localStorage.getItem("locale");
    if (storedLocale === "fr" || storedLocale === "en") {
      setClientLocale(storedLocale);
    } else {
      setClientLocale("fr");
    }
  }
}, [locale]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Fil d’Ariane */}
      <nav className="text-sm text-gray-500 mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
  {/* Accueil */}
  <Link
    href={`/${clientLocale ?? "fr"}`}
    className="hover:underline inline-flex items-center gap-1"
  >
    <FontAwesomeIcon icon={faHome} />
    {accueil}
  </Link>
  <FontAwesomeIcon icon={faChevronRight} />

  {/* Publications */}
  <Link
    href={`#`}
    className="hover:underline inline-flex items-center gap-1"
  >
    {he.decode(publications)}
  </Link>
  <FontAwesomeIcon icon={faChevronRight} />

  {/* Autre titre */}
  <Link
    href={`/${clientLocale ?? "fr"}/${slugActif}`}
    className="hover:underline inline-flex items-center gap-1"
  >
    {he.decode(autreTitle)}
  </Link>
  <FontAwesomeIcon icon={faChevronRight} />

  {/* Article */}
  <span className="text-red-700 font-medium inline-flex items-center gap-1">
    {he.decode(article.title)}
  </span>
</nav>


      {/* Titre + date */}
      <h1 className="text-4xl font-bold mb-4 text-[#2e73ba]">
        {he.decode(article.title)}
      </h1>
      <p className="text-gray-500 mb-8 flex items-center gap-2">
        <FontAwesomeIcon icon={faClock} />
        {postedon} {formatDate(article.date)}
      </p>


<div className="flex flex-col lg:flex-row gap-10">
  {/* Colonne gauche : Image + Contenu + Galerie */}
  <div className="lg:w-3/3">
    <div className="relative w-full md:h-[700px] rounded-xl shadow-md mb-6 overflow-hidden">
  {article.featured_image ? (
    <img
      src={article.featured_image}
      alt={he.decode(article.title)}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
      {imagenotfound}
    </div>
  )}
</div>


    <div
      className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8"
      dangerouslySetInnerHTML={{ __html: cleanedHtml }}
    />

    {imageUrls.length > 0 && (
      <div className="extracted-gallery grid grid-cols-2 gap-4">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            className="cursor-pointer w-full h-auto rounded-lg shadow hover:opacity-90 transition duration-300"
          />
        ))}
      </div>
    )}
  </div>


  
</div>

    </div>
  );
}
