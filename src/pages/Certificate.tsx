import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Masterclass } from '../types';
import masterclassesData from '../data/masterclasses.json';
import { Award, Download, Share2 } from 'lucide-react';

export default function Certificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const masterclass = (masterclassesData as Masterclass[]).find(c => c.id === parseInt(id || ''));

  // Authorization check
  if (!user || !masterclass?.isEnrolled) {
    alert('You must be enrolled and have completed the masterclass to view the certificate.');
    navigate(`/masterclass/${id}`);
    return null;
  }

  if (!masterclass) {
    return <div className="text-white text-center p-10">Masterclass not found.</div>;
  }

  const completionDate = "November 28, 2025"; // Static date for demo

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-gradient-to-br from-gray-800 to-gray-800/50 border-2 border-yellow-400/50 rounded-2xl p-8 shadow-2xl shadow-rose-500/10 relative overflow-hidden">
          {/* Decorative elements */}
          <Award className="absolute -top-10 -left-10 w-40 h-40 text-yellow-400/10" />
          <Award className="absolute -bottom-10 -right-10 w-40 h-40 text-rose-400/10" />

          <div className="text-center relative z-10">
            <p className="text-sm font-semibold tracking-widest text-yellow-300 uppercase">Certificate of Completion</p>
            <h1 className="text-5xl font-playfair font-bold my-4">
              {masterclass.title}
            </h1>
            <p className="text-gray-300">This certificate is awarded to</p>
            <p className="text-4xl font-semibold text-rose-300 my-6">
              {user.name}
            </p>
            <p className="text-gray-300">
              for successfully completing the masterclass on <span className="font-semibold">{completionDate}</span>.
            </p>

            <div className="mt-8 border-t border-gray-600 pt-6 max-w-sm mx-auto">
              <p className="text-lg font-semibold">{masterclass.instructor}</p>
              <p className="text-sm text-gray-400">{masterclass.instructor_title}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-4">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                <Download size={20} />
                <span>Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <Share2 size={20} />
                <span>Share</span>
            </button>
        </div>
      </div>
    </div>
  );
}
