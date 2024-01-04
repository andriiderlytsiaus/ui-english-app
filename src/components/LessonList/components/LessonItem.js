import React from 'react';
import { Link } from 'react-router-dom';

export default function LessonItem(props) {
  const { title, youTubeVideoId, id } = props.lesson;

  const containerStyle = {
    maxWidth: '300px',
    margin: '0 auto',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const thumbnailStyle = {
    width: '100%',
    height: '0',
    paddingBottom: '55%', 
    position: 'relative',
  };

  const imgStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
    borderRadius: '8px 8px 0 0',
  };

  const titleStyle = {
    marginTop: '20px',
    fontSize: '1em',
    color: '#333',
    textDecoration: 'none',
    
  };

  return (
    <div className="LessonItem" style={containerStyle}>
      <div style={thumbnailStyle}>
        <img
          className="video-img"
          src={`https://img.youtube.com/vi/${youTubeVideoId}/0.jpg`}
          alt="YouTube Thumbnail"
          style={imgStyle}
        />
      </div>
      <Link key={id} to={`/lesson/${id}`} style={titleStyle}>
        <div>{title}</div>
      </Link>
    </div>
  );
}
