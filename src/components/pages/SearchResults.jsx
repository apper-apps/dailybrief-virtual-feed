import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleGrid from "@/components/organisms/ArticleGrid";
import ViewToggle from "@/components/molecules/ViewToggle";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { articleService } from "@/services/api/articleService";
import { cn } from "@/utils/cn";

const SearchResults = ({ className }) => {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");

  const query = searchParams.get("q") || "";

  const searchArticles = async () => {
    try {
      setLoading(true);
      setError("");
      
      const allArticles = await articleService.getAll();
      
      // Simple search implementation
      const searchResults = allArticles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setArticles(searchResults);
    } catch (err) {
      setError("Failed to search articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchArticles();
    }
  }, [query]);

  if (loading) {
    return (
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
        <Error message={error} onRetry={searchArticles} />
      </div>
    );
  }

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Found {articles.length} {articles.length === 1 ? 'result' : 'results'} for "{query}"
          </p>
        </div>

        {/* Results */}
        {articles.length === 0 ? (
          <Empty 
            title="No results found"
            message={`No articles found matching "${query}". Try a different search term.`}
            actionText="Browse All Articles"
            actionPath="/"
          />
        ) : (
          <>
            {/* View Toggle */}
            <div className="flex justify-end mb-6">
              <ViewToggle view={view} onViewChange={setView} />
            </div>
            
            {/* Search Results Grid */}
            <ArticleGrid articles={articles} view={view} />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SearchResults;