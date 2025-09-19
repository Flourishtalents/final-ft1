import React from 'react';
import { Workshop } from '../../types';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
  return (
    <div className="border border-gray-700 rounded-lg p-4">
      <h4 className="text-white font-medium mb-2">{workshop.title}</h4>
      <div className="text-gray-200 text-sm space-y-1">
        <div>{workshop.date} at {workshop.time}</div>
        <div>{workshop.duration} • {workshop.spots} spots left</div>
        <div>by {workshop.instructor}</div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-rose-400 font-bold">UGX --</span>
        <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white text-sm rounded-lg hover:shadow-lg transition-all">
          Register
        </button>
      </div>
    </div>
  );
};

export default WorkshopCard;
