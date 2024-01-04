import React from 'react';

export default function DeleteWord(props) {
  const { wordId, onDelete } = props;

  const handleDelete = () => {
    fetch(`https://localhost:7117/api/SavedWord/${wordId}&${Window.userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',

      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete word (status ${response.status})`);
        }


        onDelete(wordId);
      })
      .catch(error => {
        console.error('Error deleting word:', error);

      });
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: 'red',
    cursor: 'pointer',
    fontSize: '1.5em',
    outline: 'none',
    padding: '0',
    margin: '0',
  };

  return (
    <div>
      <button style={buttonStyle} onClick={handleDelete}>−</button>
    </div>
  );
}
