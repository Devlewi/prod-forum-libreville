/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/api.ts

/**
 * --- INTERFACES MÉDIATHÈQUE ---
 * Ces interfaces correspondent à la structure JSON de ton API WordPress
 */

export interface MediaItem {
  id: number;
  media_details: {
    type: "IMAGE" | "VIDEO";
    title: string;
    thumbnail: string;
    video_url: string | null;
    category: string;
    date: string;
  };
}

export interface MediaPagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export interface MediaResponse {
  items: MediaItem[];
  pagination: MediaPagination;
}

// Interface pour les données du formulaire
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Interface pour la réponse du formulaire
export interface ContactResponse {
  success: boolean;
  message: string;
}

// Interface pour le typage dans le composant
export interface ContactData {
  header: {
    badge: string;
    titre1: string;
    titre2: string;
    sousTitre: string;
  };
  content: {
    badge: string;
    title: string;
    description: string;
  };
}
// Interface pour les données du formulaire d'inscription
export interface InscriptionFormData {
  civilite: string;
  rang: string;
  nom: string;
  prenom: string;
  email: string;
  organisation: string;
  secteur: string;
  nationalite: string;
  pays: string;
  ville: string;
  whatsapp: string;
  photo: File | null; // Pour le fichier image
}

export interface InscriptionResponse {
  success: boolean;
  message: string;
  id?: number;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  categories: string[];
  date: string;
  image: string;
  slug: string;
}

export interface ArticlesResponse {
  articles: Article[];
  total_posts: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}


// Interface pour le détail d'un article
export interface ArticleDetail {
  id: number;
  title: string;
  content: string;
  date: string;
  featured_image: string;
  categories?: string[]; // Ton PHP ne le renvoie pas encore, mais c'est bien de prévoir
}

export interface ProgramCard {
  numero: string;
  titre: string;
  tag: string;
  description: string;
  footer: string;
  bgcolor: string;
  hovershadow: string;
}

export interface ProgramData {
  header: {
    badge: string;
    titre1: string;
    titre2: string;
    sousTitre: string;
  };
  details: {
    badge: string;
    titre: string;
    sousTitre: string;
  };
  cards: ProgramCard[];
}


/** --- INTERFACES INTERVENANTS --- */

export interface SpeakerCard {
  numero: string;
  nom: string;
  role: string;
  organization: string;
  image: string; // On part du principe que tu as réglé ACF sur "URL de l'image"
  categorie: string;
  color: string;
}

export interface IntervenantsData {
  header: {
    badge: string;
    titre1: string;
    titre2: string;
    sousTitre: string;
  };
  details: {
    badge: string;
    titre: string;
    sousTitre: string;
  };
  speakers: SpeakerCard[];
}

/**
 * --- CONFIGURATION ---
 */

// L'URL est récupérée depuis ton fichier .env.local
// Exemple : NEXT_PUBLIC_BACKEND_API_URL=http://localhost/forumlibreville/admin
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * --- SERVICES ---
 */

/**
 * Récupère les ressources multimédias filtrées par langue et paginées
 * @param locale 'fr' ou 'en'
 * @param page numéro de la page (défaut: 1)
 * @param perPage nombre d'éléments par page (défaut: 9)
 */

export async function fetchMedias(
  locale: string,
  page: number = 1,
  perPage: number = 9
): Promise<MediaResponse | null> {
  try {
    // Construction de l'URL avec les paramètres de requête
    const url = `${BASE_URL}/wp-json/custom/v1/medias?lang=${locale}&page=${page}&per_page=${perPage}`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache Next.js (ISR) : actualisation toutes les 60 secondes
    });

    if (!res.ok) {
      console.error(`[API Error] fetchMedias status: ${res.status}`);
      return null;
    }

    const data: MediaResponse = await res.json();
    return data;
    
  } catch (error) {
    console.error("Erreur lors de la récupération des médias (fetchMedias):", error);
    return null;
  }
}


/**
 * Récupère un média spécifique par son ID (si nécessaire pour une page de détail)
 */
export async function fetchMediaById(
  id: string | number,
  locale: string
): Promise<MediaItem | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/wp-json/custom/v1/medias/${id}?lang=${locale}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Erreur fetchMediaById:", error);
    return null;
  }
}



/**
 * Envoie le formulaire de contact au Backend WordPress
 * @param data Objet contenant name, email, subject, message
 */
export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const res = await fetch(`${BASE_URL}/wp-json/custom/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Une erreur est survenue lors de l'envoi.");
    }

    return {
      success: true,
      message: result.message || "Message envoyé avec succès."
    };
  } catch (error: any) {
    console.error("Erreur sendContactForm:", error);
    return {
      success: false,
      message: error.message || "Impossible de contacter le serveur."
    };
  }
}




/**
 * Envoie le formulaire d'inscription au Backend WordPress
 * Note: On utilise FormData car le formulaire contient un fichier (photo)
 */
export async function sendInscriptionForm(data: InscriptionFormData): Promise<InscriptionResponse> {
  try {
    const formData = new FormData();

    // On boucle sur l'objet pour remplir le FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    const res = await fetch(`${BASE_URL}/wp-json/custom/v1/inscription`, {
      method: "POST",
      // Note: Ne PAS définir de Content-Type header ici, 
      // le navigateur le fera automatiquement avec le boundary pour FormData
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Erreur lors de l'inscription.");
    }

    return {
      success: true,
      message: result.message || "Inscription enregistrée avec succès.",
      id: result.id
    };
  } catch (error: any) {
    console.error("Erreur sendInscriptionForm:", error);
    return {
      success: false,
      message: error.message || "Erreur de connexion avec le serveur."
    };
  }
}








/**
 * Récupère les articles avec recherche, filtrage et pagination
 */
export async function fetchCategories(lang: string): Promise<{label: string, value: string}[]> {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return [];

  try {
    const res = await fetch(`${BASE_URL}/wp-json/forum/v1/categories?lang=${lang}`, {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return [];

    const data = await res.json();

    // TRANSFORMATION ICI :
    // Si data est un objet {"0": {...}, "1": {...}}, on le convertit en [{...}, {...}]
    return Object.values(data); 
    
  } catch (error) {
    console.error("Erreur fetchCategories:", error);
    return [];
  }
}

export async function fetchArticles(params: {
  lang: string;
  page: number;
  search?: string;
  categories?: string[];
}): Promise<ArticlesResponse> {
  const { lang, page, search, categories } = params;

  if (!BASE_URL) {
    console.error("L'URL de l'API n'est pas définie dans .env.local");
    return { articles: [], total_pages: 1, total_posts: 0, current_page: 1, per_page: 8 };
  }

  try {
    // Changement ici : harmonisation avec /wp-json/custom/v1/ si c'est ce que tu as mis en PHP
    // Si ton PHP utilise register_rest_route('forum/v1', ...), garde forum/v1
    let url = `${BASE_URL}/wp-json/forum/v1/articles?lang=${lang}&page=${page}`;
    
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (categories && categories.length > 0) url += `&category=${encodeURIComponent(categories.join(','))}`;

    console.log("🚀 Tentative d'appel API Articles :", url);

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`[API Error] Status: ${res.status}`, errorText);
      // Au lieu de throw, on retourne une structure vide pour éviter le crash UI
      return { articles: [], total_pages: 1, total_posts: 0, current_page: 1, per_page: 8 };
    }

    return await res.json();

  } catch (error) {
    console.error("Erreur réseau fetchArticles:", error);
    return { articles: [], total_pages: 1, total_posts: 0, current_page: 1, per_page: 8 };
  }
}



/**
 * Récupère un article unique par son slug et sa langue
 */
export async function fetchArticleBySlug(
  slug: string,
  lang: string
): Promise<ArticleDetail | null> {
  if (!BASE_URL) return null;

  try {
    const url = `${BASE_URL}/wp-json/custom/v1/articlebyslug?slug=${slug}&lang=${lang}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Cache ISR
    });

    if (!res.ok) {
      console.error(`[API Error] fetchArticleBySlug status: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article (fetchArticleBySlug):", error);
    return null;
  }
}




/**
 * Récupère les données de la page Thématique via ACF
 * @param locale 'fr' ou 'en'
 */
export async function fetchThematiqueData(locale: string) {
  if (!BASE_URL) return null;

  try {
    const slug = locale === 'fr' ? 'la-thematique' : 'the-theme'; 
    // On ajoute &_embed pour récupérer les détails de l'image
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    // On extrait l'URL de l'image à partir de l'objet "_embedded"
    const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      header: {
        badge: page.acf.badge,
        titre1: page.acf.titre_1,
        titre2: page.acf.titre_2,
        sousTitre: page.acf.sous_titre,
      },
      details: {
        badge: page.acf.details_badge,
        title: page.acf.details_titre,
        description: page.acf.details_description,
        imageUrl: featuredImage // L'URL est maintenant ici !
      }
    };
  } catch (error) {
    console.error("Erreur fetchThematiqueData:", error);
    return null;
  }
}


/**
 * Récupère les données de la page Philosophie via ACF
 * @param locale 'fr' ou 'en'
 */
export async function fetchPhilosophieData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    // Slugs correspondants à tes URLs WordPress
    const slug = locale === 'fr' ? 'ambition-du-forum' : 'forum-ambition'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      header: {
        badge: page.acf.badge,
        titre1: page.acf.titre_1,
        titre2: page.acf.titre_2,
        sousTitre: page.acf.sous_titre,
      },
      visionSection: {
        badge: page.acf.details_badge, // Si tu as un badge de section
        title: page.acf.details_titre,
        description: page.acf.details_description,
        imageUrl: featuredImage || page.acf.image_alternative, // Fallback image
        imageAlt: page.featured_image_alt || "Illustration"
      }
    };
  } catch (error) {
    console.error("Erreur fetchPhilosophieData:", error);
    return null;
  }
}

/**
 * Récupère les données de la page Programme via ACF (Groupe + Répéteur)
 * @param locale 'fr' ou 'en'
 */
export async function fetchProgramData(locale: string): Promise<ProgramData | null> {
  if (!BASE_URL) return null;

  try {
    // Gestion du slug selon la langue
    const slug = locale === 'fr' ? 'le-programme' : 'the-program'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    // Extraction sécurisée des données ACF
    return {
      header: {
        badge: page.acf.badge,
        titre1: page.acf.titre_1,
        titre2: page.acf.titre_2,
        sousTitre: page.acf.sous_titre,
      },
      details: {
        badge: page.acf.details_badge,
        titre: page.acf.details_titre,
        sousTitre: page.acf.details_sous_titre,
      },
      // On accède au groupe 'programsection' puis au répéteur 'details_card'
      cards: page.acf.programsection?.details_card || []
    };
  } catch (error) {
    console.error("Erreur fetchProgramData:", error);
    return null;
  }
}


export async function fetchIntervenantsData(locale: string): Promise<IntervenantsData | null> {
  if (!BASE_URL) return null;

  try {
    const slug = locale === 'fr' ? 'les-intervenants' : 'the-speakers'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;

    const pages = await res.json();
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    // Traitement des speakers pour transformer les IDs d'images en URLs
    const rawSpeakers = page.acf.speakerssection?.details_card || [];
    
    const speakersWithImages = await Promise.all(rawSpeakers.map(async (s: any) => {
      let imageUrl = s.image;

      // Si l'image est un nombre (ID), on fait un fetch rapide pour avoir l'URL
      if (typeof s.image === 'number') {
        try {
          const mediaRes = await fetch(`${BASE_URL}/wp-json/wp/v2/media/${s.image}`);
          const mediaData = await mediaRes.json();
          imageUrl = mediaData.source_url; // Récupère l'URL réelle
        } catch (e) {
          imageUrl = ""; // Fallback
        }
      }

      return {
        ...s,
        image: imageUrl
      };
    }));

    return {
      header: {
        badge: page.acf.badge || "",
        titre1: page.acf.titre_1 || "",
        titre2: page.acf.titre_2 || "",
        sousTitre: page.acf.sous_titre || "",
      },
      details: {
        badge: page.acf.details_badge || "",
        titre: page.acf.details_titre || "",
        sousTitre: page.acf.details_sous_titre || "",
      },
      speakers: speakersWithImages
    };
  } catch (error) {
    console.error("Erreur fetchIntervenantsData:", error);
    return null;
  }
}

/**
 * Récupère les données de la page Mot de la Commissaire via ACF
 */
export async function fetchMotCommissaireData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    const slug = locale === 'fr' ? 'le-mot-de-la-commissaire-generale' : 'message-from-the-general-commissioner'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      header: {
        badge: page.acf.badge,
        titre1: page.acf.titre_1,
        titre2: page.acf.titre_2,
        sousTitre: page.acf.sous_titre,
      },
      content: {
        badge: page.acf.details_badge,
        title: page.acf.details_titre,
        description: page.acf.details_description,
        imageUrl: featuredImage || page.acf.image_alternative,
        imageAlt: page.featured_image_alt || "Illustration"
      }
    };
  } catch (error) {
    console.error("Erreur fetchMotCommissaireData:", error);
    return null;
  }
}


export async function fetchMinisteresEnChargeData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    // Slugs spécifiques pour les ministères
    const slug = locale === 'fr' ? 'ministeres-en-charge' : 'responsible-agencies'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    // Récupération de l'image à la une (Featured Image) via l'embed WP
    const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      header: {
        badge: page.acf?.badge || "",
        titre1: page.acf?.titre_1 || "",
        titre2: page.acf?.titre_2 || "",
        sousTitre: page.acf?.sous_titre || "",
      },
      content: {
        badge: page.acf?.details_badge || "",
        title: page.acf?.details_titre || "",
        description: page.acf?.details_description || "",
        imageUrl: featuredImage || page.acf?.image_alternative || "",
        imageAlt: page.featured_image_alt || "Ministères en charge"
      }
    };
  } catch (error) {
    console.error("Erreur fetchMinisteresEnChargeData:", error);
    return null;
  }
}

/**
 * Récupère les données de la page Équipe via ACF
 */
export async function fetchEquipeData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    // Utilisation des slugs fournis dans ta question
    const slug = locale === 'fr' ? 'lequipe' : 'the-team'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    // Récupération de l'image à la une (si nécessaire pour la page équipe)
    const featuredImage = page._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      header: {
        badge: page.acf?.badge || "",
        titre1: page.acf?.titre_1 || "",
        titre2: page.acf?.titre_2 || "",
        sousTitre: page.acf?.sous_titre || "",
      },
      content: {
        title: page.acf?.details_titre || "",
        description: page.acf?.details_description || page.content?.rendered || "",
        imageUrl: featuredImage || page.acf?.image_alternative || ""
      },
      // Si tu as un répéteur ACF pour les membres de l'équipe :
      membres: page.acf?.membres_equipe || [] 
    };
  } catch (error) {
    console.error("Erreur fetchEquipeData:", error);
    return null;
  }
}



export async function fetchPartenairesData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    const slug = locale === 'fr' ? 'les-partenaires' : 'partners';
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];
    const acf = page.acf;

    // --- LOGIQUE DE RÉCUPÉRATION DES LOGOS ---
    const logosRaw = acf?.sections_logos_partenaires?.section_logos || [];

    // On transforme les IDs en URLs de manière asynchrone et parallèle
    const logosWithUrls = await Promise.all(
      logosRaw.map(async (item: any) => {
        let imageUrl = "";
        const logoData = item.logo_entreprise;

        if (typeof logoData === "number") {
          // C'est un ID, on va chercher l'URL du média
          try {
            const mediaRes = await fetch(`${BASE_URL}/wp-json/wp/v2/media/${logoData}`);
            const media = await mediaRes.json();
            imageUrl = media.source_url;
          } catch (e) {
            console.error("Erreur media fetch:", e);
          }
        } else if (typeof logoData === "string") {
          // C'est déjà une URL
          imageUrl = logoData;
        }

        return {
          src: imageUrl || "/images/placeholder-logo.png",
          alt: item.nom_entreprise || "Partenaire"
        };
      })
    );

    return {
      header: {
        badge: acf?.badge || "",
        titre1: acf?.titre_1 || "",
        titre2: acf?.titre_2 || "",
        sousTitre: acf?.sous_titre || "",
      },
      presentation: {
        badge: acf?.details_badge || "",
        title: acf?.details_titre || "",
        description: acf?.details_description || "",
        imageUrl: page._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/images/18516.jpg"
      },
      grid: {
        title: acf?.sections_logos_partenaires?.badge_header_section_titre || "",
        description: acf?.sections_logos_partenaires?.badge_header_section_sous_titre || "",
        logos: logosWithUrls // On utilise ici notre tableau traité
      }
    };
  } catch (error) {
    console.error("Erreur fetchPartenairesData:", error);
    return null;
  }
}


export async function fetchPalaisData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    const slug = locale === 'fr' ? 'le-palais-des-congres-omar-bongo-ondimba' : 'omar-bongo-ondimba-convention-center';
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];
    const acf = page.acf;

    // --- LOGIQUE DE RÉCUPÉRATION DE LA GALERIE ---
    // Selon ton JSON : acf.sections_galerie.section_galerie
    const galleryRaw = acf?.sections_galerie?.section_galerie || [];

    const galleryWithUrls = await Promise.all(
      galleryRaw.map(async (item: any) => {
        let imageUrl = "";
        const photoId = item.photo; // C'est la clé "photo" dans ton JSON

        if (typeof photoId === "number") {
          try {
            const mediaRes = await fetch(`${BASE_URL}/wp-json/wp/v2/media/${photoId}`);
            const media = await mediaRes.json();
            imageUrl = media.source_url;
          } catch (e) {
            console.error("Erreur media fetch Palais:", e);
          }
        } else if (typeof photoId === "string") {
          imageUrl = photoId;
        }

        return {
          src: imageUrl || "/images/placeholder.webp",
          alt: item.titre || "Espace Palais des Congrès", // Clé "titre" dans ton JSON
          label: item.titre || ""
        };
      })
    );

    return {
      header: {
        badge: acf?.badge || "",
        titre1: acf?.titre_1 || "",
        titre2: acf?.titre_2 || "",
        sousTitre: acf?.sous_titre || "",
      },
      presentation: {
        badge: acf?.details_badge || "",
        title: acf?.details_titre || "",
        description: acf?.details_description || "",
        // On récupère l'image mise à la une (ID 1953 dans ton JSON) via _embed
        imageUrl: page._embedded?.['wp:featuredmedia']?.[0]?.source_url || "/images/slide-3-1200.webp"
      },
      gallery: {
        // Récupération du titre de la section galerie        
        title: acf?.sections_galerie?.badge_header_section_titre || "L'Excellence en images",
        badge: acf?.sections_galerie?.badge_header_section_galerie || "", // "aaa Aperçu des Espaces"
        images: galleryWithUrls
      }
    };
  } catch (error) {
    console.error("Erreur fetchPalaisData:", error);
    return null;
  }
}




/**
 * Envoie l'email à la newsletter WordPress
 * @param email Adresse email à inscrire
 */
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    // Vérification de l'URL de base
    if (!BASE_URL) {
      throw new Error("L'URL de l'API n'est pas configurée.");
    }

    const res = await fetch(`${BASE_URL}/wp-json/newsletter/v1/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    // Récupération de la réponse (ton PHP renvoie du texte ou JSON)
    const result = await res.json();

    if (!res.ok) {
      // Gestion des codes 400 (invalide) et 409 (déjà inscrit)
      throw new Error(result || "Une erreur est survenue lors de l'inscription.");
    }

    return {
      success: true,
      message: typeof result === 'string' ? result : "Inscription réussie !"
    };
  } catch (error: any) {
    console.error("Erreur subscribeNewsletter:", error);
    return {
      success: false,
      message: error.message || "Erreur de connexion au service de newsletter."
    };
  }
}




/**
 * Récupère les données de la page Contact via ACF
 */
export async function fetchContactData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    // Gestion des slugs selon la langue
    const slug = locale === 'fr' ? 'contact' : 'contact-us'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    return {
      header: {
        badge: page.acf?.badge || "",
        titre1: page.acf?.titre_1 || "",
        titre2: page.acf?.titre_2 || "",
        sousTitre: page.acf?.sous_titre || "",
      },
      content: {
        badge: page.acf?.details_badge || "",
        title: page.acf?.details_titre || "",
        description: page.acf?.details_sous_titre || page.content?.rendered || "",
      }
    };
  } catch (error) {
    console.error("Erreur fetchContactData:", error);
    return null;
  }
}


/**
 * Récupère les données de la page Inscription via ACF
 */
export async function fetchInscriptionData(locale: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    // Gestion des slugs : 'inscription' pour le français, 'registration' pour l'anglais
    const slug = locale === 'fr' ? 'inscription' : 'registration'; 
    const url = `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}&_embed`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    const pages = await res.json();
    
    if (!pages || pages.length === 0) return null;
    const page = pages[0];

    return {
      header: {
        badge: page.acf?.badge || "",
        titre1: page.acf?.titre_1 || "",
        titre2: page.acf?.titre_2 || "",
        sousTitre: page.acf?.sous_titre || "",
      },
      content: {
        badge: page.acf?.details_badge || "",
        title: page.acf?.details_titre || "",
        // On récupère soit le sous-titre ACF, soit le contenu principal de l'éditeur WP
        description: page.acf?.details_sous_titre || page.content?.rendered || "",
      }
    };
  } catch (error) {
    console.error("Erreur fetchInscriptionData:", error);
    return null;
  }
}

/**
 * Récupère uniquement le logo du site via l'endpoint central
 * @param locale 'fr' ou 'en'
 */
export async function fetchSiteLogo(locale: string = "fr"): Promise<string | null> {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!BASE_URL) return null;

  try {
    // Appel de l'endpoint central de la homepage
    const url = `${BASE_URL}/wp-json/custom/v1/homepage/data?lang=${locale}`;
    
    const res = await fetch(url, { 
      next: { revalidate: 3600 } // On cache le logo 1h car il change rarement
    });

    if (!res.ok) return null;

    const data = await res.json();

    // Retourne directement l'URL du logo située à la racine du JSON
    return data.logo_site || null;
    
  } catch (error) {
    console.error("Erreur fetchSiteLogo:", error);
    return null;
  }
}



export async function fetchPageBySlug(slug: string, locale: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
