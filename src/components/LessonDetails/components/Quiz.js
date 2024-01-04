import React, { useState } from 'react';
import FillInTheBlanksQuiz from './FillInTheBlanksQuiz';
import TrueFalseQuiz from './TrueFalseQuiz';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import './Quiz.css';


export default function Quiz({ quizzes }) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const multipleChoiceQuizRef = React.useRef(); 

  const handleClickInParent = () => {
    console.log('Button clicked in parent component!');

    if (multipleChoiceQuizRef.current) {
      multipleChoiceQuizRef.current.checkAnswers();
    }
  };

  const goToNextQuiz = () => {
    setCurrentQuizIndex((prevIndex) => (prevIndex + 1) % quizzes.length);
  };

  const goToPreviousQuiz = () => {
    setCurrentQuizIndex((prevIndex) =>
      prevIndex === 0 ? quizzes.length - 1 : prevIndex - 1
    );
  };

  const getCurrentQuizComponent = () => {
    if (!quizzes || quizzes.length === 0) {
      return <p>There are no quizzes for this lesson.</p>;
    }

    const currentQuiz = quizzes[currentQuizIndex];
    switch (currentQuiz.type) {
      case 'TrueFalse':
        return <TrueFalseQuiz quiz={currentQuiz} 
        ref={multipleChoiceQuizRef}
        />;
      case 'MultipleChoice':
        return (
          <MultipleChoiceQuiz
            quiz={currentQuiz}
            ref={multipleChoiceQuizRef} 
          />
        );
      case 'FillInTheBlanks':
        return <FillInTheBlanksQuiz 
        text={currentQuiz.questions[0].text}
        ref={multipleChoiceQuizRef} 
        />;
      default:
        return null;
    }
  };

  return (
    <div className="quiz-container">
      
      <div class ="quiz-questions-container">
        {getCurrentQuizComponent()}
      </div>
      <div className="navigation-buttons">
        <button className="navigation-button" onClick={goToPreviousQuiz}>◀</button>
        <button className="check-answers-btn" onClick={handleClickInParent}>
          Check Answers
        </button>
        <button  className="navigation-button" onClick={goToNextQuiz}>▶</button>
      </div>
    </div>
  );
}