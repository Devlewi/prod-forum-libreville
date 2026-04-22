"use client";

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { decodeHtml, formatDate, getLocalizedLink } from '@/app/lib/utils';
import Link from 'next/link';

interface CategoryOption {
  label: string;
  value: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  categories: string[];
  date: string;
  image: string;
  slug: string;
}

interface BlogProps {
  articles: Article[];
  availableCategories: CategoryOption[]; 
  onSearchChange: (value: string) => void;
  onCategoryChange: (categories: string[]) => void;
  paginationData: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    onPageChange: (page: number) => void;
  };
  isLoading: boolean;
  selectedCategories: string[];
}

const BlogSection: React.FC<BlogProps> = ({ 
  articles, 
  availableCategories = [], 
  onSearchChange, 
  onCategoryChange,
  paginationData,
  isLoading,
  selectedCategories
}) => {
  const t = useTranslations("Actualites");
  const locale = useLocale(); 

  const handleToggleCategory = (categoryValue: string) => {
    const next = selectedCategories.includes(categoryValue)
      ? selectedCategories.filter(c => c !== categoryValue)
      : [...selectedCategories, categoryValue];
    onCategoryChange(next);
  };

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 mt-[-50px]">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#162554] mb-4">
            {t('header.titre1')} {t('header.titre2')}
          </h2>                    
          <div className="w-20 h-1 bg-[#C5A059]" />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- SIDEBAR --- */}
          <aside className="lg:w-80 lg:order-2 space-y-10">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#162554] mb-4">
                {t('sidebar.search')}
              </h3>
              <input 
                type="text"
                placeholder={t('sidebar.placeholder')}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 focus:outline-none focus:border-[#C5A059] font-sans text-sm transition-all text-slate-700"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#162554] mb-6">
                {t('sidebar.categories')}
              </h3>
              <div className="space-y-4">
                {Array.isArray(availableCategories) && availableCategories.length > 0 ? (
                  availableCategories.map((cat) => (
                    <label key={cat.value} className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          className="peer sr-only"
                          checked={selectedCategories.includes(cat.value)}
                          onChange={() => handleToggleCategory(cat.value)}
                        />
                        <div className="w-5 h-5 border-2 border-slate-200 rounded group-hover:border-[#C5A059] peer-checked:bg-[#C5A059] peer-checked:border-[#C5A059] transition-all duration-200" />
                        <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-[3px] pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="ml-3 text-sm font-sans text-slate-600 group-hover:text-[#162554] transition-colors">
                        {cat.label}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">{t('sidebar.no_categories')}</p>
                )}
              </div>
            </div>

            {selectedCategories.length > 0 && (
              <button 
                onClick={() => onCategoryChange([])} 
                className="text-[10px] font-bold text-[#C5A059] uppercase hover:underline"
              >
                {t('sidebar.reset')}
              </button>
            )}
          </aside>

          {/* --- GRILLE D'ARTICLES --- */}
          <div className="flex-1 lg:order-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                 <div className="w-10 h-10 border-4 border-slate-200 border-t-[#C5A059] rounded-full animate-spin"></div>
                 <p className="text-xs font-sans text-slate-400 uppercase tracking-widest">{t('status.loading')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.length > 0 ? (
                  articles.map((article) => (                    
                    <article key={article.id} className="group">
                      <Link 
                      href={`${getLocalizedLink(locale, "/actualites")}/${article.slug}`}
                      className="block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.5rem] mb-6 bg-slate-100 shadow-sm transition-all group-hover:shadow-xl">
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {article.categories.map(c => (
                            <span key={c} className="text-[9px] font-extrabold uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-[#162554] leading-tight group-hover:text-[#C5A059] transition-colors line-clamp-2 min-h-[3.2rem]">
  {decodeHtml(article.title)}
</h3>
                        <p className="text-slate-500 font-sans text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
  {decodeHtml(article.excerpt)}
</p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase">
                          {formatDate(article.date, locale)}
                        </p>
                      </div>
                      </Link>                      
                    </article>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[3rem]">
                    <p className="text-slate-400 font-sans">{t('status.no_results')}</p>
                  </div>
                )}
              </div>
            )}

            {/* --- PAGINATION --- */}
            {paginationData.totalPages > 1 && (
              <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px]  font-sans text-slate-400 uppercase tracking-widest">
                  {/* Utilisation de la clé avec paramètre count pour "Total : X articles" */}
                  {t('pagination.total', { count: paginationData.totalPosts })}
                </p>

                <nav className="flex items-center gap-2">
                  <button 
                    disabled={paginationData.currentPage === 1}
                    onClick={() => paginationData.onPageChange(paginationData.currentPage - 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-[#0A1F44] hover:text-white disabled:opacity-30 transition-all"
                  >
                    <i className="fa-solid fa-arrow-left-long text-[10px]" />
                  </button>

                  <div className="flex items-center gap-1.5 px-2">
                    {[...Array(paginationData.totalPages)].map((_, i) => (
                      <button 
                        key={i + 1}
                        onClick={() => paginationData.onPageChange(i + 1)}
                        className={`w-10 h-10 rounded-xl text-[11px]  font-sans transition-all ${
                          paginationData.currentPage === i + 1 
                          ? 'bg-[#0A1F44] text-white' 
                          : 'border border-slate-100 text-slate-400 hover:bg-slate-50'
                        }`}
                      >
                        {i + 1 < 10 ? `0${i + 1}` : i + 1}
                      </button>
                    ))}
                  </div>

                  <button 
                    disabled={paginationData.currentPage === paginationData.totalPages}
                    onClick={() => paginationData.onPageChange(paginationData.currentPage + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:bg-[#0A1F44] hover:text-white disabled:opacity-30 transition-all"
                  >
                    <i className="fa-solid fa-arrow-right-long text-[10px]" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;