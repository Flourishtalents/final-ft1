import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Masterclass } from '../types';
import masterclassesData from '../data/masterclasses.json';
import { Book, Upload, Send, CheckCircle, Award } from 'lucide-react';
import { useState } from 'react';

export default function Assessment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const masterclass = (masterclassesData as Masterclass[]).find(c => c.id === parseInt(id || ''));
  const [submitted, setSubmitted] = useState(false);

  // Authorization check
  if (!user || !masterclass?.isEnrolled) {
    // In a real app, you might want a more sophisticated check
    alert('You must be enrolled to view the assessment.');
    navigate(`/masterclass/${id}`);
    return null;
  }

  if (!masterclass) {
    return <div className="text-white text-center p-10">Masterclass not found.</div>;
  }

  const { assessment } = masterclass;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const renderQuiz = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quiz Questions</h2>
      <div className="space-y-4 text-left">
        {/* This is a placeholder for a real quiz */}
        <p>1. What is the capital of France?</p>
        <div className="pl-4 space-y-2">
          <label className="flex items-center"><input type="radio" name="q1" className="mr-2" /> Paris</label>
          <label className="flex items-center"><input type="radio" name="q1" className="mr-2" /> London</label>
        </div>
      </div>
    </div>
  );

  const renderProject = () => (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Project Submission</h2>
      <p className="text-gray-300 mb-6">{assessment.description}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="submission-link" className="block text-sm font-medium text-gray-300 mb-1">
            Project URL
          </label>
          <input
            type="url"
            id="submission-link"
            placeholder="https://github.com/my-project"
            className="w-full bg-transparent border border-gray-600 rounded-lg p-3 text-white focus:border-rose-400 outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="submission-file" className="block text-sm font-medium text-gray-300 mb-1">
            Upload File
          </label>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-800">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400"/>
                    <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all flex items-center justify-center space-x-2"
        >
          <Send size={18} />
          <span>Submit Project</span>
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Book size={48} className="mx-auto text-rose-400 mb-4" />
        <h1 className="text-4xl font-playfair font-bold mb-2">
          {assessment.title}
        </h1>
        <p className="text-gray-300 mb-8">
          For the masterclass: <Link to={`/masterclass/${id}`} className="text-rose-400 hover:underline">{masterclass.title}</Link>
        </p>

        <div className="glass-effect p-8 rounded-2xl">
          {submitted ? (
            <div>
              <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Submission Received!</h2>
              <p className="text-gray-300 mb-6">Your assessment has been submitted for review. Well done!</p>
              <Link
                to={`/masterclass/${id}/certificate`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-xl hover:shadow-xl transition-all"
              >
                <Award size={20} />
                <span>View Your Certificate</span>
              </Link>
            </div>
          ) : (
            assessment.type === 'Quiz' ? renderQuiz() : renderProject()
          )}
        </div>
      </div>
    </div>
  );
}
