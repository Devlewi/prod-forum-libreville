import LeProgramme from '@/app/ui/LeProgramme';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // 1. Chargement des messages (JSON) selon la langue
  const messages = await getMessages(locale);
  
  // 2. Extraction des données Metadata (clé : programme)
  const title = messages?.Metadata?.programme?.title || "Forum de Libreville | Programme";
  const description = messages?.Metadata?.programme?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      // Construction de l'URL canonique propre à la langue
      canonical: `/${locale}/le-programme`,
    },
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params;

  // Injection de la locale dans le composant UI
  return <LeProgramme locale={locale} />;
}