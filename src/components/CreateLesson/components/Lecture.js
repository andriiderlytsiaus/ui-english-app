
import React, { useState } from 'react';
import './Lecture.css';
import CreateQuizButton from './CreateQuizButton';
import { useParams } from 'react-router-dom';

export default function Lecture() {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [theory, setTheory] = useState('');
  const { lessonId } = useParams();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://localhost:7117/api/Lesson/AddTheory/${lessonId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          goal,
          theory,
        }),
      });

      if (response.ok) {
        console.log('Lesson added successfully!');
        setTitle('');
        setGoal('');
        setTheory('');
      } else {
        console.error('Failed to add lesson.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div >
      <form className="lecture-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label >
          Title:
          <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        
        <label >
          Goal:
          <input type="text" className="form-input" value={goal} onChange={(e) => setGoal(e.target.value)} />
        </label>

        <label >
          Theory:
          {/* <input type="text" className="theory-input" value={theory} onChange={(e) => setTheory(e.target.value)} /> */}
          <textarea class="theory-input" value={theory} onChange={(e) => setTheory(e.target.value)}  placeholder="Type your notes here..."></textarea>
        </label>



        <div class ="submit-theory-container">
        <button type="submit" className="submit-theory">Add Theory</button>

        </div>
        
      </form>
    </div>
  );
}
