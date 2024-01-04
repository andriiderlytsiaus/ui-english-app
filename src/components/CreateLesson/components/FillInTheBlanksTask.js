import React, { useState } from 'react';
import './FillInTheBlanksTask.css';
import CreateQuizButton from './CreateQuizButton';

export default function FillInTheBlanksTask() {
  const [highlightedText, setHighlightedText] = useState('');
  const [submitionText, setSubmitionText] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleWordClick = (wordWithPunctuation, index) => {
    if (wordWithPunctuation === '____') {
      return;
    }

    const words = wordWithPunctuation.replace(/[^\w\s']/g, '').split("'");
    const selectedWord = words[0];

    if (!selectedWords.includes(selectedWord)) {
      setSelectedWords([...selectedWords, selectedWord]);

      const updatedText = highlightedText.split(/\s+/).map((word, i) => (
        i === index ? `____` : word
      )).join(' ');

      const updatedSubmitionText = submitionText.split(/\s+/).map((word, i) => (
        i === index ? `*${word}` : word
      )).join(' ');
      setSubmitionText(updatedSubmitionText);
      setHighlightedText(updatedText);

      const question = {
        text: updatedSubmitionText,
        options: [],
        correctOption: null,
      };

      setQuestions([question]);
    }
  };

  const handleAddTextClick = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      setHighlightedText(selectedText);
      setSubmitionText(selectedText);
      setSelectedWords([]);
    }
  };

  return (
    <div className="FillInTheBlanks">
      <p className="task-header">Fill in the Blanks Task</p>
      <div className="fillIn-task-instruction">
        <p className="step">Step 1</p>
        <p className="instruction-item">Highlight paragraph from text</p>
        <p className="step">Step 2</p>
        <p className="instruction-item">Choose the words from the paragraph</p>
        <p className="step">Step 3</p>
        <p className="instruction-item">You are all set! Press "Add Quiz"</p>
      </div>

      <div className="scrollable-text-container">
        <div>
          {highlightedText.split(/\s+/).map((word, index) => (
            <span key={index} className="word" onClick={() => handleWordClick(word, index)}>
              {word}{' '}
            </span>
          ))}
        </div>
      </div>

      <p className="selected-words">
        {selectedWords.map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </p>

      <div className="quiz-buttons">
        <button className="add-question-button" onClick={handleAddTextClick}>
          Add text
        </button>
        <CreateQuizButton quiz={questions} type={"FillInTheBlanks"}/>
      </div>
    </div>
  );
}
