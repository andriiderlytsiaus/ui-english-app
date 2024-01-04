import React, { useEffect, useState } from 'react';
import './LessonDetails.css';
import WordDetails from './components/WordDetails';
import Quiz from './components/Quiz';
import Lecture from './components/Lecture';
import Rating from './components/Rating';

const LessonDetails = ({ lesson }) => {
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedWord, setSelectedWord] = useState('Empty');

  useEffect(() => {
    let intervalId;
  
    const updateCurrentTime = () => {
      setSeconds((prevSeconds) => prevSeconds + 0.1);
      setCurrentTime(player.getCurrentTime());
    };
  
    if (isPlaying && player) {
      intervalId = setInterval(updateCurrentTime, 100);
    } else {
      clearInterval(intervalId);
    }
  
    return () => clearInterval(intervalId);
  }, [isPlaying, player]);
  

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = initializePlayer;

      return () => {
        window.onYouTubeIframeAPIReady = undefined;
        if (player) {
          player.destroy();
        }
        const existingScriptTag = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (existingScriptTag) {
          existingScriptTag.remove();
        }
      };
    } else {
      initializePlayer();
      
    }
  }, []);

  const initializePlayer = () => {
    setPlayer(new window.YT.Player('player', {
      height: '390',
      width: '640',
      videoId: lesson.youTubeVideoId,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    }));

  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
  };

  const onPlayerStateChange = (event) => {
    console.log('Player State Change:', event.data);
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const transcriptText = lesson.transcriptLines.map((line) => line.value).join(' ');

  const handleWordClick = (wordWithPunctuation) => {
    const words = wordWithPunctuation.replace(/[^\w\s']/g, '').split("'");
    setSelectedWord(words[0]);
  };

  const words = transcriptText.split(/\s+/);

  const highlightWords = (line, seconds) => {
    const words = line.value.split(/\s+/);

    return words.map((word, wordIndex) => (
      <span
        key={`${line.startTime}-${wordIndex}`}
        className={seconds > line.startTime + (line.duration / words.length) * wordIndex
          ? "highlighted"
          : "word"}
        onClick={() => handleWordClick(word)}
      >
        {word}{' '}
      </span>
    ));
  };

  return (
    <div>
      <div className="Lesson">
        <div className="lesson-details-container">
          <div>
            <div id="player"></div>
            {/* <p>Current Time: {currentTime.toFixed(1)} seconds</p> */}
          </div>

          <div className="scrollable-text-container">
            <div>
              {lesson.transcriptLines.map((line, lineIndex) => (
                highlightWords(line, seconds)
              ))}
            </div>
          </div>
        </div>

        <div className="rating-word-container">
          <Rating lesson={lesson} />
          <WordDetails selectedWord={selectedWord} />
        </div>
      </div>

      {(!lesson.quizzes || lesson.quizzes.length === 0) ? (
        <p></p>
      ) : (
        <div className="lecture-quiz-container">
          <Lecture lesson ={lesson}/>
          <Quiz quizzes={lesson.quizzes} />
        </div>
      )}
    </div>
  );
};

export default LessonDetails;