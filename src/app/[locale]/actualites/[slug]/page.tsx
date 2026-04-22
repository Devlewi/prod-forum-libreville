import { fetchArticleBySlug } from '@/app/services/api';
import ArticleDetailClient from '@/app/ui/Components/ArticleDetailClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';


type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// SEO dynamique basé sur les données de l'article
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await fetchArticleBySlug(slug, locale);

  if (!article) return { title: "Article non trouvé" };

  return {
    title: `Forum de Libreville | ${article.title}`,
    description: article.content.substring(0, 160).replace(/<[^>]*>/g, ''), // Nettoyage sommaire du HTML pour la meta desc
    alternates: {
      canonical: `/${locale}/actualites/${slug}`,
    },
    openGraph: {
      images: [article.featured_image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  
  // Fetch des données sur le serveur
  const article = await fetchArticleBySlug(slug, locale);

  // Si l'article n'existe pas, Next affiche la page 404
  if (!article) {
    notFound();
  }

  return <ArticleDetailClient article={article} locale={locale} />;
}