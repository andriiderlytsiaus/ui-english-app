import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './FillInTheBlanksQuiz.css';

const FillInTheBlanksQuiz = forwardRef(({ text }, ref) => {
  useImperativeHandle(ref, () => ({
    checkAnswers,
  }));
  const [showResults, setShowResults] = useState(false);

  const blanks = text.split(' ').filter(word => word.startsWith('*'));

  const [selectedOptions, setSelectedOptions] = useState({});

  const checkAnswers = () => {
    setShowResults(true);
  };

  const removePunctuationForComparison = (word) => {
    return word.replace(/[.,\/#!$%^&;:{}=\-_`~()]/g, '');
  };
  const getPunctuation = (word) => {
    return word.replace(removePunctuationForComparison(word), '');
  };

  const handleOptionSelect = (blankIndex, selectedOption) => {
    if (!showResults) {
      setSelectedOptions(prevOptions => ({
        ...prevOptions,
        [blankIndex]: selectedOption,
      }));
    }
  };

  return (
    <div className="fill-in-the-blank-quiz">
      {text.split(' ').map((word, index) => {
        if (word.startsWith('*')) {
          const blankIndex = blanks.indexOf(word);
          const selectedOption = selectedOptions[blankIndex] || '';

          return (
            <span key={index}>
              <select
                className={`fill-in-the-blank-options ${showResults && removePunctuationForComparison(selectedOption) === removePunctuationForComparison(word) ? 'correct' :
                  showResults && removePunctuationForComparison(selectedOption) !== removePunctuationForComparison(word) ? 'incorrect' :
                  ''}`}
                value={selectedOption}
                onChange={(e) => handleOptionSelect(blankIndex, e.target.value)}
              >
                <option value="">Select</option>
                {blanks.map((blankWord, i) => (
                  <option key={i} value={blankWord}>
                    {removePunctuationForComparison(blankWord.substring(1))} {/* Remove the '*' symbol */}
                  </option>
                ))}
              </select>
              {getPunctuation(word)}
            </span>
            
          );
        } else {
          return <span key={index}>{word} </span>;
        }
      })}
    </div>
  );
});

export default FillInTheBlanksQuiz;