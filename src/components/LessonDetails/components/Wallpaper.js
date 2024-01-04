import React, { useState } from 'react';
import './Wallpaper.css';
import { useNavigate } from 'react-router-dom';
import WallpaperImg from '../../../img/BackgroundImg3.jpg';

export default function Wallpaper() {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [responseId, setResponseId] = useState(null);
  const navigate = useNavigate();

  const handleArrowClick = async (e) => {
    e.preventDefault();
    if(Window.userId === null){
      navigate(`/signIn`);
    }
    else
    {
   
    const userId = Window.userId; 

    const data = {
      youTubeVideoId: youtubeLink,
      userId: userId,
    };

    try {
      const response = await fetch('https://localhost:7117/api/Lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (typeof result === 'number') {
        setResponseId(result);
      }
      navigate(`/createLesson/${result}`);
    } catch (error) {
      console.error('Error:', error);
    }

    }

    
  };


  return (
    <div className="wallpaper">
      <h3>Learn English by Watching Your Favourite YouTube Videos!</h3>
      <p className="wallpaper-text">Start creating Lesson! Add YouTube link:</p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter YouTube Link here.."
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
        <span onClick={handleArrowClick}>&#10148;</span>
      </div>
    </div>
  );
}
