import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No articles found", 
  message = "Start creating your first article to see it here.",
  actionText = "Create Article",
  actionPath = "/editor",
  className 
}) => {
  return (
    <Card className={cn("max-w-md mx-auto text-center", className)}>
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-info rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="PenTool" size={32} className="text-white" />
        </div>
        <CardTitle className="text-xl font-display text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{message}</p>
        <Link to={actionPath}>
          <Button variant="primary" className="w-full">
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Empty;