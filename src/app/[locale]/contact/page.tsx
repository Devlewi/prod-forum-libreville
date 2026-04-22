import { getMessages } from '@/app/lib/utils';
import Contact from '@/app/ui/Contact';
import { Metadata } from 'next';


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // 1. On charge le fichier JSON manuellement via ton utilitaire
  const messages = await getMessages(locale);
  
  // 2. On accède aux données (on utilise le chaînage optionnel ?. pour éviter les crashs)
  const title = messages?.Metadata?.contact?.title || "Forum de Libreville";
  const description = messages?.Metadata?.contact?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
  return <Contact locale={locale} />;
}