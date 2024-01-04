import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateLessonForm.css';

export default function CreateLessonForm() {
  const [youtubeId, setYoutubeId] = useState('');
  const [responseId, setResponseId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = Window.userId; 

    const data = {
      youTubeVideoId: youtubeId,
      userId: userId,
    };

    try {
      const response = await fetch('https://localhost:7117/api/Lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (typeof result === 'number') {
        setResponseId(result);
      }
      navigate(`/createLesson/${result}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-lesson-container">
      <h2>Create Lesson Form</h2>
      <form className="create-lesson-form" onSubmit={handleSubmit}>
        <label className="create-lesson-label">
          YouTube Video ID:
          <input
            className="create-lesson-input"
            type="text"
            value={youtubeId}
            onChange={(e) => setYoutubeId(e.target.value)}
            required
          />
        </label>
        <br />
        <button className="create-lesson-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
