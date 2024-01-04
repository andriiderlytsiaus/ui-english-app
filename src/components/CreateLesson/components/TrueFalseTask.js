import React, { useState } from 'react';
import './TrueFalseTask.css'; 
import CreateQuizButton from './CreateQuizButton'

const TrueFalseTask = () => {
  const [questions, setQuestions] = useState([
    { text: '', options :[], correctOption: null },
    { text: '',options :[],  correctOption: null},
    { text: '',options :[],  correctOption: null },
    { text: '',options :[],  correctOption: null }
]);

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options :[],correctOption: null }]);
  };

  const handleQuestionChange = (questionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = text;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, correctOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = correctOption;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="true-false-task">
     
      <div class = "quiz-creator">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-container">
          <label>Question {questionIndex + 1}:</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            className="question-input"
          />

          <div className="answer-container">
            <label>Answer:</label>
            <select
              value={question.correctOption}
              onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
              className="answer-select"
            >
              <option value={null}>Select Answer</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
        </div>
      ))}
        
      </div>
      <div class ="quiz-buttons">
        <button onClick={addQuestion} className="add-question-button">
          Add Question
        </button>
        <CreateQuizButton quiz={questions}  type ={"TrueFalse"}/>
      </div>

      
    </div>
  );
};

export default TrueFalseTask;
