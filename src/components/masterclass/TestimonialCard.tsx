import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
    name: string;
    comment: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex items-center space-x-1 mb-2">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
      </div>
      <p className="text-gray-300 italic mb-2">"{testimonial.comment}"</p>
      <div className="text-sm">
        <span className="text-white font-medium">{testimonial.name}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;
