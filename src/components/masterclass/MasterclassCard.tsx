import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Users, Star, BookOpen } from 'lucide-react';
import { Masterclass } from '../../types';

interface MasterclassCardProps {
  course: Masterclass;
  handleEnroll: (courseId: number) => void;
}

const MasterclassCard: React.FC<MasterclassCardProps> = ({ course, handleEnroll }) => {
  return (
    <div className="glass-effect rounded-2xl overflow-hidden hover-lift">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-800">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>

        {course.isEnrolled && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
            ENROLLED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-rose-400/20 text-rose-300 text-xs rounded-full">
            {course.level}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-300 text-sm">{course.rating}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
        <p className="text-gray-200 text-sm mb-3">by {course.instructor}</p>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{course.description_short}</p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-200 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.features.map((feature, index) => (
            <span key={index} className="px-2 py-1 bg-purple-400/20 text-purple-300 text-xs rounded">
              {feature}
            </span>
          ))}
          <Link
            to={`/career-guidance/${course.id}`}
            className="px-2 py-1 bg-blue-400/20 text-blue-300 text-xs rounded"
          >
            Career Guidance
          </Link>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course.isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-300">Progress</span>
              <span className="text-gray-300">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">UGX --</div>
          {course.isEnrolled ? (
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Continue Learning
            </button>
          ) : (
            <button
              onClick={() => handleEnroll(course.id)}
              className="px-6 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterclassCard;
