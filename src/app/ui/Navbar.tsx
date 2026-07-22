"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { getLocalizedLink } from "../lib/utils";
//import { fetchSiteLogo } from "../services/api";

type NavbarProps = {
  locale: string;
  logoUrl: string | null; // Nouvelle prop
};

export default function Navbar({ logoUrl }: NavbarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  // ÉTAT POUR LE LOGO DYNAMIQUE
  //const [logoUrl, setLogoUrl] = useState<string | null>(null);

  /**
   * CORRECTION 1 : Détecter la langue via l'URL réelle (pathname)
   * On regarde si l'URL commence par /en. Sinon, par défaut c'est /fr.
   */
  const currentLocale = pathname.startsWith("/en") ? "en" : "fr";

  // CETTE LIGNE EST LA CLÉ : Elle pré-remplit le premier argument pour toi
  const getLink = (slug: string) => getLocalizedLink(currentLocale, slug);


  // RÉCUPÉRATION DU LOGO AU CHARGEMENT
/*
  useEffect(() => {
    const getLogo = async () => {
      const url = await fetchSiteLogo(currentLocale);
      if (url) setLogoUrl(url);
    };
    getLogo();
  }, [currentLocale]);
*/

  const handleLanguageChange = (newLocale: string) => {
  // Ajoutez un encodage correct et vérifiez le domaine si nécessaire
  // 'max-age=31536000' est correct (1 an)
  document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;
  localStorage.setItem("locale", newLocale);
};

  // Persistance dans localStorage (optionnel si tu utilises le routage par URL)
  useEffect(() => {
    localStorage.setItem("locale", currentLocale);
  }, [currentLocale]);

  // Fermer le menu au changement de route
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? "hidden" : "unset";
  };

  const toggleAccordion = (name: string) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  
  const menuItems = {
    apropos: [
      { href: "/vision-fondatrice", label: t("sub_apropos.philosophie") },
      { href: "/parties-prenantes", label: t("sub_apropos.ministere") },
      { href: "/le-mot-du-commissaire-general", label: t("sub_apropos.mot") },      
      //{ href: "/le-mot-de-la-commissaire-generale", label: t("sub_apropos.mot") },      
      { href: "/equipe", label: t("sub_apropos.equipe") },
      { href: "/les-partenaires", label: t("sub_apropos.partenaires") },
      { href: "/le-palais-des-congres-omar-bongo-ondimba", label: t("sub_apropos.palais") },
    ],
    forum: [
      { href: "/la-thematique", label: t("sub_forum.thematique"), isExternal: false },
      { 
        href: "https://controlpanel.forumlibreville.org/wp-content/uploads/2026/04/Plaquette-Forum-international-de-Libreville-OK10.pdf", 
        label: t("sub_forum.brochure"),
        isExternal: true 
      },      
      { 
        href: "https://controlpanel.forumlibreville.org/wp-content/uploads/2026/05/Declaration-de-Libreville-FIL2026.pdf", 
        label: t("sub_forum.declaration"),
        isExternal: true 
      },      
      { href: "/le-programme", label: t("sub_forum.programme"), isExternal: false },
      //{ href: "/les-intervenants", label: t("sub_forum.intervenants") },
    ],
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-blue-900 text-white py-2 text-xs font-extrabold">
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-4">
          {/* CORRECTION : Surbrillance basée sur currentLocale (déduit de l'URL) */}
          <Link 
            href="/fr"
            onClick={() => handleLanguageChange('fr')} // AJOUTER CECI 
            className={`hover:text-green-400 transition ${currentLocale === 'fr' ? 'text-green-400 border-b border-green-400' : 'opacity-70'}`}
          >
            FR
          </Link>
          <span className="opacity-30">|</span>
          <Link 
            href="/en"
            onClick={() => handleLanguageChange('en')}
            className={`hover:text-green-400 transition ${currentLocale === 'en' ? 'text-green-400 border-b border-green-400' : 'opacity-70'}`}
          >
            EN
          </Link>
        </div>
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <Link href={getLink("/")}>
  <img     
    src={logoUrl || "/fr/images/newlogo.webp"}
    alt="Logo" 
    className="h-20 w-auto object-contain" 
  />
  {/* className="h-16 w-auto object-contain"  */}
</Link>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center space-x-4 text-[11px] uppercase tracking-wider text-slate-600">
            
            <Link href={getLink("/")} className="font-extrabold px-2 py-1 hover:text-blue-900 transition uppercase">
              {t("accueil")}
            </Link>

            {/* Dropdown À Propos */}
            <div className="relative dropdown group h-20 flex items-center">
              <button className="font-extrabold px-2 py-1 flex items-center gap-1 group-hover:text-blue-900 transition uppercase outline-none">
                {t("apropos")} <i className="fa-solid fa-chevron-down text-[8px]" />
              </button>
              <div className="dropdown-menu hidden group-hover:block absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-green-600 py-2">
                {menuItems.apropos.map((item) => (
                  <Link 
                    key={item.href} 
                    href={getLink(item.href)} 
                    className="font-extrabold block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 uppercase text-[10px]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Dropdown Le Forum */}
            <div className="relative dropdown group h-20 flex items-center">
              <button className="font-extrabold px-2 py-1 flex items-center gap-1 group-hover:text-blue-900 transition uppercase outline-none">
                {t("forum")} <i className="fa-solid fa-chevron-down text-[8px]" />
              </button>
              <div className="dropdown-menu hidden group-hover:block absolute top-full left-0 w-64 bg-white shadow-xl border-t-2 border-green-600 py-2">
                {menuItems.forum.map((item, index) => (
                  <Link 
                    key={`${item.href}-${index}`} // Clé unique garantie
                    href={item.isExternal ? item.href : getLink(item.href)}
                    target={item.isExternal ? "_blank" : "_self"}
                    className="font-extrabold block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 uppercase text-[10px]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href={getLink("/actualites")} className="font-extrabold px-2 py-1 hover:text-blue-900 transition uppercase">{t("actualites")}</Link>
            <Link href={getLink("/inscription")} className="font-extrabold px-2 py-1 hover:text-green-900 transition uppercase">{t("inscription")}</Link>
            <Link href={getLink("/mediatheque")} className="font-extrabold px-2 py-1 hover:text-green-900 transition uppercase">{t("mediatheque")}</Link> 
            <Link href={getLink("/contact")} className="font-extrabold px-2 py-1 hover:text-blue-900 transition uppercase">{t("contact")}</Link>
          </div>

          {/* BURGER */}
          <button className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" onClick={toggleMenu}>
            <span className={`w-6 h-0.5 bg-blue-900 rounded-full transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-blue-900 rounded-full transition-all ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-[#009e60] rounded-full transition-all ${isOpen ? "-rotate-45 -translate-y-2 w-6" : "w-4 self-end mr-2"}`} />
          </button>
        </div>

        {/* MENU MOBILE (Même logique getLink appliquée) */}
        {/* MENU MOBILE OVERLAY */}
        <div className={`fixed inset-0 z-[200] bg-white lg:hidden flex flex-col p-8 overflow-y-auto transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* Header Mobile */}
          <div className="flex justify-between items-center mb-10">
            <img 
            src={logoUrl || "/images/newlogo.webp"}
            alt="Logo" className="h-20 w-auto" />
            <button onClick={toggleMenu} className="text-4xl text-blue-900">×</button>
          </div>
          {/* src={getLink("/images/newlogo.webp")}   */}

          <div className="flex flex-col space-y-2">
            {/* Lien Accueil */}
            <Link 
              href={getLink("/")} 
              className="py-3 text-xl font-extrabold  text-blue-950 uppercase border-b border-slate-50"
            >
              {t("accueil")}
            </Link>

            {/* Accordéon À Propos */}
            <div>
              <button 
                className="w-full flex font-extrabold justify-between items-center py-4 text-xl  text-blue-950 uppercase border-b border-slate-50" 
                onClick={() => toggleAccordion("propos")}
              >
                {t("apropos")}
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${activeAccordion === "propos" ? "rotate-180" : ""}`} />
              </button>
              <div className={`${activeAccordion === "propos" ? "flex" : "hidden"} flex-col mt-2 p-2 bg-slate-100 rounded-xl`}>
                {menuItems.apropos.map((item) => (
                  <Link 
                    key={item.href} 
                    href={getLink(item.href)} 
                    className="py-3 font-extrabold px-4 text-sm  text-blue-900 uppercase flex items-center"
                  >
                    <i className="fa-solid fa-circle mr-3 text-[#009e60] opacity-40 text-[6px]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Accordéon Forum */}
            <div>
              <button 
                className="w-full flex font-extrabold justify-between items-center py-4 text-xl  text-blue-950 uppercase border-b border-slate-50" 
                onClick={() => toggleAccordion("forum")}
              >
                {t("forum")}
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${activeAccordion === "forum" ? "rotate-180" : ""}`} />
              </button>
              <div className={`${activeAccordion === "forum" ? "flex" : "hidden"} flex-col mt-2 p-2 bg-slate-100 rounded-xl`}>
                {menuItems.forum.map((item, index) => (
                  <Link 
                    key={`${item.href}-${index}`} // Clé unique garantie
                    href={item.isExternal ? item.href : getLink(item.href)}
                    target={item.isExternal ? "_blank" : "_self"}                    
                    className="py-3 font-extrabold px-4 text-sm  text-blue-900 uppercase flex items-center"
                  >
                    <i className="fa-solid fa-circle mr-3 text-[#009e60] opacity-40 text-[6px]" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Liens simples */}

            <Link 
              href={getLink("/actualites")} 
              className="py-3 text-xl  uppercase text-blue-950 font-extrabold border-b border-slate-50"
            >
              {t("actualites")}
            </Link>


            <Link 
              href={getLink("/inscription")} 
              className="py-3 text-xl  uppercase text-blue-950 font-extrabold border-b border-slate-50"
            >
              {t("inscription")}
            </Link>

<Link href={getLink("/mediatheque")} className="py-3 text-xl  uppercase text-blue-950 font-extrabold border-b border-slate-50" > {t("mediatheque")} </Link>

            <Link 
              href={getLink("/contact")} 
              className="py-3 text-xl  uppercase text-blue-950 font-extrabold border-b border-slate-50"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Footer Mobile avec réseaux sociaux */}
          <div className="mt-auto pt-10 flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#009e60] text-white flex items-center justify-center">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}