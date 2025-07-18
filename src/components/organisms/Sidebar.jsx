import React from "react";
import ArticleCard from "@/components/molecules/ArticleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Sidebar = ({ recentArticles, trendingArticles, className }) => {
  return (
    <aside className={cn("space-y-6", className)}>
      {/* Trending Articles */}
      {trendingArticles && trendingArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display">Trending</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {trendingArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.Id} article={article} variant="compact" />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Articles */}
      {recentArticles && recentArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display">Recent</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentArticles.slice(0, 5).map((article) => (
              <ArticleCard key={article.Id} article={article} variant="compact" />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-accent to-info text-white">
        <CardHeader>
          <CardTitle className="text-lg font-display text-white">
            Stay Updated
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white/90 mb-4">
            Get the latest news delivered to your inbox daily.
          </p>
          <div className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-accent px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

export default Sidebar;