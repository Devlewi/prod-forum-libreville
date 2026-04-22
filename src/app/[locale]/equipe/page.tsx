import Equipe from '@/app/ui/Equipe';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  // Récupération des traductions (assure-toi que ce chemin existe dans tes fichiers JSON)
  const title = messages?.Metadata?.equipe?.title || "Forum de Libreville | L'Équipe du Forum";
  const description = messages?.Metadata?.equipe?.description || "Capital humain : découvrez la synergie d'experts et de décideurs passionnés.";

  return {
    title: title,
    description: description,
    alternates: {
      // On dynamise l'URL canonique avec la locale
      canonical: `/${locale}/equipe`,
    },
  };
}

export default async function EquipePage({ params }: Props) {
  // On attend la résolution des params pour récupérer la locale
  const { locale } = await params;

  // On passe la locale au composant UI pour qu'il puisse charger ses propres traductions
  return <Equipe locale={locale} />;
}