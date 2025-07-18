import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const SearchBar = ({ className, onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      if (onSearch) onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex-1">
        <Input
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
        />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        >
          <ApperIcon name="Search" size={16} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;