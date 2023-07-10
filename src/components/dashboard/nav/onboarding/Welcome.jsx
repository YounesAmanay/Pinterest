import React from 'react';
import './welcome.css';
import image from '../../../../assets/Galáxia 😍.jpg';

function Welcome({onNext}) {

  const next = ()=>{
    onNext();
  }
  return (
    <div className="w-welcome-container">
      <div className="w-welcome-content">
        <div className="w-welcome-text">
          <h2 className="w-welcome-title">Welcome to Pinterest</h2>
          <p className="w-welcome-description">
            The House of Visualized Ideas
          </p>
          <p className="w-welcome-bottom-text">
            Click Next to personalize your home feed and enjoy the experience.
          </p>
          <button className="w-next-button" onClick={next}>Next</button>
        </div>
        <div className="w-welcome-image-container">
          <img className="w-welcome-image" src={image} alt="Descriptive Image" />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
