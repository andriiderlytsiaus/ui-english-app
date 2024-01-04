import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carrousel.css';
import Img from '../../img/FillInTheBlanksImg.jpg'

const descriptionData = [
  {
    id: 1,
    name: 'Captions',
    description: 'Embark on a Transformative Learning Odyssey! Unleash the Power of Interactivity! Dive into a Dynamic Experience - Click on Any Word to Reveal Transcription, Explore Comprehensive Definitions, and Illuminate Your Understanding with Examples. This is Education Redefined!',
  },
  {
    id: 1,
    name: 'Different types of exercises',
    description: 'Embark on a dynamic learning journey with our platform, offering a selection of diverse exercises to cater to your preferences. Choose from tasks like filling in the blanks, matching words with definitions, tackling multiple-choice challenges, or testing your knowledge with true-false questions'
  },
  {
    id: 1,
    name: 'Dictionary',
    description: 'Unlock Knowledge at Your Fingertips! Seamlessly click to save unfamiliar words, unveil transcriptions, delve into exhaustive definitions, and explore enlightening examples. Transform your learning journey with our built-in dictionary – your gateway to a wealth of language insights! ',
  },

];

const Carrousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,        
    centerPadding: '25%',    
  };

  return (
    <div class="carousel"> 
      <div className="carousel-container">
        <Slider {...settings}>
          {descriptionData.map((description) => (
            <div key={description.id} className="description-item">
              <h3>{description.name}</h3>
              <blockquote>{description.description}</blockquote> 
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carrousel;
