import Thematique from '@/app/ui/Thematique';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  const title = messages?.Metadata?.thematique?.title || "Forum de Libreville | Thématique";
  const description = messages?.Metadata?.thematique?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/${locale}/la-thematique`,
    },
  };
}

// Correction ici : on récupère params et on passe la locale au composant
export default async function ThematiquePage({ params }: Props) {
  const { locale } = await params;

  return <Thematique locale={locale} />;
}