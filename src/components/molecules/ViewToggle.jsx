import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ViewToggle = ({ view, onViewChange, className }) => {
  return (
    <div className={cn("flex items-center space-x-1 bg-gray-100 rounded-lg p-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("grid")}
        className={cn(
          "h-8 w-8 p-0",
          view === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
        )}
      >
        <ApperIcon name="Grid3X3" size={14} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("list")}
        className={cn(
          "h-8 w-8 p-0",
          view === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
        )}
      >
        <ApperIcon name="List" size={14} />
      </Button>
    </div>
  );
};

export default ViewToggle;