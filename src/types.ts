// src/types.ts

export interface Lesson {
  title: string;
  duration: string;
  video_url: string;
}

export interface CurriculumSection {
  section: string;
  lessons: Lesson[];
}

export interface Masterclass {
  id: number;
  title: string;
  instructor: string;
  instructor_title: string;
  instructor_bio: string;
  category: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: number;
  level: string;
  thumbnail: string;
  video_preview: string;
  description_short: string;
  description_long: string;
  features: string[];
  isEnrolled: boolean;
  progress: number;
  curriculum: CurriculumSection[];
  assessment: {
    type: string;
    title: string;
    description: string;
  };
}

export interface Workshop {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  spots: number;
  price: number;
  category: string;
}

export interface Category extends String {}
