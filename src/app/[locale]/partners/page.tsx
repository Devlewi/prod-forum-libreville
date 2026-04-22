import Partenaires from '@/app/ui/Partenaires';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  // Récupération dynamique depuis le JSON
  const title = messages?.Metadata?.partenaires?.title || "Forum de Libreville | Nos Partenaires";
  const description = messages?.Metadata?.partenaires?.description || "Découvrez les institutions et entreprises engagées pour la réussite du Forum de Libreville.";

  return {
    title: title,
    description: description,
    alternates: {
      // On dynamise l'URL canonique
      canonical: `/${locale}/partenaires`,
    },
  };
}

export default async function PartenairesPage({ params }: Props) {
  const { locale } = await params;

  // On passe la locale au composant UI
  return <Partenaires locale={locale} />;
}