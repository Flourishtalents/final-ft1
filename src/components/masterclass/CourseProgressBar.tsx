import React from 'react';

interface CourseProgressBarProps {
  progress: number;
}

const CourseProgressBar: React.FC<CourseProgressBarProps> = ({ progress }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">Progress</span>
        <span className="text-gray-300">{progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default CourseProgressBar;
