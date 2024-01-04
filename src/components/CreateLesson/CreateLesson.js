import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CreateLesson.css';
import MultipleChoiceTask from './components/MultipleChoiceTask';
import TrueFalseTask from './components/TrueFalseTask';
import FillInTheBlanksTask from './components/FillInTheBlanksTask';
import MatchTheWords from './components/MatchTheWords';
import Tools from './components/Tools';
import LessonHeader from './components/LessonHeader';
import Lecture from './components/Lecture';

const CreateLesson = () => {
  const { lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedTool, setSelectedTool] = useState("MultipleChoice");

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

  const transcriptText = lesson.transcriptLines.map((line) => line.value).join(' ');

  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const words = transcriptText.split(/\s+/);

  return (
    <div className="container">
      <Tools onToolClick={handleToolClick} />
      <div className="lesson-details-container">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${lesson.youTubeVideoId}`}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <div className="scrollable-text-container">
          <div>
            {words.map((word, index) => (
              <span key={index} className="word" onClick={() => handleWordClick(word)}>
                {word}{' '}
              </span>
            ))}
          </div>
        </div>
      </div>    
      <div className="lesson-content-creator">
        <LessonHeader />
        <div className="task-container">
          {selectedTool === 'TrueFalse' && <TrueFalseTask />}
          {selectedTool === 'MultipleChoice' && <MultipleChoiceTask />}
          {selectedTool === 'FillInTheBlanks' && <FillInTheBlanksTask />}
          {selectedTool === 'MatchTheWords' && <MatchTheWords />}
          {selectedTool === 'Lecture' && <Lecture />}
        </div>
      </div>
    </div>
  );
};

export default CreateLesson;
