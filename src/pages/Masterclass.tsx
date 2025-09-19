import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, CheckCircle } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { Masterclass as MasterclassType, Workshop } from '../types';

import categoriesData from '../data/categories.json';
import masterclassesData from '../data/masterclasses.json';
import workshopsData from '../data/workshops.json';

import MasterclassCard from '../components/masterclass/MasterclassCard';
import SearchBar from '../components/masterclass/SearchBar';
import CategoryFilter from '../components/masterclass/CategoryFilter';
import WorkshopCard from '../components/masterclass/WorkshopCard';
import CourseProgressBar from '../components/masterclass/CourseProgressBar';

export default function Masterclass() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMentorshipModal, setShowMentorshipModal] = useState(false);
  const [mentorshipRequestSent, setMentorshipRequestSent] = useState(false);

  const categories: string[] = categoriesData;
  const workshops: Workshop[] = workshopsData;

  const masterclasses: MasterclassType[] = masterclassesData.sort((a: MasterclassType, b: MasterclassType) => {
    const aIndex = categories.indexOf(a.category);
    const bIndex = categories.indexOf(b.category);
    return aIndex - bIndex;
  });

  const filteredMasterclasses = masterclasses.filter((course: MasterclassType) => {
    const matchesCategory = activeFilter === 'all' || course.category === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (courseId: number) => {
    if (!user) {
      alert('Please sign up or sign in to enroll.');
      navigate('/signin');
      return;
    }
    if (user.tier === 'free') {
      alert('Upgrade to Premium to access masterclasses!');
      return;
    }
    // In a real app, this would trigger a state update and API call
    alert(`Enrollment successful for course ${courseId}! Welcome to the masterclass.`);
  };

  const handleMentorshipRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMentorshipRequestSent(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">Masterclass</h1>
          <p className="text-gray-300 text-lg">Learn from industry experts and advance your career</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} categories={categories} />
        </div>

        {/* Masterclasses Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-white mb-6">Featured Masterclasses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMasterclasses.map((course) => (
                <Link to={`/masterclass/${course.id}`} key={course.id}>
                  <MasterclassCard course={course} handleEnroll={handleEnroll} />
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Learning */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">My Learning</h3>
              <div className="space-y-3">
                {masterclasses.filter(c => c.isEnrolled).map((course) => (
                  <div key={course.id} className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <img src={course.thumbnail} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium line-clamp-1">{course.title}</div>
                        <div className="text-gray-200 text-xs">{course.progress}% complete</div>
                      </div>
                    </div>
                    <CourseProgressBar progress={course.progress} />
                  </div>
                ))}
                {masterclasses.filter(c => c.isEnrolled).length === 0 && (
                  <p className="text-gray-200 text-sm">No enrolled courses yet</p>
                )}
              </div>
            </div>

            {/* Upcoming Workshops */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Workshops</h3>
              <div className="space-y-4">
                {workshops.map((workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-effect p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">My Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Brand Ambassador Certified</div>
                    <div className="text-gray-200 text-sm">Completed November 2025</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-white font-medium">First Course Completed</div>
                    <div className="text-gray-400 text-sm">Achievement unlocked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mentorship Modal (logic remains for now) */}
    </div>
  );
}
