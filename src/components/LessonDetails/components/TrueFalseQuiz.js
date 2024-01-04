import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './TrueFalseQuiz.css';

const TrueFalseQuizQuiz = forwardRef(({ quiz }, ref) => {
  const [selectedOptions, setAnswers] = useState(Array(quiz.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  useImperativeHandle(ref, () => ({

    checkAnswers,
  }));
  const handleOptionChange = (questionIndex, selectedOption) => {
    if(!showResults){
      const newAnswers = [...selectedOptions];
      newAnswers[questionIndex] = selectedOption;
      setAnswers(newAnswers);

    }
  };

  const checkAnswers = () => {
    console.log(selectedOptions);
    setShowResults(true);
  };
  return (
    <div class ="true-false-quiz">
        {quiz.questions.map((question, index) => (
        <div class ="true-false-quiz-question">
          <p >{question.text}</p>
          <div class= "true-false-quiz-options">
          {['true', 'false'].map((optionKey) => (
          <button 
          onClick={() => handleOptionChange(index, optionKey)}
           class = {`true-false-quiz-option 
           ${
            selectedOptions[index] === optionKey
              ? 'selected'
              : ''
          }
           
           ${showResults&& selectedOptions[index] ===optionKey 
          && quiz.questions[index].correctOption === selectedOptions[index] 
          ?'correct':
          showResults&& selectedOptions[index] ===optionKey 
          && quiz.questions[index].correctOption !== selectedOptions[index] 
          ?'incorrect':''
          }`}  >
            True
          </button>
          ))}
          </div>
        </div>
      ))}
      
    </div>
  );
});
export default TrueFalseQuizQuiz;

