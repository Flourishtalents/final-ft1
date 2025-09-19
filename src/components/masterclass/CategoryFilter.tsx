import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  categories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeFilter, setActiveFilter, categories }) => {
  return (
    <div className="flex items-center space-x-4">
      <Filter className="text-gray-400 w-5 h-5" />
      <select
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
        className="px-4 py-3 glass-effect rounded-xl border border-white/20 text-white bg-transparent focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
      >
        {categories.map((category) => (
          <option key={category} value={category} className="bg-gray-800">
            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
