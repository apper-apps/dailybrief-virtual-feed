import React from "react";
import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
    { name: "Terms", path: "/terms" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", url: "#" },
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "Instagram", icon: "Instagram", url: "#" },
    { name: "LinkedIn", icon: "Linkedin", url: "#" },
  ];

  return (
    <footer className={cn("bg-primary text-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-secondary to-error text-white p-2 rounded-lg">
                <ApperIcon name="Newspaper" size={24} />
              </div>
              <span className="font-display text-2xl font-bold">
                DailyBrief
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-4 max-w-md">
              Your trusted source for daily news and insights. Stay informed with our comprehensive coverage of politics, business, technology, sports, and entertainment.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ApperIcon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/?category=politics"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Politics
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=business"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=technology"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=sports"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  to="/?category=entertainment"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} DailyBrief. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;