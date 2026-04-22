"use client";

import React, { useEffect, useState } from "react";
import ProgramSection, { Sequence } from "./Components/ProgramSection";
import SimpleHeader from "./SimpleHeader";
import { fetchProgramData, ProgramData } from "../services/api";

export default function LeProgramme({ locale }: { locale: string }) {
  // --- ÉTATS ---
  const [apiData, setApiData] = useState<ProgramData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- CHARGEMENT DES DONNÉES DEPUIS L'API ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProgramData(locale);
        if (data) {
          setApiData(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du programme:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [locale]);

  // --- ÉCRAN DE CHARGEMENT ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400 font-serif uppercase tracking-widest text-[10px]">
          Chargement ...
        </div>
      </div>
    );
  }

  // --- GESTION SI AUCUNE DONNÉE ---
  if (!apiData) return null;

  /**
   * Transformation des cards WP vers le format Sequence attendu par le composant.
   * On adapte les couleurs hexadécimales pour qu'elles soient compatibles 
   * avec l'affichage (inline styles ou classes).
   */
  const sequences: Sequence[] = apiData.cards.map((card) => ({
    id: card.numero,
    title: card.titre,
    tag: card.tag,
    description: card.description,
    footer: card.footer,
    // Note: On passe la couleur hexadécimale (#123456) directement.
    // Votre composant ProgramSection devra l'utiliser en style={{ backgroundColor: bgColor }}
    bgColor: card.bgcolor, 
    hoverShadow: card.hovershadow,
  }));

  return (
    <>
      {/* En-tête dynamique venant de WordPress */}
      <SimpleHeader
        texte1={apiData.header.badge}
        texte2={apiData.header.titre1}
        texte3={apiData.header.titre2}
        texte4={apiData.header.sousTitre}
      />

      {/* Section programme dynamique */}
      <ProgramSection 
        title={apiData.details.titre}
        subtitle={apiData.details.sousTitre}
        details_badge={apiData.details.badge}
        data={sequences} 
      />
    </>
  );
}