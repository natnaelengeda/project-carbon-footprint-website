import React from 'react';
import AppAsset from "@/core/AppAsset";

interface ListItem {
  icon: string;
  text: string;
  alt?: string;
}

interface SectionProps {
  title: string;
  items: ListItem[];
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, items, className = '' }) => {
  return (
    <div className={`w-full h-auto ${className}`}>
      <p className="text-4xl mb-6 font-semibold">
        {title}
      </p>
      <ul className="space-y-6 pl-12 pr-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-6">
            <div className="w-8 h-8">
              <img
                src={item.icon}
                alt={item.alt || `icon-${index}`}
                className="w-8 h-8"
              />
            </div>
            <span className="text-3xl">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section; 