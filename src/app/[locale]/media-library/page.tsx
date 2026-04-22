import Mediatheque from '@/app/ui/Mediatheque';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // 1. Chargement manuel des messages
  const messages = await getMessages(locale);
  
  // 2. Extraction des textes (ajoute ces clés dans tes JSON fr.json et en.json)
  // J'utilise des valeurs de secours (fallbacks) au cas où la clé n'est pas encore créée
  const title = messages?.Metadata?.mediatheque?.title || "Forum de Libreville | Médiathèque & Archives";
  const description = messages?.Metadata?.mediatheque?.description || "Archives & Multimédia : explorez nos galeries exclusives.";

  return {
    title,
    description,
    alternates: {
      // On dynamique le lien canonique avec la locale
      canonical: `/${locale}/mediatheque`,
    },
  };
}

export default function MediathequePage() {
  return <Mediatheque />;
}