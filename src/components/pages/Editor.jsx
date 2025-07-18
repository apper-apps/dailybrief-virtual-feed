import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ArticleEditor from "@/components/organisms/ArticleEditor";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { articleService } from "@/services/api/articleService";
import { cn } from "@/utils/cn";

const Editor = ({ className }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  const loadArticle = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError("");
      
      const articleData = await articleService.getById(parseInt(id));
      if (!articleData) {
        setError("Article not found");
        return;
      }
      
      setArticle(articleData);
    } catch (err) {
      setError("Failed to load article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
        <Error message={error} onRetry={loadArticle} />
      </div>
    );
  }

  return (
    <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ArticleEditor article={article} />
      </motion.div>
    </div>
  );
};

export default Editor;