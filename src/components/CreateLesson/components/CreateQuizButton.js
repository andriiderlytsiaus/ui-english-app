import React from 'react';
import { useParams } from 'react-router-dom';

const CreateQuizButton = ({ quiz, type }) => {
  const { lessonId } = useParams();

  const handleButtonClick = async () => {
    const formattedQuiz = quiz.map(({ text, options, correctOption }) => ({
      text,
      correctOption,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
    }));

    const requestBody = {
      type,
      questions: formattedQuiz,
      lessonId: parseInt(lessonId, 10),
    };

    try {
      const response = await fetch('https://localhost:7117/api/Quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        console.log('Quiz successfully added!');
      } else {
        console.error('Failed to add quiz');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button className="submit-button" onClick={handleButtonClick}>
        Add Quiz
      </button>
    </div>
  );
};

export default CreateQuizButton;
