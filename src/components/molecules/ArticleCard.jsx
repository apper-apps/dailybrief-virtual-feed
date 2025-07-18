import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ArticleCard = ({ article, variant = "default", className }) => {
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

  if (variant === "featured") {
    return (
      <Link to={`/article/${article.Id}`}>
        <Card className={cn("card-hover overflow-hidden", className)}>
          <div className="relative">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant={getCategoryVariant(article.category)}>
                {article.category}
              </Badge>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="font-display text-xl leading-tight">
              {article.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{format(new Date(article.publishDate), "MMM d, yyyy")}</span>
              <div className="flex items-center space-x-1">
                <ApperIcon name="Eye" size={14} />
                <span>{article.views}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.Id}`}>
      <Card className={cn("card-hover overflow-hidden", className)}>
        <div className="flex">
          <div className="w-32 h-24 flex-shrink-0">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant={getCategoryVariant(article.category)} className="text-xs">
                {article.category}
              </Badge>
              <span className="text-xs text-gray-500">
                {format(new Date(article.publishDate), "MMM d")}
              </span>
            </div>
            <h3 className="font-display font-medium text-sm leading-tight mb-2">
              {article.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <ApperIcon name="Eye" size={12} className="mr-1" />
              <span>{article.views}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;