import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { articleService } from "@/services/api/articleService";
import { cn } from "@/utils/cn";

const ArticleEditor = ({ article, onSave, className }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    featuredImage: article?.featuredImage || "",
    category: article?.category || "politics",
    author: article?.author || "Admin",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "politics", label: "Politics" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "entertainment", label: "Entertainment" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const articleData = {
        ...formData,
        publishDate: new Date().toISOString(),
        views: article?.views || 0,
      };

      if (article) {
        await articleService.update(article.Id, articleData);
        toast.success("Article updated successfully!");
      } else {
        await articleService.create(articleData);
        toast.success("Article created successfully!");
      }

      if (onSave) {
        onSave();
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to save article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("max-w-4xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="font-display text-2xl">
          {article ? "Edit Article" : "Create New Article"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter article title..."
              required
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Write a brief summary..."
              rows={3}
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input
              id="featuredImage"
              name="featuredImage"
              type="url"
              value={formData.featuredImage}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name..."
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your article content here..."
              rows={12}
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" size={16} className="mr-2" />
                  {article ? "Update" : "Publish"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleEditor;