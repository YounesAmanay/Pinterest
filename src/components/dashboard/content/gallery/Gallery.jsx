import React from 'react';
import './gallery.css';
import Card from './card/Card';
import { useSelector } from 'react-redux';


function Gallery() {
  const pins = useSelector((state) => state.pins);

  return (
    <div className="grid-container">
      <div className="grid-center">
        {pins && pins.map((pin) => (
          <Card key={pin.id} pin={pin} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
