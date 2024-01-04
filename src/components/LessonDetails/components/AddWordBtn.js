import React from 'react';

export default function MyComponent(props) {
  const word = props.word;
  const userId = Window.userId;

  const handleAddClick = () => {
    const apiUrl = `https://localhost:7117/api/SavedWord/${word}&${userId}`;

  
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('POST request successful:', data);
      })
      .catch(error => {
        console.error('Error during POST request:', error);
      });
  };

  return (
    <button onClick={handleAddClick}>Add</button>
  );
}
