
import React, { useEffect, useState } from 'react';
import './WordDetails.css';
import AddWordBtn from './AddWordBtn';

export default function WordDetails(props) {
  const [wordDetails, setWordDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://localhost:7117/GetInfo/${props.selectedWord}`;
        const response = await fetch(apiUrl);
        const data = await response.json();


        if (Array.isArray(data) && data.length > 0) {
          setWordDetails(data);
        } else {

          console.error('No data received from the API');
        }
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };


    fetchData();
  }, [props.selectedWord]); 

  const groupDefinitionsByPartOfSpeech = () => {
    const groupedDefinitions = {};

    if (wordDetails) {
      wordDetails.forEach((detail) => {
        const partOfSpeech = detail.partOfSpeech;
        if (!groupedDefinitions[partOfSpeech]) {
          groupedDefinitions[partOfSpeech] = [];
        }
        groupedDefinitions[partOfSpeech].push(detail);
      });
    }

    return groupedDefinitions;
  };

  const groupedDefinitions = groupDefinitionsByPartOfSpeech();

  return (
    <div className="WordDetailsContainer">
      <div class = "WordDetailsHeader">
      <h2 className="WordDetailsHeading"> {props.selectedWord}</h2>
      <AddWordBtn word = {props.selectedWord}/>
      </div>
      <div className="ScrollableContainer">
        {wordDetails ? (
          <div>
            {Object.keys(groupedDefinitions).map((partOfSpeech, index) => (
              <div key={index}>
                <h3 className="PartOfSpeechHeading">{partOfSpeech}</h3>
                <ul className="WordDetailsList">
                  {groupedDefinitions[partOfSpeech].map((detail, detailIndex) => (
                    <li key={detailIndex} className="WordDetailsListItem">
                      {detail.definition}
                      {detail.example && <p className="Example">  Example: {detail.example}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="LoadingMessage">Loading word details...</p>
        )}
      </div>
    </div>
  );
}
