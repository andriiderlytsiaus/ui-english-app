import React, { useEffect, useState } from 'react';
import LessonItem from './components/LessonItem';
import './LessonList.css';

const LessonList = ({lessons, header}) => {


  return (
    <div class = "lesson-list">
        <p class ="header-lesson-list">{header}</p>
         <div className="lessonContainer">
        {lessons.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
      </div>
    </div>
  );
};

export default LessonList;

