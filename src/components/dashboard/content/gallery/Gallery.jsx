import React, { useEffect } from 'react';
import './gallery.css';
import Card from './card/Card';
import { useDispatch, useSelector } from 'react-redux';
import usePins from '../../../../costumHooks/usePins';

function Gallery() {
  const pins = useSelector((state) => state.pins);
  const dispatch = useDispatch();
  const { pins: pinApi } = usePins();

  useEffect(() => {
    dispatch({ type: 'SET_PINS', pins: pinApi });
  }, [dispatch, pinApi]);
  
  return (
    <div className="grid-container">
      <div className="grid-center">
        {pins.map((pin) => (
          <Card key={pin.id} pin={pin} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
