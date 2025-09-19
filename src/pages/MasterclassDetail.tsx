import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Check, Star, Users, Clock, BookOpen } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { Masterclass } from '../types';
import masterclassesData from '../data/masterclasses.json';
import TestimonialCard from '../components/masterclass/TestimonialCard';

// Dummy testimonials for now
const testimonials = [
  { name: 'John Doe', comment: 'This masterclass changed my life!' },
  { name: 'Jane Smith', comment: 'I got a promotion after completing this course.' },
  { name: 'Alex Chen', comment: 'The instructor was amazing and the content was top-notch.' },
];

export default function MasterclassDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, loading } = useAuth();
  const masterclass = (masterclassesData as Masterclass[]).find(c => c.id === parseInt(id || ''));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!masterclass) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4 text-white text-center">
        <h1 className="text-4xl font-bold">Masterclass not found</h1>
        <Link to="/masterclass" className="mt-4 inline-block text-rose-400 hover:underline">
          Back to all masterclasses
        </Link>
      </div>
    );
  }

  const handleEnroll = () => {
    // Enrollment logic would go here
    alert('Enrollment feature coming soon!');
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">{masterclass.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{masterclass.description_short}</p>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-bold">{masterclass.rating}</span>
                <span className="text-gray-400">({masterclass.students} students)</span>
              </div>
              <span className="text-gray-400">|</span>
              <p className="text-gray-300">
                Created by <span className="text-rose-400 font-semibold">{masterclass.instructor}</span>
              </p>
            </div>

            {/* What you'll learn */}
            <div className="glass-effect p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-semibold mb-4">What you'll learn</h2>
              <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                {masterclass.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Curriculum */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
              <div className="space-y-3">
                {masterclass.curriculum.map((section, index) => (
                  <div key={index} className="glass-effect rounded-xl overflow-hidden">
                    <div className="p-4 bg-white/5">
                      <h3 className="font-semibold">{section.section}</h3>
                    </div>
                    <ul className="divide-y divide-gray-700">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Play className="w-5 h-5 text-gray-400" />
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-gray-400">{lesson.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Bio */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">About the Instructor</h2>
                <div className="glass-effect p-6 rounded-2xl flex items-center space-x-6">
                    <div className="flex-shrink-0">
                        <img src="https://i.pravatar.cc/100" alt={masterclass.instructor} className="w-24 h-24 rounded-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-rose-400">{masterclass.instructor}</h3>
                        <p className="text-purple-300 mb-2">{masterclass.instructor_title}</p>
                        <p className="text-gray-300">{masterclass.instructor_bio}</p>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">What Our Students Say</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (Floating Card) */}
          <div className="lg:sticky top-24 self-start">
            <div className="glass-effect rounded-2xl overflow-hidden">
              <div className="relative aspect-video">
                <img src={masterclass.thumbnail} alt={masterclass.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold mb-4">UGX {masterclass.price.toLocaleString()}</div>

                {(() => {
                  if (masterclass.progress === 100) {
                    return (
                      <Link to={`/masterclass/${masterclass.id}/certificate`} className="w-full text-center block px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors font-semibold">
                        View Certificate
                      </Link>
                    );
                  }
                  if (masterclass.isEnrolled) {
                    return (
                      <Link to={`/classroom/${masterclass.id}`} className="w-full text-center block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
                        Go to Classroom
                      </Link>
                    );
                  }
                  return (
                    <button
                      onClick={handleEnroll}
                      className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
                    >
                      Enroll Now
                    </button>
                  );
                })()}

                <div className="text-sm text-gray-300 mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-rose-300" />
                        <span>Duration: {masterclass.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-rose-300" />
                        <span>{masterclass.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-rose-300" />
                        <span>For {masterclass.level}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
