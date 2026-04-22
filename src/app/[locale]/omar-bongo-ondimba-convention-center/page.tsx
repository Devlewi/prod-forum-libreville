import PalaisOmarBongo from '@/app/ui/PalaisOmarBongo';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Génération dynamique des métadonnées localisées
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  // Récupération des traductions depuis le JSON (Metadata.palais)
  const title = messages?.Metadata?.palais?.title || "Forum de Libreville | Le Palais des Congrès";
  const description = messages?.Metadata?.palais?.description || "Découvrez le prestigieux Palais des congrès Omar Bongo Ondimba.";

  return {
    title: title,
    description: description,
    alternates: {
      // On dynamise l'URL canonique selon la locale et ton ROUTES_MAP
      canonical: `/${locale}/${locale === 'fr' ? 'le-palais-des-congres-omar-bongo-ondimba' : 'omar-bongo-ondimba-convention-center'}`,
    },
  };
}

export default async function PalaisPage({ params }: Props) {
  // On récupère la locale des paramètres de l'URL
  const { locale } = await params;

  // On injecte la locale dans le composant UI pour le fetch API et les traductions
  return <PalaisOmarBongo locale={locale} />;
}