import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Lock, PlayCircle, CheckCircle, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Masterclass, Lesson } from '../types';
import masterclassesData from '../data/masterclasses.json';

export default function Classroom() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const masterclass = (masterclassesData as Masterclass[]).find(c => c.id === parseInt(id || ''));

  // For demonstration, we'll assume the first lesson of the first section is the starting point.
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(masterclass?.curriculum[0]?.lessons[0] || null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
      [masterclass?.curriculum[0]?.section || '']: true
  });

  useEffect(() => {
    // This is a protected route. Check for user and enrollment.
    // In a real app, the `isEnrolled` status would come from the user's data, not the generic course data.
    if (!user || !masterclass?.isEnrolled) {
      alert('You are not enrolled in this masterclass.');
      navigate(`/masterclass/${id}`);
    }
  }, [user, masterclass, id, navigate]);

  if (!masterclass) {
    return <div className="text-white text-center p-10">Masterclass not found.</div>;
  }

  if (!currentLesson) {
    return <div className="text-white text-center p-10">No lessons available for this masterclass.</div>;
  }

  const handleSectionToggle = (sectionTitle: string) => {
    setOpenSections(prev => ({ ...prev, [sectionTitle]: !prev[sectionTitle] }));
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex pt-16">
      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-2xl mb-4 flex items-center justify-center">
          {/* In a real app, a video player component would go here */}
          <div className="text-center">
            <PlayCircle size={64} className="text-gray-600" />
            <p className="mt-2 text-gray-500">Video for: {currentLesson.title}</p>
          </div>
        </div>

        {/* Lesson Details */}
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Mark as Complete</span>
            </button>
        </div>
        <p className="text-gray-400">From: {masterclass.title}</p>
      </main>

      {/* Sidebar */}
      <aside className="w-80 bg-gray-800 p-4 border-l border-gray-700 h-screen-minus-header overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{masterclass.title}</h2>
        <div className="space-y-2">
          {masterclass.curriculum.map((section, index) => (
            <div key={index} className="bg-gray-700/50 rounded-lg">
              <button
                onClick={() => handleSectionToggle(section.section)}
                className="w-full flex items-center justify-between p-3 text-left font-semibold"
              >
                <span>{section.section}</span>
                {openSections[section.section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openSections[section.section] && (
                <ul className="p-2">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex}>
                      <button
                        onClick={() => handleLessonSelect(lesson)}
                        className={`w-full text-left p-3 rounded-md flex items-center space-x-3 transition-colors ${
                          currentLesson.title === lesson.title
                            ? 'bg-rose-500/30 text-rose-300'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <PlayCircle size={18} />
                        <span>{lesson.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Final Assessment Link */}
          <div className="bg-rose-500/30 rounded-lg">
            <Link to={`/masterclass/${masterclass.id}/assessment`} className="w-full flex items-center justify-between p-3 text-left font-semibold text-rose-300">
                <span>Final Assessment</span>
                <BookOpen size={20} />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}

// A helper style to calculate screen height minus header
const styles = `
  .h-screen-minus-header {
    height: calc(100vh - 4rem); /* Assuming header height is 4rem (h-16) */
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
