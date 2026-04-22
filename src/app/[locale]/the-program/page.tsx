import LeProgramme from '@/app/ui/LeProgramme';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // 1. Chargement des messages selon la langue
  const messages = await getMessages(locale);
  
  // 2. Récupération des métadonnées avec valeurs par défaut
  const title = messages?.Metadata?.programme?.title || "Forum de Libreville | Programme";
  const description = messages?.Metadata?.programme?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      // Lien canonique dynamique (ex: /fr/le-programme ou /en/program)
      // Utilise ta ROUTES_MAP si tu as un slug différent en anglais
      canonical: `/${locale}/the-program`,
    },
  };
}

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params;

  // On passe la locale au composant pour qu'il puisse charger les données WP ou JSON
  return <LeProgramme locale={locale} />;
}