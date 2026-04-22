/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
//import { useTranslations } from 'next-intl';
import { formatDate, decodeHtml } from '@/app/lib/utils';
import { useRouter } from 'next/navigation'; // Import pour le retour arrière
import ShareButtons from './ShareButtons';

interface ArticleDetailClientProps {
  article: any; 
  locale: string;
}

const ArticleDetailClient: React.FC<ArticleDetailClientProps> = ({ article, locale }) => {
  //const t = useTranslations("Actualites");
  const router = useRouter(); // Initialisation du router
  //const [shareUrl, setShareUrl] = React.useState("");

  



  return (
    <article className="py-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Bouton Retour arrière intelligent */}
        <button 
          onClick={() => router.back()} // Garde en mémoire la page (ex: page 2)
          className="group inline-flex items-center gap-2 text-[10px]  uppercase tracking-widest text-slate-400 hover:text-[#162554] transition-all mb-12 font-extrabold"
        >
          <i className="fa-solid fa-arrow-left-long transition-transform group-hover:-translate-x-1" />
          {locale === 'fr' ? "Retour aux articles" : "Back"}
        </button>

        <header className="mb-12">
          {/* Catégories */}
          {article.categories && Array.isArray(article.categories) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.categories.map((cat: any, i: number) => (
                <span 
                  key={i} 
                  className="text-[10px]  uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full font-extrabold"
                >
                  {typeof cat === 'string' ? cat : decodeHtml(cat.name)}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-[#162554] mb-8">
            {decodeHtml(article.title)}
          </h1>

          <div className="flex items-center gap-6">
            <p className="text-slate-400 font-extrabold text-[10px] uppercase tracking-[0.2em]">
              {formatDate(article.date, locale)}
            </p>
          </div>
        </header>

        {/* Image à la une */}
        {article.featured_image && (
          <div className="relative aspect-video rounded-[0.4rem] overflow-hidden mb-6 shadow-2xl shadow-slate-200">
            <img 
              src={article.featured_image} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Corps de l'article */}
        <div className="flex flex-col gap-12">
          <div 
            className="font-sans text-lg leading-relaxed text-slate-600 
            prose prose-slate prose-headings:text-[#162554] prose-headings:font-bold
            prose-strong:text-[#162554] prose-a:text-[#C5A059] prose-img:rounded-3xl
            max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* SECTION PARTAGE */}
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {locale === 'fr' ? "Partager cet article" : "Share this article"}
            </p>
            
            <div className="flex items-center gap-4">              
              
              {/* Remplacez l'appel du composant par ceci pour tester */}
<ShareButtons 
  post={{
    title: article.title?.rendered || article.title, // Gère le format WP (rendered)
    slug: article.slug || article.id?.toString(),    // Fallback sur l'ID si le slug manque
    link: "" 
  }} 
  locale={locale} 
  singulararticle="actualites" 
/>

              
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleDetailClient;