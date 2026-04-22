// src/utils/stringUtils.ts

export const decodeHTML = (html: string): string => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  

  export const formatLocalizedDate = (dateString: string, locale: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  

  export function formatViews(number: string | number, locale = 'fr-FR') {
    if (typeof number !== 'number') return '0';
    if (number >= 1_000_000) {
      return (number / 1_000_000).toLocaleString(locale, {
        maximumFractionDigits: 1,
      }) + 'M';
    } else if (number >= 1_000) {
      return (number / 1_000).toLocaleString(locale, {
        maximumFractionDigits: 1,
      }) + 'K';
    } else {
      return number.toLocaleString(locale);
    }
  }
  
  export function formatDuration(seconds?: number, options?: { locale?: string }): string {
    const locale = options?.locale || "fr";
  
    // Ici on teste si seconds est undefined ou null ou NaN
    if (seconds == null || isNaN(seconds)) {
      return locale === "en" ? "Unknown duration" : "Durée inconnue";
    }
  
    // Si la durée est 0, on affiche 0s (ou équivalent)
    if (seconds === 0) {
      return locale === "en" ? "0s" : "0s";
    }
  
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
  
    const labels: Record<string, { h: string; m: string; s: string; prefix: string }> = {
      fr: { h: "h", m: "m", s: "s", prefix: "" },
      en: { h: "h", m: "m", s: "s", prefix: "" },
    };
  
    const { h: lh, m: lm, s: ls, prefix } = labels[locale] || labels.fr;
  
    if (h > 0) {
      return `${prefix}${h}${lh} ${m.toString().padStart(2, "0")}${lm} ${s.toString().padStart(2, "0")}${ls}`;
    } else if (m > 0) {
      return `${prefix}${m}${lm} ${s.toString().padStart(2, "0")}${ls}`;
    } else {
      return `${prefix}${s}${ls}`;
    }
  }
  
  

  export const getEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const id = match && match[2].length === 11 ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}` : null;
  };
  





  export const truncateTitle = (title: string, maxWords: number, replaceLastChars: boolean = false): string => {
    if (!title) return "";
  
    if (replaceLastChars && title.length > 3) {
      return title.slice(0, -3) + "...";
    }
  
    const words = title.split(" ");
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
  };
  

// utils/stringUtils.ts
export function parseDateFr(dateStr: string): string {
  const moisFr: { [key: string]: string } = {
    // Français
    janvier: "01",
    fevrier: "02",
    février: "02",
    mars: "03",
    avril: "04",
    mai: "05",
    juin: "06",
    juillet: "07",
    aout: "08",
    août: "08",
    septembre: "09",
    octobre: "10",
    novembre: "11",
    decembre: "12",
    décembre: "12",

    // Anglais
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  const [jour, mois, annee] = dateStr.toLowerCase().split(" ");
  const moisCle = mois.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // supprime accents
  const moisNum = moisFr[moisCle];

  if (!moisNum) throw new Error(`Mois inconnu: ${mois}`);
  return `${annee}-${moisNum}-${jour.padStart(2, "0")}`;
}
  