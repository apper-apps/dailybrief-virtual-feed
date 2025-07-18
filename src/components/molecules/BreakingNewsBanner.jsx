import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const BreakingNewsBanner = ({ article, className }) => {
  if (!article) return null;

  return (
    <div className={cn("bg-gradient-to-r from-secondary to-error text-white py-3", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Zap" size={16} className="breaking-news" />
              <span className="font-bold text-sm uppercase tracking-wide">Breaking News</span>
            </div>
            <Link
              to={`/article/${article.Id}`}
              className="text-sm hover:underline font-medium"
            >
              {article.title}
            </Link>
          </div>
          <ApperIcon name="ChevronRight" size={16} />
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;