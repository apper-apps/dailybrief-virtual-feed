import React from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const SocialShareButtons = ({ article, className }) => {
  const shareUrl = `${window.location.origin}/article/${article.Id}`;
  const shareText = `${article.title} - ${article.excerpt}`;

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
    toast.success("Opening Facebook share dialog...");
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a direct share API, so we'll copy the link
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    toast.success("Content copied! Paste it in your Instagram story or post.");
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
    toast.success("Opening Twitter share dialog...");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <span className="text-sm font-medium text-gray-600">Share:</span>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleFacebookShare}
          className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          <ApperIcon name="Facebook" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleInstagramShare}
          className="text-pink-600 hover:bg-pink-50 hover:text-pink-700"
        >
          <ApperIcon name="Instagram" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleTwitterShare}
          className="text-blue-400 hover:bg-blue-50 hover:text-blue-500"
        >
          <ApperIcon name="Twitter" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopyLink}
          className="text-gray-600 hover:bg-gray-50 hover:text-gray-700"
        >
          <ApperIcon name="Copy" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SocialShareButtons;