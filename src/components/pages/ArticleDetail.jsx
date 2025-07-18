import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { Card, CardContent } from "@/components/atoms/Card";
import SocialShareButtons from "@/components/molecules/SocialShareButtons";
import ArticleCard from "@/components/molecules/ArticleCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { articleService } from "@/services/api/articleService";
import { cn } from "@/utils/cn";

const ArticleDetail = ({ className }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getCategoryVariant = (category) => {
    const categoryMap = {
      politics: "politics",
      business: "business", 
      technology: "technology",
      sports: "sports",
      entertainment: "entertainment",
    };
    return categoryMap[category.toLowerCase()] || "default";
  };

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [articleData, allArticles] = await Promise.all([
        articleService.getById(parseInt(id)),
        articleService.getAll()
      ]);

      if (!articleData) {
        setError("Article not found");
        return;
      }

      setArticle(articleData);
      
      // Get related articles from same category
      const related = allArticles
        .filter(a => a.Id !== articleData.Id && a.category === articleData.category)
        .slice(0, 3);
      setRelatedArticles(related);
      
      // Increment view count
      await articleService.update(articleData.Id, {
        ...articleData,
        views: articleData.views + 1
      });
      
    } catch (err) {
      setError("Failed to load article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await articleService.delete(article.Id);
        toast.success("Article deleted successfully");
        navigate("/");
      } catch (err) {
        toast.error("Failed to delete article");
      }
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

  if (!article) {
    return (
      <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
        <Error message="Article not found" />
      </div>
    );
  }

  return (
    <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", className)}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Article Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant={getCategoryVariant(article.category)} className="text-sm">
              {article.category}
            </Badge>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/editor/${article.Id}`)}
              >
                <ApperIcon name="Edit" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-error hover:text-error"
              >
                <ApperIcon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-4">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{format(new Date(article.publishDate), "MMMM d, yyyy")}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Eye" size={16} />
                <span>{article.views} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </div>
        </div>

        {/* Social Share */}
        <div className="border-t border-gray-200 pt-6 mb-8">
          <SocialShareButtons article={article} />
        </div>
      </motion.article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-display font-bold text-primary mb-6">
            Related Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard
                key={relatedArticle.Id}
                article={relatedArticle}
              />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default ArticleDetail;