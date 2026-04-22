/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link";

interface Article {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category: string;
  link: string; 
}

interface SectionQuatreProps {
  sectionquatre: {
    titre: string;
    sous_titre: string;
    articles: Article[];
  };
  lang: "fr" | "en";
}

const FourfthPartSection = ({ sectionquatre, lang }: SectionQuatreProps) => {
  if (!sectionquatre) return null;

  const t = {
    fr: {
      viewAll: "Voir tout le blog",
      readMore: "Lire",
      blogPath: "/fr/actualites",
    },
    en: {
      viewAll: "View all blog posts",
      readMore: "Read more",
      blogPath: "/en/news",
    }
  };

  const currentT = t[lang] || t.fr;

  return (
    <section className="py-24 max-w-7xl mx-auto px-3 lg:px-0 mt-[-0px] lg:mt-[-10px]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between mb-12 gap-6 text-center md:text-left mt-[-50px]">
        <div>
          <span className="text-[#009e60]  text-xs uppercase font-extrabold block mb-2">
            {sectionquatre.sous_titre}
          </span>
          <h2 className="text-2xl  text-blue-950 uppercase font-extrabold">
            {sectionquatre.titre}
          </h2>
        </div>
        <div className="h-[2px] flex-grow mx-8 bg-gray-200 hidden md:block mb-4" />
        
        <Link
          href={currentT.blogPath}
          className="text-[10px]  uppercase font-extrabold text-blue-900 hover:text-[#009e60] transition-colors md:mb-3  lg:mt-[0px] mt-[-10px]"
        >
          {currentT.viewAll} <i className="fa-solid fa-arrow-right ml-2" />
        </Link>
      </div>

      {/* GRILLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionquatre.articles?.map((article) => {
          
          const localHref = lang === "en" 
            ? `/en/news/${article.slug}` 
            : `/fr/actualites/${article.slug}`;

          return (
            <Link 
              key={article.id} 
              href={localHref}
              className="news-card group bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-50 transition-all duration-300 hover:shadow-2xl flex flex-col hover:-translate-y-1"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative overflow-hidden h-64">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <span className="absolute top-4 font-extrabold left-4 bg-blue-900 text-white text-[10px]  uppercase px-3 py-1 rounded-full flex items-center gap-1 z-10">
                  <i className="fa-solid fa-tag" /> {article.category}
                </span>
              </div>

              {/* CONTENT CONTAINER */}
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-[10px] font-sans text-slate-400 font-bold uppercase mb-2 flex items-center gap-1">
                  <i className="fa-regular fa-calendar" /> {article.date}
                </p>
                <h3 
  className="text-md  text-blue-950 uppercase group-hover:text-green-600 transition-colors mb-3 line-clamp-2 min-h-[3rem]  hyphens-auto text-justfy [text-justify:inner-character] font-extrabold"
  dangerouslySetInnerHTML={{ __html: article.title }}
/>
                <div className="text-slate-500 text-sm font-sans mb-6 flex-grow ">
                  <p className="[text-justify:inner-character] line-clamp-2 hyphens-auto " dangerouslySetInnerHTML={{ __html: article.excerpt }} />
                </div>
                
                {/* VISUAL BUTTON (Juste une div car le lien est global) */}
                <div className="text-xs font-extrabold uppercase text-blue-900 flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                  {currentT.readMore}
                  <i className="fa-solid fa-arrow-right-long text-green-500" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FourfthPartSection;