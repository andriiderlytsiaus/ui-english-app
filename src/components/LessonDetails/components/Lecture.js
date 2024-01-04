import React, { useEffect, useState } from 'react';
import './Lecture.css';

const Lecture = ({ lesson }) => {
  return (
    <div className="lecture-box">
      <h2 className="lecture-title">{lesson.title}</h2>
      <p className="lecture-goal"><strong>Goal:</strong> {lesson.goal}</p>
      <p className="lecture-theory"> {lesson.theory}</p>
      <p className="lecture-difficulty"><strong>Difficulty Level:</strong> {lesson.difficulty}</p>

    </div>
  );
};

export default Lecture;
