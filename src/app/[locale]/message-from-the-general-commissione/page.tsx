import MotComissaireGeneraleUI from '@/app/ui/MotComissaireGeneraleUI';
import { Metadata } from 'next';
import { getMessages } from '@/app/lib/utils';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages(locale);
  
  const title = messages?.Metadata?.mot?.title || "Forum de Libreville | Le Mot de la Commissaire Générale";
  const description = messages?.Metadata?.mot?.description || "";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/${locale}/le-mot-de-la-commissaire-generale`,
    },
  };
}

export default async function MotCommissairePage({ params }: Props) {
  const { locale } = await params;

  return <MotComissaireGeneraleUI locale={locale} />;
}