
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';
import MinisteresEnChargeUI from '@/app/ui/MinisteresEnChargeUI';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  // Utilisation des clés "ministere" que nous avons définies dans ton JSON
  const title = messages?.Metadata?.ministere?.title || "Forum de Libreville | Parties prenantes";
  const description = messages?.Metadata?.ministere?.description || "Découvrez les institutions et ministères qui soutiennent le Forum de Libreville.";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: locale === 'fr' 
        ? `/${locale}/parties-prenantes` 
        : `/${locale}/stakeholders`,
    },
  };
}

export default async function MinisteresEnChargePage({ params }: Props) {
  const { locale } = await params;

  // On appelle l'UI dédiée aux ministères
  return <MinisteresEnChargeUI locale={locale} />;
}