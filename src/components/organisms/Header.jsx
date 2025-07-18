import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

const Header = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Politics", path: "/?category=politics" },
    { name: "Business", path: "/?category=business" },
    { name: "Technology", path: "/?category=technology" },
    { name: "Sports", path: "/?category=sports" },
    { name: "Entertainment", path: "/?category=entertainment" },
  ];

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/" && !location.search;
    }
    return location.pathname + location.search === path;
  };

  return (
    <header className={cn("bg-white shadow-sm sticky top-0 z-50", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-secondary to-error text-white p-2 rounded-lg">
              <ApperIcon name="Newspaper" size={24} />
            </div>
            <span className="font-display text-2xl font-bold text-primary">
              DailyBrief
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  isActiveLink(item.path) ? "text-accent" : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search and Create Button */}
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar className="w-64" />
            <Link to="/editor">
              <Button variant="primary" size="sm">
                <ApperIcon name="Plus" size={16} className="mr-1" />
                Create
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-3">
              <SearchBar className="mb-3" />
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                    isActiveLink(item.path)
                      ? "bg-accent text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/editor" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  <ApperIcon name="Plus" size={16} className="mr-1" />
                  Create Article
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;