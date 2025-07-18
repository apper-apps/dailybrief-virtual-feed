import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Error = ({ message = "Something went wrong", onRetry, className }) => {
  return (
    <Card className={cn("max-w-md mx-auto text-center", className)}>
      <CardHeader>
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-error to-secondary rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </div>
        <CardTitle className="text-xl font-display text-gray-800">
          Oops! Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="primary" className="w-full">
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Error;