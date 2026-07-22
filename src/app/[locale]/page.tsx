/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import AnimatedSections from "../ui/AnimatedSections";
//import { getMessages } from "@/app/lib/utils"; // Assure-toi que le chemin est correct

type ParamsType = { locale: string | string[] };

/**
 * GENERATE METADATA
 * Utilise le JSON local pour le SEO de la page d'accueil
 */

//const siteDomain =  || "";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  // URL de base (Priorité au domaine final pour éviter les erreurs 403/cache)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.forumlibreville.org";
  
  // CORRECTION : On est en anglais SEULEMENT si le paramètre est 'en'
  const isActuallyEn = locale === "en";

  const content = {
    // Si c'est 'en' -> Texte anglais, SINON (fr ou autre) -> Texte français
    title: isActuallyEn ? "FORUM LIBREVILLE | HOME" : "FORUM LIBREVILLE | ACCUEIL",
    description: isActuallyEn 
      ? "An international forum bringing together decision-makers, businesses, and institutions."
      : "Forum international réunissant décideurs, entreprises et institutions",
  };

  const ogImageUrl = `${baseUrl}/fr/images/og-image.png`;

  return {
    title: content.title,
    description: content.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/fr`, // Français par défaut pour les moteurs de recherche
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `${baseUrl}/${locale}`,
      siteName: "Forum Libreville",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
      // CORRECTION : locale OpenGraph
      locale: isActuallyEn ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [ogImageUrl],
    },
  };
}
/*
export async function generateMetadata({ params }: { params: Promise<any> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "fr";
  
  const messages = await getMessages(locale);
  
  const siteName = messages.Metadata?.siteName || "Forum de Libreville";
  const pageSubtitle = locale === "en" ? "Home" : "Accueil";
  
  const fullTitle = `${siteName} | ${pageSubtitle}`;
  const description = messages.Metadata?.description || "Forum international réunissant décideurs, entreprises et institutions.";

  return {
    title: fullTitle,
    description: description,
    openGraph: {
      title: fullTitle,
      description: description,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://forum-libreville.com",
      siteName: siteName,
      type: "website",
      locale: locale,
      images: [
        {
          url: "/images/forum-cover.png",
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
  };
}
*/
/**
 * HOME PAGE
 * Récupère les données depuis l'endpoint personnalisé de WordPress
 */
export default async function Home({ params }: { params: Promise<ParamsType> }) {
  const resolvedParams = await params;
  
  // Normalisation de la locale (gestion si c'est un tableau ou un string)
  const localeStr = Array.isArray(resolvedParams.locale) 
    ? resolvedParams.locale[0] 
    : resolvedParams.locale || "fr";

  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/homepage/data?lang=${localeStr}`;

  try {
    const res = await fetch(apiUrl, { 
      next: { revalidate: 60 } // Revalidation ISR toutes les minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch homepage data: ${res.status}`);
    }

    const data = await res.json();

    // On passe les données WordPress au composant client
    return <AnimatedSections data={data} />;

  } catch (error) {
    console.error("Erreur chargement Home Page API:", error);
    
    // Fallback : on peut retourner le composant vide ou avec des données par défaut
    return <AnimatedSections data={null} />;
  }
}