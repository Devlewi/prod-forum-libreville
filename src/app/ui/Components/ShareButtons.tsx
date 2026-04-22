"use client";

import React from "react";
import Link from "next/link";
import { FaFacebookF, FaLink } from "react-icons/fa";

type ShareButtonsProps = {
  post: {
    title: string;
    link: string;
    slug: string;
  };
  locale: string;
  singulararticle: string;
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ locale, singulararticle, post }) => {
  // --- SOLUTION ROBUSTE POUR L'URL ---
  // On utilise window.location.href si on est côté client, 
  // sinon on construit l'URL manuellement.
  const [shareUrl, setShareUrl] = React.useState("");

  React.useEffect(() => {
    // Cela garantit que l'URL est EXACTEMENT celle affichée dans la barre d'adresse
    setShareUrl(window.location.href);
  }, []);

  // Fallback au cas où l'useEffect n'a pas encore tourné
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? (typeof window !== "undefined" ? window.location.origin : "");
  const fallbackUrl = `${baseUrl}/${locale}/${singulararticle}/${post.slug}`;
  const finalUrl = shareUrl || fallbackUrl;

  const encodedTitle = encodeURIComponent(post.title);
  const encodedURL = encodeURIComponent(finalUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(finalUrl);
    alert(locale === 'fr' ? "Lien copié !" : "Link copied!");
  };

  return (
    <div className="flex items-center gap-3">
      {/* Facebook */}
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 bg-[#3b5998] hover:bg-[#2d4373] text-white rounded-full transition-all"
      >
        <FaFacebookF size={14} />
      </Link>

      {/* Twitter / X */}
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 bg-black hover:bg-slate-800 text-white rounded-full transition-all"
      >
        <i className="fa-brands fa-x-twitter text-xs" />
      </Link>

      {/* LinkedIn */}
      <Link
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 bg-[#0077b5] hover:bg-[#005582] text-white rounded-full transition-all"
      >
        <i className="fa-brands fa-linkedin-in text-xs" />
      </Link>

      {/* Copier le lien */}
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center w-9 h-9 bg-[#C5A059] hover:bg-[#a3844a] text-white rounded-full transition-all"
        title={locale === 'fr' ? "Copier le lien" : "Copy link"}
      >
        <FaLink size={14} />
      </button>
    </div>
  );
};

export default ShareButtons;