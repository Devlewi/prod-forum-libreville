import { getMessages } from '@/app/lib/utils';
import Intervenants from '@/app/ui/Intervenants';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // 1. Chargement des messages selon la langue (fr.json ou en.json)
  const messages = await getMessages(locale);
  
  // 2. Récupération des données (clé : intervenants)
  // Assurez-vous que cette clé existe dans vos fichiers JSON sous Metadata
  const title = messages?.Metadata?.intervenants?.title || "Forum de Libreville | Les Intervenants";
  const description = messages?.Metadata?.intervenants?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      // URL canonique dynamique avec la locale
      canonical: `/${locale}/les-intervenants`,
    },
  };
}

export default async function IntervenantsPage({ params }: Props) {
  const { locale } = await params;

  // On passe la locale au composant UI pour traduire le contenu interne
  return <Intervenants locale={locale} />;
}