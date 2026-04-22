"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import SimpleHeader from "./SimpleHeader";
import { 
  ContactFormData, 
  sendContactForm, 
  fetchContactData, 
  ContactData 
} from "../services/api";

export default function Contact({ locale }: { locale: string }) {
  const t = useTranslations("Contact");

  // --- ÉTATS ---
  const [apiData, setApiData] = useState<ContactData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({
    type: null,
    message: ""
  });

  // --- CHARGEMENT DES DONNÉES DEPUIS WORDPRESS ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchContactData(locale);
        if (data) {
          setApiData(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Erreur chargement page contact:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [locale]);

  // --- LOGIQUE D'ENVOI DU FORMULAIRE ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = await sendContactForm(data);

    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      form.reset(); 
    } else {
      setStatus({ type: 'error', message: result.message });
    }

    setIsSubmitting(false);
  };

  // --- ÉCRAN DE CHARGEMENT ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="animate-pulse text-slate-400 font-sans text-[10px] uppercase tracking-widest">
          Chargement...
        </div>
      </div>
    );
  }

  // Sécurité si les données ne sont pas trouvées
  if (!apiData) return null;

  return (
    <>
      {/* SimpleHeader consomme les données dynamiques de l'API */}
      <SimpleHeader 
        texte1={apiData.header.badge} 
        texte2={apiData.header.titre1} 
        texte3={apiData.header.titre2} 
        texte4={apiData.header.sousTitre}
      />

      <section className="relative py-20 md:py-32 px-4 sm:px-6 bg-[#f8fafc] overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-[0.03] z-0" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#006837]/10 rounded-full blur-[120px] z-0" />

        <div className="relative z-10 max-w-7xl mx-auto lg:-mt-16">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Colonne Gauche : Infos (Dynamiques via ACF) */}
            <div className="lg:col-span-5 text-center lg:text-left pt-4 lg:sticky lg:mt-[-20px] mt-[-50px]">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#C5A059]" />
                  <span className="text-[12px] lg:text-[16px]  uppercase font-extrabold tracking-widest text-[#C5A059]">
                    {apiData.content.badge || t('info.badge')}
                  </span>
                  <span className="w-8 h-[2px] bg-[#C5A059] lg:hidden" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tighter text-[#0A1F44] mb-6">
                {apiData.content.title}
              </h2>
              
              {/* Utilisation de dangerouslySetInnerHTML pour supporter le formatage WP/ACF */}
              <div 
                className="text-slate-500 font-sans text-base mb-12 max-w-md mx-auto lg:mx-0 text-justify leading-relaxed hyphens-auto"
                dangerouslySetInnerHTML={{ __html: apiData.content.description }}
              />
            </div>

            {/* Colonne Droite : Formulaire */}
            <div className="lg:col-span-7 lg:mt-[-10px] mt-[-90px]">
              <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(10,31,68,0.12)] border border-slate-100">
                {status.type && (
                    <div className={`mb-8 p-4 rounded-xl text-center text-sm font-sans transition-all animate-in fade-in slide-in-from-top-2 ${
                      status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {status.message}
                    </div>
                  )}
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t('form.nameLabel')}
                      </label>
                      <div className="relative">
                        <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors" />
                        <input
                          name="name"
                          required
                          type="text"
                          placeholder={t('form.namePlaceholder')}
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-sm font-sans"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t('form.emailLabel')}
                      </label>
                      <div className="relative">
                        <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors" />
                        <input
                          name="email"
                          required
                          type="email"
                          placeholder="Ex: contact@entreprise.com"
                          className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-sm font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                      {t('form.subjectLabel')}
                    </label>
                    <div className="relative">
                      <i className="fa-solid fa-list-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#006837] transition-colors" />
                      <select 
                        name="subject"
                        className="w-full bg-slate-50 font-sans border border-slate-100 rounded-xl py-4 pl-12 pr-10 outline-none focus:bg-white focus:border-[#006837] focus:ring-4 focus:ring-[#006837]/5 transition-all text-sm appearance-none cursor-pointer text-slate-600"
                      >
                        <option value={t('form.subjects.info')}>{t('form.subjects.info')}</option>
                        <option value={t('form.subjects.accrit')}>{t('form.subjects.accrit')}</option>
                        <option value={t('form.subjects.partner')}>{t('form.subjects.partner')}</option>
                        <option value={t('form.subjects.press')}>{t('form.subjects.press')}</option>
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none text-[10px]" />
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 block">
                      {t('form.messageLabel')}
                    </label>
                    <div className="relative">
                      <i className="fa-regular fa-comment-dots absolute left-4 top-5 text-slate-300 group-focus-within:text-[#C5A059] transition-colors" />
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder={t('form.messagePlaceholder')}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 outline-none focus:bg-white focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all text-sm resize-none font-sans"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group overflow-hidden w-full bg-[#0A1F44] text-white font-bold py-5 rounded-xl transition-all duration-500 shadow-lg hover:shadow-[#0A1F44]/20 active:scale-[0.99] disabled:opacity-70"
                  >
                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#006837] to-[#008a4a] transition-all duration-500 group-hover:w-full"></div>
                    <span className="relative z-10 uppercase tracking-widest font-sans text-xs flex items-center justify-center gap-1">
                      {isSubmitting ? "Envoi en cours..." : t('form.submit')}
                      <i className={`fa-solid ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} text-[10px] transition-transform`} />
                    </span>
                  </button>

                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}