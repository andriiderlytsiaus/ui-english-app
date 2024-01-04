import React, { useState } from 'react';
import TeacherImg from '../../../img/TeacherImg.png';
import './Rating.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsDown as faThumbsDownSolid,
  faThumbsUp as faThumbsUpSolid,
} from '@fortawesome/free-solid-svg-icons';

export default function Rating({ lesson }) {
  const [thumbsUpSolid, setThumbsUpSolid] = useState(false);
  const [thumbsDownSolid, setThumbsDownSolid] = useState(false);

  const handleThumbsUpClick = () => {
    setThumbsUpSolid(true);
    setThumbsDownSolid(false); 
    sendRating("up");
  };

  const handleThumbsDownClick = () => {
    setThumbsDownSolid(true);
    setThumbsUpSolid(false); 
    sendRating("down");
  };

  const sendRating = (value) => {
      fetch(`https://localhost:7117/api/Lesson/AddRating/${lesson.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `"${value}"`,
      });
  };

  return (
    <div className="topic-rating-container">
      <p className="topic">{lesson.title}</p>
      <div className="teacher-rating-container">
        <div className="teacher">
          <img className="teacher-img" src={TeacherImg} alt="Teacher" />
          <p>{lesson.user.firstName} {lesson.user.lastName}</p>
        </div>

        <div className="thumbs">
          <FontAwesomeIcon
            className={`thumb ${thumbsUpSolid ? 'solid shake' : ''}`}
            icon={thumbsUpSolid ? faThumbsUpSolid : faThumbsUp}
            onClick={handleThumbsUpClick}
          />
          <FontAwesomeIcon
            className={`thumb ${thumbsDownSolid ? 'solid shake' : ''}`}
            icon={thumbsDownSolid ? faThumbsDownSolid : faThumbsDown}
            onClick={handleThumbsDownClick}
          />
        </div>
      </div>
    </div>
  );
}
