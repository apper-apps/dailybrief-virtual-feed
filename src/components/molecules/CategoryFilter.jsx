import React from "react";
import { Link, useLocation } from "react-router-dom";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const CategoryFilter = ({ categories, className }) => {
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Link to="/">
        <Badge
          variant={!currentCategory ? "primary" : "default"}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          All
        </Badge>
      </Link>
      {categories.map((category) => (
        <Link key={category.Id} to={`/?category=${category.slug}`}>
          <Badge
            variant={currentCategory === category.slug ? category.slug : "default"}
            className="cursor-pointer hover:scale-105 transition-transform"
          >
            {category.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;