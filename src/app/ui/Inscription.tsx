/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2"; // Import de SweetAlert2
import SimpleHeader from "./SimpleHeader";
import { fetchInscriptionData, InscriptionFormData, sendInscriptionForm } from "../services/api";

export default function Inscription({ locale }: { locale: string }) {
  const t = useTranslations("Inscription");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiData, setApiData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRegistrationOpen = false;

  // --- CHARGEMENT DES DONNÉES DEPUIS WORDPRESS ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchInscriptionData(locale);
        if (data) setApiData(data);
      } catch (error) {
        console.error("Erreur chargement page inscription:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [locale]);

  // --- LOGIQUE D'ENVOI ---
  // --- LOGIQUE D'ENVOI AVEC VALIDATION ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // 1. RÉCUPÉRATION DES VALEURS
    const civilite = formData.get("civilite");
    const nom = formData.get("nom") as string;
    const prenom = formData.get("prenom") as string;
    const email = formData.get("email") as string;
    const organization = formData.get("organisation") as string;
    const photo = formData.get("photo") as File;

    // 2. CONTRÔLE DES CHAMPS (Exemple de validation personnalisée)
    if (
      !civilite ||
      !nom.trim() ||
      !prenom.trim() ||
      !email.trim() ||
      !organization.trim()
    ) {
      Swal.fire({
        title: "Champs incomplets",
        text: "Veuillez remplir tous les champs obligatoires avant de valider.",
        icon: "warning",
        confirmButtonColor: "#C5A059", // Couleur dorée pour l'avertissement
      });
      return; // On arrête l'exécution ici
    }

    // Validation spécifique pour l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Email invalide",
        text: "Veuillez saisir une adresse email correcte.",
        icon: "error",
        confirmButtonColor: "#0A1F44",
      });
      return;
    }

    // Validation de la photo
    if (!photo || photo.size === 0) {
      Swal.fire({
        title: "Photo manquante",
        text: "La photo d'identité est obligatoire pour valider votre badge.",
        icon: "info",
        confirmButtonColor: "#C5A059",
      });
      return;
    }

    // 3. ENVOI SI TOUT EST OK
    setIsSubmitting(true);

    const data: InscriptionFormData = {
      civilite: civilite as string,
      rang: formData.get("rang") as string,
      nom: nom,
      prenom: prenom,
      email: email,
      organisation: organization,
      secteur: formData.get("secteur") as string,
      nationalite: formData.get("nationalite") as string,
      pays: formData.get("pays") as string,
      ville: formData.get("ville") as string,
      whatsapp: formData.get("whatsapp") as string,
      photo: photo,
    };

    try {
      const result = await sendInscriptionForm(data);
      if (result.success) {
        Swal.fire({
          title: "Succès !",
          text: "Votre inscription a bien été enregistrée.",
          icon: "success",
          confirmButtonColor: "#009e60",
        });
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Erreur Serveur",
        text: error.message || "Impossible de traiter l'inscription.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse text-slate-400 font-sans text-[10px] uppercase tracking-widest">Chargement...</div>
      </div>
    );
  }
  return (
    <>
      <SimpleHeader
        texte1={apiData?.header?.badge || t("header.badge")}
        texte2={apiData?.header?.titre1 || t("header.title")}
        texte3={apiData?.header?.titre2 || t("header.subtitle")}
        texte4={apiData?.header?.sousTitre || t("header.description")}
      />

      <section className="relative py-20 md:py-32 px-4 sm:px-6 bg-slate-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 opacity-[0.02] z-0 bg-repeat" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px] z-0" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#006837]/5 rounded-full blur-[120px] z-0" />

        <div className="relative z-10 max-w-7xl mx-auto lg:-mt-16">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Colonne Gauche : Introduction */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start lg:sticky lg:mt-[-20px] mt-[-50px]">
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#C5A059]" />
                <span className="text-[12px] lg:text-[16px]  uppercase font-extrabold tracking-widest text-[#C5A059]">
                  {apiData?.content?.badge || t("info.badge")}
                </span>
                <span className="w-12 h-[1px] bg-[#C5A059] lg:hidden" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] leading-tight mb-6 text-center lg:text-left">
                {apiData?.content?.title || t("info.title")}
              </h2>

              <p className="text-slate-500 font-sans text-base leading-relaxed hyphens-auto text-justify [text-justify:inner-character]">
                {apiData?.content?.description || t("info.title")}
              </p>

              
            </div>

            {/* Colonne Droite : Formulaire */}
            
            {isRegistrationOpen ? (<>
            <div className="lg:col-span-7 relative lg:mt-[-10px] mt-[-30px]">
              <div className="relative bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(10,31,68,0.12)] border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Civilité & Titre */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px]  text-slate-400 uppercase tracking-widest font-extrabold mb-3 block">
                        {t("form.labels.civility")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-user-check absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors" />
                        <select
                          name="civilite"
                          className="w-full font-sans pl-10 pr-10 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] appearance-none cursor-pointer transition-all"
                          required
                          defaultValue=""
                        >
                          <option value="" disabled>
                            {t("form.labels.civility")}
                          </option>
                          <option value="M.">{t("options.civility.m")}</option>
                          <option value="Mme">{t("options.civility.mme")}</option>
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none text-[10px]" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px]  text-slate-400 uppercase tracking-widest font-extrabold mb-3 block">
                        {t("form.labels.title")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-medal absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors" />
                       <select
  name="rang"
  className="w-full font-sans pl-10 pr-10 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] appearance-none cursor-pointer transition-all"
  defaultValue=""
>
  <option value="" disabled>
    {t("form.labels.title")}
  </option>

  {/* Génération dynamique des options basées sur tes clés JSON */}
  {[
    "pdg",
    "dg",
    "ceo",
    "amb",
    "min",
    "prof",
    "dr",
    "ing",
    "parle",
    "autre"
  ].map((key) => (
    <option key={key} value={key.toUpperCase()}>
      {t(`options.titles.${key}`)}
    </option>
  ))}
</select>
                        <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none text-[10px]" />
                      </div>
                    </div>
                  </div>

                  {/* Nom & Prénom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.lastName")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <input
                          name="nom"
                          required
                          type="text"
                          placeholder={t("form.placeholders.lastName")}
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] font-sans transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.firstName")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-user-tag absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <input
                          name="prenom"
                          required
                          type="text"
                          placeholder={t("form.placeholders.firstName")}
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] font-sans transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Organisation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.email")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <input
                          name="email"
                          required
                          type="email"
                          placeholder="EX: NOM@ENTREPRISE.GA"
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] font-sans transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.organization")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-building absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <input
                          name="organisation"
                          required
                          type="text"
                          placeholder={t("form.placeholders.organization")}
                          className="w-full font-sans pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secteur & Nationalité */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.sector")}
                      </label>
                      <div className="relative group">
                        <i className="fa-solid fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <select
                          name="secteur"
                          className="w-full pl-10 pr-10 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] font-sans appearance-none cursor-pointer transition-all"
                          defaultValue=""
                        >
                            <option value="" disabled>
                              {t("form.labels.sector")}
                            </option>

                            {/* Mapping des secteurs fournis par le client */}
                          {[
                            "gouvernement",
                            "diplomatie",
                            "administration",
                            "developpement",
                            "industrie",
                            "mines",
                            "commerce",
                            "it",
                            "communication",
                            "agribusiness",
                            "conseil",
                            "environnement",
                            "presse",
                            "autre"
                          ].map((key) => (
                            <option key={key} value={key.toUpperCase()}>
                              {t(`options.sectors.${key}`)}
                            </option>
                          ))}
                        </select>
                        <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold  text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.nationality")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-passport absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <input
                          name="nationalite"
                          required
                          type="text"
                          placeholder={t("form.labels.nationality")}
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] font-sans transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pays & Ville */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px]  text-slate-400 uppercase tracking-widest font-extrabold mb-3 block">
                        {t("form.labels.country")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-globe absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        
                        <input
                          name="pays"
                          required
                          type="text"
                          placeholder={t("form.labels.country")} 
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] font-sans transition-all"
                        />
                        
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px]  text-slate-400 uppercase tracking-widest font-extrabold mb-3 block">
                        {t("form.labels.city")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-city absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#0A1F44] transition-colors" />
                        <input
                          name="ville"
                          required
                          type="text"
                          placeholder={t("form.labels.city")}
                          className="w-full font-sans pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#0A1F44]/5 focus:border-[#0A1F44] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp & Photo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px]  text-slate-400 uppercase tracking-widest font-extrabold mb-3 block">
                        {t("form.labels.whatsapp")}
                      </label>
                      <div className="relative">
                        <i className="fa-brands fa-whatsapp absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[14px] group-focus-within:text-[#25D366] transition-colors" />
                        <input
                          name="whatsapp"
                          required
                          type="tel"
                          placeholder="EX: +241 00 00 00 00"
                          className="w-full font-sans pl-10 pr-4 py-4 bg-gray-50 border border-slate-100 rounded-xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-[#25D366]/10 focus:border-[#25D366] transition-all"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 block">
                        {t("form.labels.photo")}
                      </label>
                      <div className="relative">
                        <i className="fa-solid fa-camera absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] group-focus-within:text-[#C5A059] transition-colors" />
                        <input
                          name="photo"
                          required
                          type="file"
                          accept="image/*"
                          className="w-full font-sans pl-10 pr-4 py-[11px] bg-gray-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:ring-4 focus:ring-[#C5A059]/10 focus:border-[#C5A059] cursor-pointer file:mr-4 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[9px] file: file:bg-[#C5A059]/10 file:text-[#C5A059] hover:file:bg-[#C5A059]/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative group overflow-hidden w-full bg-[#009e60] text-white py-5 rounded-xl transition-all duration-500 shadow-xl hover:shadow-[#009e60]/20 active:scale-[0.98] disabled:opacity-70"
                  >
                    <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#006837] to-[#009e60] transition-all duration-500 group-hover:w-full"></div>
                    <span className="relative z-10 uppercase tracking-widest font-extrabold text-xs  flex items-center justify-center gap-3">
                      {isSubmitting ? "Traitement..." : t("form.submit")}
                      <i
                        className={`fa-solid ${isSubmitting ? "fa-spinner fa-spin" : "fa-paper-plane"} text-[10px] transition-transform`}
                      />
                    </span>
                  </button>
                </form>
              </div>
            </div>
            </>):(<>
            <div className="lg:col-span-7 relative">
  <div
    id="inscription"
    className="bg-blue-950/80 backdrop-blur-2xl border border-blue-500/20 p-6 md:p-8 lg:p-12 rounded-[2.5rem] shadow-2xl relative z-10 text-center"
  >
    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-[#C5A059]/20 rounded-full border border-[#C5A059]/40">
      <i className="fa-solid fa-circle-info text-[#C5A059] text-2xl animate-pulse"></i>
    </div>

    <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase leading-tight mb-2">
      {t("closed.title")}
    </h2>

    <p className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest mb-6">
      {/*t("closed.subtitle")*/}
    </p>

    <div className="space-y-4">
      <p className="text-slate-200 text-sm md:text-base leading-relaxed font-medium">
        {t("closed.mainText")}
      </p>

      <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
        {t("closed.secondaryText")}
      </p>

      <div className="py-4">
        <div className="h-[1px] w-12 bg-[#009e60] mx-auto mb-4"></div>
        <p className="text-white font-bold text-xs md:text-sm italic">
          {t("closed.footerText")}
        </p>
      </div>
    </div>

    
  </div>
</div>
            </>
          
          )}

          </div>
        </div>
      </section>
    </>
  );
}
