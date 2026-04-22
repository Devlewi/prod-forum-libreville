import { getMessages } from '@/app/lib/utils';
import Actualites from '@/app/ui/Actualites';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // 1. Chargement des messages pour la locale actuelle
  const messages = await getMessages(locale);
  
  // 2. Récupération sécurisée des données de traduction
  const title = messages?.Metadata?.actualites?.title || "Forum de Libreville | Actualités";
  const description = messages?.Metadata?.actualites?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      // On dynamique l'URL canonique avec la locale
      canonical: `/${locale}/news`,
    },
  };
}

export default function ActualitesPage() {
  return <Actualites />;
}