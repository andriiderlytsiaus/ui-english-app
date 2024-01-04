
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './MultipleChoiceQuiz.css';

const MultipleChoiceQuiz = forwardRef(({ quiz }, ref) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (questionId, selectedOption) => {
    if(!showResults){
      const isCorrect =
      quiz.questions.find((question) => question.id === questionId)
        .correctOption === selectedOption;

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: { selectedOption, isCorrect },
    }));
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };


  useImperativeHandle(ref, () => ({

    checkAnswers,
  }));

  return (
    <div className="multiple-choice-quiz">
      <div>
        {quiz.questions.map((question) => (
          <div key={question.id} className="question">
            <p>{question.text}</p>
            <div className="options">
              {['option1', 'option2', 'option3', 'option4'].map((optionKey) => (
                <button
                  key={optionKey}
                  onClick={() => handleOptionSelect(question.id, optionKey)}
                  className={`option ${
                    selectedOptions[question.id]?.selectedOption === optionKey
                      ? 'selected'
                      : ''
                  } ${
                    showResults &&
                    selectedOptions[question.id]?.isCorrect &&
                    selectedOptions[question.id]?.selectedOption === optionKey
                      ? 'correct'
                      : showResults &&
                        selectedOptions[question.id] &&
                        selectedOptions[question.id]?.selectedOption === optionKey &&
                        !selectedOptions[question.id]?.isCorrect
                      ? 'incorrect'
                      : ''
                  }`}

                >
                  {question[optionKey]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
});

export default MultipleChoiceQuiz;