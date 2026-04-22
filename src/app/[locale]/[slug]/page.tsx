import { fetchPageBySlug } from '@/app/services/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

/**
 * GÉNÉRATION DYNAMIQUE DES MÉTADONNÉES
 * Format : Forum de Libreville | [Titre de la page]
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const data = await fetchPageBySlug(slug, locale);

  // Définition du nom de base selon la langue
  const baseTitle = locale === 'en' ? 'Libreville Forum' : 'Forum de Libreville';

  if (!data || data.length === 0) {
    return { title: `${baseTitle} | Page non trouvée` };
  }

  const page = data[0];

  // Nettoyage du titre WordPress (enlève les balises HTML et décode les entités)
  const cleanTitle = page.title.rendered
    .replace(/<\/?[^>]+(>|$)/g, "") // Supprime les balises <strong> etc.
    .replace(/&#8217;/g, "'")       // Corrige les apostrophes
    .replace(/&nbsp;/g, " ");       // Corrige les espaces

  return {
    title: `${baseTitle} | ${cleanTitle}`,
    description: `Découvrez la page ${cleanTitle} sur le site officiel du ${baseTitle}.`,
  };
}

/**
 * COMPOSANT DE PAGE PRINCIPAL
 */
export default async function CMSPage({ params }: Props) {
  const { locale, slug } = await params;
  const data = await fetchPageBySlug(slug, locale);

  if (!data || data.length === 0) return notFound();

  const page = data[0];

  return (
    <main className="container mx-auto px-4 py-24 max-w-4xl min-h-screen">
      <header className="mb-10">
        <h1 
          className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        />
        <div className="h-1 w-20 bg-[#C5A059] mt-6"></div> {/* Petite barre dorée rappelant le forum */}
      </header>

      <article
        className="wp-content prose prose-slate max-w-none 
          prose-headings:font-serif prose-headings:text-slate-800
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-justify
          prose-a:text-[#C5A059] font-sans"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </main>
  );
}