import React from "react";
import ArticleCard from "@/components/molecules/ArticleCard";
import { cn } from "@/utils/cn";

const ArticleGrid = ({ articles, view = "grid", className }) => {
  if (view === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {articles.map((article) => (
          <ArticleCard key={article.Id} article={article} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {articles.map((article) => (
        <ArticleCard key={article.Id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;