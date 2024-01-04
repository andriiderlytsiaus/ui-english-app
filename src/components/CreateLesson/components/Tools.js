import React from 'react';
import './Tools.css';
import TrueFalseImg from '../../../img/TrueFalseImg.jpg';
import MultipleChoiceImg from '../../../img/MultipleChoiceImg.jpg';
import FillInTheBlanksImg from '../../../img/FillInTheBlanksImg.jpg'
import MatchTheWordsImg from '../../../img/MatchTheWordsImg.jpg'
import LectureImg from '../../../img/LectureImg.png'

const Tools = ({ onToolClick }) => {
  const toolData = [
    { id: 'Lecture', imageUrl: LectureImg, title: 'Theory' },
    { id: 'TrueFalse', imageUrl: TrueFalseImg, title: 'True or False Quiz' },
    { id: 'MultipleChoice', imageUrl: MultipleChoiceImg, title: 'Multiple Choice Quiz' },
    { id: 'FillInTheBlanks', imageUrl: FillInTheBlanksImg, title: 'Fill In The Blanks Quiz' },
    { id: 'MatchTheWords', imageUrl: MatchTheWordsImg, title: 'Match The Words Quiz' },

  ];

  const handleToolClick = (toolId) => {
    onToolClick(toolId);
  };

  return (
    <div className="ToolsContainer">
      {toolData.map((item) => (
        <div className="ToolsItem" key={item.id} onClick={() => handleToolClick(item.id)}>
          <img className="ToolsImg" src={item.imageUrl} alt={`Tool ${item.id}`} />
          <p className="ToolsTitle">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Tools;



