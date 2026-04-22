import Inscription from '@/app/ui/Inscription';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // Chargement des messages pour la langue actuelle
  const messages = await getMessages(locale);
  
  // Accès aux traductions des métadonnées
  const title = messages?.Metadata?.inscription?.title || "Forum de Libreville | Inscription";
  const description = messages?.Metadata?.inscription?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      // On conserve le format /locale/inscription
      canonical: `/${locale}/inscription`,
    },
  };
}

export default async function InscriptionPage({ params }: Props) {
const { locale } = await params;
  return <Inscription locale={locale}  />;
}