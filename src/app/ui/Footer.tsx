/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { subscribeNewsletter } from "../services/api";


type FooterProps = {
  logoUrl: string | null;
};

export default function Footer({ logoUrl }: FooterProps) {
  const t = useTranslations();
  const locale = useLocale();

  // --- ÉTATS NEWSLETTER ---
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  // --- LOGIQUE DES RÉSEAUX SOCIAUX ---
  // On récupère les variables du .env
  const socialLinks = [
    { 
      icon: "fa-facebook-f", 
      color: "bg-blue-900", 
      url: process.env.NEXT_PUBLIC_FACEBOOK_URL 
    },
    { 
      icon: "fa-linkedin-in", 
      color: "bg-[#009e60]", 
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL 
    },
    { 
      icon: "fa-x-twitter", // Changé de twitter à x-twitter pour la cohérence
      color: "bg-black", 
      url: process.env.NEXT_PUBLIC_TWITTER_URL 
    },
    { 
      icon: "fa-instagram", 
      color: "bg-gradient-to-tr from-yellow-500 to-purple-600", 
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL 
    },
    { 
      icon: "fa-youtube", 
      color: "bg-red-600", 
      url: process.env.NEXT_PUBLIC_YOUTUBE_URL 
    },
    { 
      icon: "fa-whatsapp", 
      color: "bg-green-500", 
      url: process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL 
    },
  ];

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  setStatus("loading");
  setFeedback("");

  const result = await subscribeNewsletter(email);

  if (result.success) {
    setStatus("success");
    // On ignore le texte du backend et on utilise notre clé de traduction
    setFeedback(t('ApiResponses.success')); 
    setEmail("");
  } else {
    setStatus("error");
    
    // INTERPRÉTATION DU MESSAGE BACKEND
    // On compare le message reçu pour renvoyer la bonne clé de traduction
    if (result.message === "Email déjà inscrit") {
      setFeedback(t('ApiResponses.already_exists'));
    } else if (result.message === "Email invalide") {
      setFeedback(t('ApiResponses.invalid_email'));
    } else {
      setFeedback(t('ApiResponses.error'));
    }
  }
};

  const columnStyle = "bg-slate-800/40 border border-white/5 p-8 rounded-[1rem] h-full transition-all duration-300 hover:bg-slate-800/60";

  const menuItems = {
    apropos: [
      { href: "/vision-fondatrice", label: t("nav.sub_apropos.philosophie") },
      { href: "/parties-prenantes", label: t("nav.sub_apropos.ministere") },
      { href: "/le-mot-du-commissaire-general", label: t("nav.sub_apropos.mot") },
      { href: "/equipe", label: t("nav.sub_apropos.equipe") },
      { href: "/les-partenaires", label: t("nav.sub_apropos.partenaires") },
      { href: "/le-palais-des-congres-omar-bongo-ondimba", label: t("nav.sub_apropos.palais") },
    ],
    forum: [
      { href: "/la-thematique", label: t("nav.sub_forum.thematique") },
      { href: "/le-programme", label: t("nav.sub_forum.programme") },
      //{ href: "/les-intervenants", label: t("nav.sub_forum.intervenants") },
    ],
    explorer: [
      //{ href: "/actualites", label: t("nav.actualites") },
      { href: "/inscription", label: t("nav.inscription") },
      //{ href: "/mediatheque", label: t("nav.mediatheque") },
    ]
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-10 border-t-4 border-[#009e60]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20 items-stretch">
          
          {/* ZONE 1 : LOGO & NEWSLETTER */}
          <div className={columnStyle}>
            <div className="space-y-8">
              <div className="flex justify-center md:justify-start items-center">
                <Link href={`/${locale}`}>
                  {/* src="/fr/images/newlogo.webp" */}
                  <img                    
                    src={logoUrl || "/fr/images/newlogo.webp"}
                    alt="Logo"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                </Link>
              </div>
              <div className="space-y-3">
                <p className="text-slate-400 text-[9px]  uppercase font-sans leading-relaxed">
                  {t('Footer.newsletter.text')}
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-row items-center gap-2 w-full max-md:max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('Footer.newsletter.placeholder')}
                    disabled={status === "loading"}
                    className="flex-1 bg-slate-900/50 border border-white/10 p-3 rounded-md text-[9px] font-bold outline-none focus:ring-1 focus:ring-[#009e60] transition uppercase text-white min-w-0 disabled:opacity-50"
                  />
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="bg-[#009e60] hover:bg-green-700 text-white px-3 py-3 rounded-md text-[9px]  uppercase font-sans transition-all shadow-lg shadow-green-900/20 whitespace-nowrap disabled:bg-slate-700"
                  >
                    {status === "loading" ? "..." : t('Footer.newsletter.button')}
                  </button>
                </form>
                {feedback && (
                  <p className={`text-[8px] font-bold uppercase mt-2 animate-pulse ${status === "error" ? "text-red-400" : "text-green-400"}`}>
                    {feedback}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ZONE 2 : À PROPOS */}
          <div className={columnStyle}>
            <h3 className="text-[#1d89db] font-extrabold  text-[11px] uppercase mb-8 font-sans tracking-widest flex items-center gap-2">
               {t('nav.apropos')}
            </h3>
            <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase font-sans">
              {menuItems.apropos.map((item, index) => (
                <li key={index}>
                  <Link href={`/${locale}${item.href}`} className="hover:text-white transition block">- {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ZONE 3 : LE FORUM */}
          <div className={columnStyle}>
            <h3 className="text-[#1d89db] font-extrabold text-[11px] uppercase mb-8 tracking-widest flex items-center gap-2">
               {t('nav.forum')}
            </h3>
            <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase font-sans">
              {menuItems.forum.map((item, index) => (
                <li key={index}>
                  <Link href={`/${locale}${item.href}`} className="hover:text-white transition block">- {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ZONE 4 : EXPLORER */}
          <div className={columnStyle}>
            <h3 className="text-[#1d89db] font-extrabold text-[11px] uppercase mb-8 tracking-widest flex items-center gap-2">
              {t('Footer.explorer')}
            </h3>
            <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase font-sans">
              {menuItems.explorer.map((item, index) => (
                <li key={index}>
                  <Link href={`/${locale}${item.href}`} className="hover:text-white transition block">- {item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ZONE 5 : CONTACT */}
          <div className={columnStyle}>
            <h4 className="text-[#1d89db] font-extrabold text-[11px] uppercase mb-8 tracking-widest flex items-center gap-2">
               {t('nav.contact')}
            </h4>
            <ul className="space-y-4 text-[10px] font-bold text-slate-400 uppercase font-sans">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-building-columns text-[#009e60] text-xs mt-0.5" />
                <span>{t('Footer.contact.org')}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-location-dot text-[#009e60] text-xs mt-0.5" />
                <span>{t('Footer.contact.city')}</span>
              </li>              
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px]  text-slate-600 uppercase font-sans">
            © 2026 Forum International de Libreville | {t('Footer.rights')}
          </p>
          
          <div className="flex gap-4">
            {socialLinks.map((social, idx) => {
              // Si l'URL est vide ou égale à #, on ne rend pas le lien (ou on le désactive)
              if (!social.url || social.url === "#") return null;

              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl ${social.color} text-white flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-black/20`}
                >
                  <i className={`fa-brands ${social.icon} text-xs`} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}