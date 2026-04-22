"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import BlogSection, { Article } from "./Components/BlogSection";
import SimpleHeader from "./SimpleHeader";
import { fetchArticles, fetchCategories } from "../services/api"; 

export default function Actualites() {
  const t = useTranslations("Actualites");
  const locale = useLocale();

  // --- ÉTATS ---
  const [articles, setArticles] = useState<Article[]>([]);
  // On initialise avec un tableau vide pour éviter le crash du .map() dans BlogSection
  const [categories, setCategories] = useState<{label: string; value: string}[]>([]); 
  const [loading, setLoading] = useState(true);
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // --- 1. CHARGEMENT DES CATÉGORIES ---
  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const data = await fetchCategories(locale);
        if (isMounted) setCategories(data || []);
      } catch (error) {
        console.error("Erreur chargement catégories:", error);
      }
    };
    loadCategories();
    return () => { isMounted = false; };
  }, [locale]);

  // --- 2. CHARGEMENT DES ARTICLES ---
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      try {
        const data = await fetchArticles({
          lang: locale,
          page: pagination.currentPage,
          search: searchTerm,
          categories: selectedCategories
        });

        if (data) {
          setArticles(data.articles || []);
          setPagination(prev => ({
            ...prev,
            totalPages: data.total_pages || 1,
            totalPosts: data.total_posts || 0
          }));
        }
      } catch (error) {
        console.error("Erreur chargement articles:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(loadArticles, 400); // Délai légèrement réduit pour la réactivité
    return () => clearTimeout(timeoutId);
  }, [locale, pagination.currentPage, searchTerm, selectedCategories]);

  // --- HANDLERS ---
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset page quand on cherche
  };

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset page quand on filtre
  };

  return (
    <>
      <SimpleHeader
        texte1={t('header.badge')}
        texte2={t('header.titre1')}
        texte3={t('header.titre2')}
        texte4={t('header.sousTitre')}
      />

      <BlogSection
        articles={articles} 
        availableCategories={categories} 
        selectedCategories={selectedCategories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        paginationData={{
          ...pagination,
          onPageChange: (newPage: number) => setPagination(prev => ({ ...prev, currentPage: newPage }))
        }}
        isLoading={loading}
      />
    </>
  );
}