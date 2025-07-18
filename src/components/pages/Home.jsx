import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleCard from "@/components/molecules/ArticleCard";
import ArticleGrid from "@/components/organisms/ArticleGrid";
import Sidebar from "@/components/organisms/Sidebar";
import CategoryFilter from "@/components/molecules/CategoryFilter";
import ViewToggle from "@/components/molecules/ViewToggle";
import BreakingNewsBanner from "@/components/molecules/BreakingNewsBanner";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { articleService } from "@/services/api/articleService";
import { categoryService } from "@/services/api/categoryService";
import { cn } from "@/utils/cn";

const Home = ({ className }) => {
  const [searchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [breakingNews, setBreakingNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("grid");

  const selectedCategory = searchParams.get("category");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [articlesData, categoriesData] = await Promise.all([
        articleService.getAll(),
        categoryService.getAll()
      ]);

      // Filter articles by category if selected
      const filteredArticles = selectedCategory
        ? articlesData.filter(article => article.category.toLowerCase() === selectedCategory.toLowerCase())
        : articlesData;

      setArticles(filteredArticles);
      setCategories(categoriesData);
      
      // Set recent articles (last 5)
      const sortedByDate = [...articlesData].sort((a, b) => 
        new Date(b.publishDate) - new Date(a.publishDate)
      );
      setRecentArticles(sortedByDate.slice(0, 5));
      
      // Set trending articles (highest views)
      const sortedByViews = [...articlesData].sort((a, b) => b.views - a.views);
      setTrendingArticles(sortedByViews.slice(0, 3));
      
      // Set breaking news (most recent with high views)
      const breaking = sortedByDate.find(article => article.views > 1000);
      setBreakingNews(breaking || null);
      
    } catch (err) {
      setError("Failed to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

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
        <Error message={error} onRetry={loadData} />
      </div>
    );
  }

  const featuredArticle = articles.find(article => article.views > 500) || articles[0];
  const remainingArticles = articles.filter(article => article.Id !== featuredArticle?.Id);

  return (
    <div className={cn("", className)}>
      {/* Breaking News Banner */}
      {breakingNews && <BreakingNewsBanner article={breakingNews} />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Filter */}
            <CategoryFilter categories={categories} className="mb-6" />
            
            {/* Featured Article */}
            {featuredArticle && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <ArticleCard article={featuredArticle} variant="featured" />
              </motion.div>
            )}
            
            {/* Articles Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-display font-bold text-primary">
                  {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News` : "Latest News"}
                </h2>
                <ViewToggle view={view} onViewChange={setView} />
              </div>
              
              {remainingArticles.length === 0 ? (
                <Empty 
                  title="No articles found"
                  message={selectedCategory ? `No articles found in ${selectedCategory} category.` : "No articles available."}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ArticleGrid articles={remainingArticles} view={view} />
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80">
            <Sidebar 
              recentArticles={recentArticles}
              trendingArticles={trendingArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;