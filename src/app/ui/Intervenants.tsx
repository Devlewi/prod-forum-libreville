import { fetchIntervenantsData } from '@/app/services/api';
import SpeakersSection, { Speaker } from "./Components/SpeakersSection"; // Importe bien le type Speaker
import SimpleHeader from "./SimpleHeader";

export default async function Intervenants({ locale }: { locale: string }) {
  const data = await fetchIntervenantsData(locale);

  if (!data) return null;

  return (
    <>
      <SimpleHeader
        texte1={data.header.badge}
        texte2={data.header.titre1}
        texte3={data.header.titre2}
        texte4={data.header.sousTitre}
      />

      <SpeakersSection
        title={data.details.titre}
        subtitle={data.details.sousTitre}
        badge={data.details.badge} // Ajout du badge dynamique
        speakers={data.speakers.map((s, index) => ({
          id: index,
          name: s.nom,
          role: s.role,
          organization: s.organization,
          image: s.image,
          // Correction ici : on force le type string vers le type précis attendu
          category: s.categorie as Speaker['category'], 
          color: s.color || "#162554"
        }))} 
      />
    </>
  );
}