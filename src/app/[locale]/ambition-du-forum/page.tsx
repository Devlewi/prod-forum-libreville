import PhilosophieDuForumUI from '@/app/ui/PhilosophieDuForumUI';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  // On récupère les traductions depuis le JSON (ajuste le chemin si besoin)
  const title = messages?.Metadata?.philosophie?.title || "Forum de Libreville | Vision et Philosophie";
  const description = messages?.Metadata?.philosophie?.description || "Découvrez les fondements et les ambitions du Forum de Libreville.";

  return {
    title: title,
    description: description,
    alternates: {
      // Dynamise l'URL canonique avec la locale
      canonical: `/${locale}/philosophie-du-forum`,
    },
  };
}

export default async function PhilosophieForumPage({ params }: Props) {
  // Extraction de la locale pour la passer au composant UI
  const { locale } = await params;

  return <PhilosophieDuForumUI locale={locale} />;
}