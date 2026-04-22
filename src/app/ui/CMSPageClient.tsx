/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import { faChevronRight, faFilePen, faHome, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import he from "he";
import { usePathname } from "next/navigation";

//import SubtleConfetti from "./SubtleConfetti";

type Props = {
  page: any;
  imageData: any;
  locale: string;
  t: any;
};

export default function CMSPageClient({ page, imageData, locale, t }: Props) {
  const [loading, setLoading] = useState(true);
  const [clientLocale, setClientLocale] = useState<string | null>(null);

  const pathname = usePathname(); // Récupère le chemin d'URL actuel

  const middleLink = (() => {
    if (
      pathname?.includes("unsollicited-application") ||
      pathname?.includes("candidature-spontanee")
    ) {
      return {
        label: he.decode(t.slug?.carierres?.title ?? "Carrières"),
        href: "#",
      };
    }

    if (
      pathname?.includes("mission") ||
      pathname?.includes("mission-en") ||
      pathname?.includes("vision") ||
      pathname?.includes("vision-en") ||
      pathname?.includes("shareholders") ||
      pathname?.includes("actionnaires") ||
      pathname?.includes("organization") ||
      pathname?.includes("organisation")
    ) {
      return {
        label: he.decode(t.menu?.societe ?? "Société"),
        href: "#",
      };
    }

    if (
      pathname?.includes("hotel-hilton") ||
      pathname?.includes("chc-complex-shopping-mall") ||
      pathname?.includes("centre-commercial-du-complexe-chc") ||
      pathname?.includes("projets-de-developpement") ||
      pathname?.includes("development-projects")
    ) {
      return {
        label: he.decode(t.menu?.portefeuille ?? "Portefeuille"),
        href: "#",
      };
    }

    if (
      pathname?.includes("management-of-tourism-and-leisure-establishments") ||
      pathname?.includes("gestion-detablissements-de-tourisme-et-loisirs") ||
      pathname?.includes("etudes-et-recherche") ||
      pathname?.includes("studies-and-research")
    ) {
      return {
        label: he.decode(t.menu?.metiers ?? "Métiers"),
        href: "#",
      };
    }

    if (
      pathname?.includes("renovation-du-hilton-hotel-de-yaounde") ||
      pathname?.includes("renovation-of-hilton-hotel-yaounde") ||
      pathname?.includes("transformation-du-centre-commercial") ||
      pathname?.includes("shopping-mall-transformation") ||
      pathname?.includes("construction-hotel-5-etoiles-kribi") ||
      pathname?.includes("construction-of-5-star-hotel-in-kribi") ||
      pathname?.includes("entree-en-bourse") ||
      pathname?.includes("initial-public-offering")||
      pathname?.includes("autres-projets") ||
      pathname?.includes("other-projects")
    ) {
      return {
        label: he.decode(t.menu?.projets ?? "Projets"),
        href: "#",
      };
    }

    return null;
  })();

  //const { locale } = useParams();
  //const searchParams = useSearchParams();
  //const pathname = usePathname();
  //const parts = pathname.split('/').filter(Boolean);
  //const slugActif: string = parts.length > 1 ? parts[1] : "";

  useEffect(() => {
    // Simule un chargement pendant 1.5s (à remplacer selon ta logique)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  if (loading) {
    // Skeleton placeholder
    return (
      <main className="container mx-auto px-4 py-12 space-y-8">
        <div className="w-full h-[300px] md:h-[400px] bg-gray-200 animate-pulse rounded-xl shadow-lg" />
        <div className="text-center space-y-2">
          <div className="h-6 bg-gray-200 animate-pulse mx-auto w-32 rounded" />
          <div className="h-10 bg-gray-200 animate-pulse mx-auto w-64 rounded" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2"></div>
          <div className="lg:col-span-8 space-y-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
            <div className="h-6 bg-gray-200 animate-pulse rounded" />
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </main>
    );
  }

  // Affichage normal quand les données sont chargées max-width: 1100px;
  return (
    <>
    {/*<SubtleConfetti />  */}
    <main className="containe mx-auto px-0 py-0">

      {/* Image en bannière pleine largeur */}
      {imageData && (
        <div
          className="relative w-full h-[300px] md:h-[450px] overflow-hidden mb-12"
          style={{
            backgroundImage: `url(${imageData.source_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dégradé en overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 z-10" /> */}

          {/* Texte superposé */}
          <div className="relative z-20 flex flex-col justify-center items-center h-full text-center px-4">
            {/* Fil d’Ariane */}
            <nav className="text-sm text-white mb-4 flex flex-wrap justify-center items-center gap-2 text-center mt-[-30px]">
  <Link
    href={`/${clientLocale ?? "fr"}`}
    className="hover:underline flex items-center gap-1"
  >
    <FontAwesomeIcon icon={faHome} />
    {t.menu.accueil}
  </Link>

  {middleLink && (
    <>
      <FontAwesomeIcon icon={faChevronRight} />
      <Link href={middleLink.href} className="hover:underline">
        {middleLink.label}
      </Link>
    </>
  )}

  <FontAwesomeIcon icon={faChevronRight} />
  <span
    className="text-red-700 font-extrabold break-words"
    dangerouslySetInnerHTML={{ __html: page.title.rendered }}
  />
</nav>


            {/* Titre de la page */}
            <h1
              className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl text-center"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
          </div>
        </div>
      )}

      <div className="lg:px-4 lg:ml-24 lg:mr-24 ml-0 mr-0 px-2">

        {/* Titre centré px-4 lg:ml-24 lg:mr-24 ml-2 mr-2*/}
        <h1
  className="text-[25px] lg:text-[30px] font-bold text-center mb-4 text-white rounded-[13px] px-5 py-3 flex flex-wrap items-center justify-center gap-2 bg-gradient-to-r from-[#0076dd] to-[#005bb5] shadow-md"
  style={{ marginTop: -30 }}
>
  <FontAwesomeIcon icon={faLayerGroup} />
  <span className="break-words" dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
</h1>


        {/* Contenu en 2 colonnes sur desktop */}
        <div className="grid grid-cols-1  gap-8">
          <div className="lg:col-span-2"></div>
          <div className="lg:col-span-8">
            <div
              className="prose prose-lg max-w-none text-justify text-[14px] text-gray-800"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}              
            />
            

            {["candidature-spontanee", "unsollicited-application"].includes(
              page.slug
            ) && (
              <div className="mt-[-30px]">
                <h2 className="text-2xl font-bold mb-4 text-[#2e73ba] text-center">
                    <FontAwesomeIcon icon={faFilePen} className="mr-1"/>
                  {locale === "fr"
                    ? "Formulaire de Candidature Spontanée"
                    : "Unsollicited application Form"}
                </h2>
              </div>
            )}
          </div>
          <div className="lg:col-span-2"></div>
        </div>
      </div>
    </main>
    </>
  );
}
