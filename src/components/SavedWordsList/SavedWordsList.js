import React, { useState, useEffect } from 'react';
import './SavedWordsList.css'
import DeleteWord from './components/DeleteWord'
import SavedWordDetails from './components/SavedWordDetails'

const YourComponent = (props) => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const handleWordClick = (word) => {
    setSelectedWord(word);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7117/SavedWordsByUser/${props.userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [props.userId]); 

  const handleDeleteWord = (wordId) => {
 
    setWords(words.filter(word => word.id !== wordId));
  };

  return (
    <div className='SavedWordsPage'>
      <div className="SavedWordsContainer">
      <ul className="SavedWordsList">
        {words.map((word) => (
          <li className="SavedWordItem" key={word.id}>
            <strong onClick={() => handleWordClick(word.value)}>{word.value}</strong> - Phonetic: {word.phonetic}
            <DeleteWord wordId={word.id} onDelete={handleDeleteWord} />
          </li>
        ))}
      </ul>
    </div>
    <SavedWordDetails selectedWord={selectedWord} />

    </div>
    
  );
};

export default YourComponent;
