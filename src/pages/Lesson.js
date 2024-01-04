import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LessonDetails from '../components/LessonDetails/LessonDetails';

const Lesson = () => {

  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`https://localhost:7117/api/Lesson/${lessonId}`);
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [lessonId]); 

  if (!lesson) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <LessonDetails lesson={lesson} />   
    </div>
  );
};

export default Lesson;

