import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './LessonHeader.css';

const LessonForm = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');
  const [difficulty, setDifficulty] = useState('A1');
  const { lessonId } = useParams();

  useEffect(() => {
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      lessonId: parseInt(lessonId),
      keywords,
      difficulty,
    };

    try {
      const response = await fetch('https://localhost:7117/api/Lesson/LessonInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Lesson created successfully');
        navigate('/home');

      } else {
        console.error('Failed to create lesson');
      }
    } catch (error) {
      console.error('Error creating lesson:', error);
    }

    setKeywords('');
    setDifficulty('A1');
  };

  return (
    <div className="lesson-header">
      <form onSubmit={handleSubmit} className="create-header-form">
        <div className="difficulty-and-button">
          <label className="difficulty">
            Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="select-difficulty"
              required
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </label>

          <button type="submit" className="submit-button">
            Create Lesson
          </button>
        </div>

        <label className="keywords">
          Keywords:
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="input-field"
            required
          />
        </label>
      </form>
    </div>
  );
};

export default LessonForm;
