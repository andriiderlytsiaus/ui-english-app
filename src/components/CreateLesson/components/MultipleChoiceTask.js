import React, { useState } from 'react';
import './MultipleChoiceTask.css'; 
import CreateQuizButton from './CreateQuizButton';

const QuizCreator = () => {
  const [questions, setQuestions] = useState([
    { text: '', options: ['A', 'B', 'C', 'D'], correctOption: null },
    { text: '', options: ['A', 'B', 'C', 'D'], correctOption: null },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['A', 'B', 'C', 'D'], correctOption: null }]);
  };

  const handleQuestionChange = (questionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  const markCorrectOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = `option${optionIndex + 1}`;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <div className="quiz-creator">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="question-container">
            <label>Question {questionIndex + 1}:</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
              className="question-input"
            />

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="option-container">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  className="option-input"
                />
                <input
                  type="checkbox"
                  checked={question.correctOption === `option${optionIndex + 1}`}
                  onChange={() => markCorrectOption(questionIndex, optionIndex)}
                  className="correct-option-checkbox"
                />
                <span className="correct-option-label">Correct Option</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="quiz-buttons">
        <button onClick={addQuestion} className="add-question-button">
          Add Question
        </button>
        <CreateQuizButton quiz={questions} type={"MultipleChoice"} />
      </div>
    </div>
  );
};

export default QuizCreator;
