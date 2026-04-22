/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/utils.ts

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Récupère le titre traduit d'un sous-slug dans la clé 'slug' du JSON de traduction
 * @param t - objet traduction complet (ex: getTranslation(locale))
 * @param parentKey - clé parente dans 'slug' (ex: "actualites")
 * @param slugKey - clé slug recherchée dans subItems (ex: "evenements")
 * @returns Le titre traduit ou undefined si non trouvé
 */
export function getSlugTitleBySlugKey(
  t: any,
  parentKey: string,
  slugKey: string
): string | undefined {
  const parent = t.slug?.[parentKey];
  if (!parent || !Array.isArray(parent.subItems)) return undefined;

  const item = parent.subItems.find((sub: any) => sub.slug === slugKey);
  return item ? item.title : undefined;
}



export function getEventsTitle(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'events' ou 'evenements'
  // On teste les deux cas pour être safe
  const actualites = t.slug?.actualites;
  if (!actualites || !Array.isArray(actualites.subItems)) return "Évènements";

  const eventItem =
    actualites.subItems.find(
      (item: any) => item.slug === "events" || item.slug === "evenements"
    ) || null;

  return eventItem?.title ?? "Évènements";
}

export function getVieSocialeTitle(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'social-life' ou 'vie-sociale'
  // On teste les deux cas pour être safe
  const actualites = t.slug?.actualites;
  if (!actualites || !Array.isArray(actualites.subItems)) return "Vie sociale";

  const socialItem =
    actualites.subItems.find(
      (item: any) => item.slug === "social-life" || item.slug === "vie-sociale"
    ) || null;

  return socialItem?.title ?? "Vie sociale";
}

export function cleanExcerpt(html: string) {
  return html.replace(/\[\&hellip\;\]|\[…\]/g, '').trim();
}


export function getOffreEmploi(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'social-life' ou 'vie-sociale'
  // On teste les deux cas pour être safe
  const carierres = t.slug?.carierres;
  if (!carierres || !Array.isArray(carierres.subItems)) return "Offres d'emploi";

  const socialItem =
    carierres.subItems.find(
      (item: any) => item.slug === "offres-demploi" || item.slug === "vacancies"
    ) || null;

  return socialItem?.title ?? "Offres d'emploi";
}


export function getOffreStage(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'social-life' ou 'vie-sociale'
  // On teste les deux cas pour être safe
  const carierres = t.slug?.carierres;
  if (!carierres || !Array.isArray(carierres.subItems)) return "Offres de stage";

  const socialItem =
    carierres.subItems.find(
      (item: any) => item.slug === "offres-de-stage" || item.slug === "internships"
    ) || null;

  return socialItem?.title ?? "Offres de stage";
}

export function getAppelOffre(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'social-life' ou 'vie-sociale'
  // On teste les deux cas pour être safe  
  const publications = t.slug?.publications;
  const title = t.slug?.publications.subItems[0].title;
  if (!publications || !Array.isArray(publications.subItems)) return `${title}`;

  const socialItem =
    publications.subItems.find(
      (item: any) => item.slug === "avis-dappel-doffre	" || item.slug === "initial-public-offering"
    ) || null;

  return socialItem?.title ?? `${title}`;
}

export function getAutresPosts(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'social-life' ou 'vie-sociale'
  // On teste les deux cas pour être safe
  const publications = t.slug?.publications;
  if (!publications || !Array.isArray(publications.subItems)) return "Autres";

  const socialItem =
    publications.subItems.find(
      (item: any) => item.slug === "autres	" || item.slug === "others"
    ) || null;

  return socialItem?.title ?? "Autres";
}

export function getEtatsFPosts(t: any): string {
  // Recherche dans actualites.subItems l'item dont slug est 'social-life' ou 'vie-sociale'
  // On teste les deux cas pour être safe
  const publications = t.slug?.publications;
  if (!publications || !Array.isArray(publications.subItems)) return "Etats Financiers";

  const socialItem =
    publications.subItems.find(
      (item: any) => item.slug === "etats-financiers" || item.slug === "financial-statements"
    ) || null;

  return socialItem?.title ?? "Etats Financiers";
}


// app/lib/utils.ts ou src/app/lib/utils.ts
// src/app/lib/utils.ts

export const getMessages = async (locale: string) => {
  try {
    // On remonte de lib/ vers app/, puis on entre dans lang/
    return (await import(`../lang/${locale}.json`)).default;
  } catch {
    console.warn(`Langue ${locale} non trouvée, repli sur fr.json`);
    return (await import(`../lang/fr.json`)).default;
  }
};
// app/lib/utils.ts


/**
 * Construit une URL localisée propre sans double slash
 * @param locale - La langue active ('fr' ou 'en')
 * @param slug - Le chemin de destination
 * @returns L'URL formatée /locale/slug
 */
/*
export function getLocalizedLink(locale: string, slug: string): string {
  if (!slug || slug === "/") return `/${locale}`;

  // On nettoie le slug pour enlever les slashs de début ou de fin
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  return `/${locale}/${cleanSlug}`;
}*/

/**
 * Dictionnaire des correspondances de routes pour le SEO multilingue
 */
const ROUTES_MAP: Record<string, { fr: string; en: string }> = {
  "/mediatheque": {
    fr: "/mediatheque",
    en: "/media-library"
  },
  "/actualites": {
    fr: "/actualites",
    en: "/news"
  },
  "/inscription": {
    fr: "/inscription",
    en: "/registration"
  },
  "/contact": {
    fr: "/contact",
    en: "/contact-us"
  },
  // Ajout de la thématique
  "/la-thematique": {
    fr: "/la-thematique",
    en: "/the-theme"
  },
  // Ajout du programme
  "/le-programme": {
    fr: "/le-programme",
    en: "/the-program"
  },
  // Ajout des intervenants
  "/les-intervenants": {
    fr: "/les-intervenants",
    en: "/the-speakers"
  },
  "/philosophie-du-forum": {
  fr: "/philosophie-du-forum",
  en: "/forum-philosophy" // Assure-toi que cela correspond à ton routing Next.js
},
  "/ambition-du-forum": {
  fr: "/ambition-du-forum",
  en: "/forum-ambition" // Assure-toi que cela correspond à ton routing Next.js
},
  "/vision-fondatrice": {
  fr: "/vision-fondatrice",
  en: "/founding-vision" // Assure-toi que cela correspond à ton routing Next.js
},
  "/le-mot-de-la-commissaire-generale": {
    fr: "/le-mot-de-la-commissaire-generale",
    en: "/message-from-the-general-commissione"
  },
  "/le-mot-du-commissaire-general": {
    fr: "/le-mot-du-commissaire-general",
    en: "/the-message-from-the-commissioner-general"
  },
  "/equipe": {
    fr: "/equipe",
    en: "/the-team"
  },
  "/les-partenaires": {
  fr: "/les-partenaires",
  en: "/partners"
},
"/le-palais-des-congres-omar-bongo-ondimba": {
  fr: "/le-palais-des-congres-omar-bongo-ondimba",
  en: "/omar-bongo-ondimba-convention-center"
},
  "/ministeres-en-charge": {
    fr: "/ministeres-en-charge",
    en: "/responsible-agencies"
  },
  "/parties-prenantes": {
    fr: "/parties-prenantes",
    en: "/stakeholders"
  }
};

/**
 * Construit une URL localisée avec traduction du slug si nécessaire
 * @param locale - 'fr' ou 'en'
 * @param slug - Le slug de base (clé FR)
 */
export function getLocalizedLink(locale: string, slug: string): string {
  if (!slug || slug === "/") return `/${locale}`;

  // 1. On s'assure que le slug commence par / pour la recherche dans la map
  const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;

  // 2. On cherche si une traduction existe pour ce slug spécifique
  const translation = ROUTES_MAP[normalizedSlug];
  
  // 3. On sélectionne le bon texte (le slug traduit ou le slug d'origine nettoyé)
  let finalPath: string;
  if (translation) {
    finalPath = locale === "en" ? translation.en : translation.fr;
  } else {
    finalPath = normalizedSlug;
  }

  // 4. Nettoyage final pour éviter les doubles slashes (ex: /en//news -> /en/news)
  const cleanPath = finalPath.replace(/^\/|\/$/g, "");
  
  return `/${locale}/${cleanPath}`;
}


// utils.ts

/**
 * Formate une date en tenant compte des mois envoyés en français par l'API
 * et de la locale active (fr ou en).
 */
export const formatDate = (dateString: string, locale: string): string => {
  if (!dateString) return "";

  // 1. Dictionnaire pour convertir le texte reçu de l'API en index de mois (0-11)
  // On couvre les abréviations WordPress courantes
  const monthToNumber: { [key: string]: number } = {
    'jan': 0, 'janv': 0,
    'fév': 1, 'fevr': 1,
    'mar': 2, 'mars': 2,
    'avr': 3, 'avril': 3,
    'mai': 4,
    'juin': 5,
    'juil': 6,
    'aoû': 7, 'août': 7,
    'sep': 8, 'sept': 8,
    'oct': 9,
    'nov': 10,
    'déc': 11
  };

  try {
    // 2. Nettoyage de la chaîne (ex: "12 Avr. 2026" -> ["12", "avr", "2026"])
    const parts = dateString.toLowerCase().replace('.', '').split(' ');

    let date: Date;

    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const monthText = parts[1];
      const year = parseInt(parts[2], 10);
      
      // On cherche l'index du mois, si on ne trouve pas, on met 0 (Janvier) par défaut
      const monthIndex = monthToNumber[monthText] !== undefined ? monthToNumber[monthText] : 0;
      
      date = new Date(year, monthIndex, day);
    } else {
      // Si le format est déjà ISO (2026-04-09), new Date() fonctionnera
      date = new Date(dateString);
    }

    // 3. Formatage de sortie avec Intl
    if (!isNaN(date.getTime())) {
      const formatter = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // On formate et on met en majuscule (ex: "12 APR 2026")
      return formatter.format(date).replace('.', '').toUpperCase();
    }
    
    return dateString.toUpperCase();
  } catch (e) {
    console.error("Erreur formatage date:", e);
    return dateString;
  }
};


export const decodeHtml = (html: string) => {
  if (typeof window === 'undefined') return html; // Sécurité pour le SSR
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};


