import React, { useState, useEffect } from 'react';
import './streamer.css';
import { useSelector, useDispatch } from 'react-redux';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

const Streamer = () => {
  const messages = useSelector((state) => state.messages);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messages.length > 0) {
      setCurrentMessage(messages[0]);
      setIsVisible(true);

      const timeout = setTimeout(() => {
        setIsVisible(false);
        setCurrentMessage(null);
        dispatch({ type: 'CLEAR_MESSAGES'});
      }, 8000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [messages, dispatch]);

  const handleDismiss = () => {
    setIsVisible(false);
    setCurrentMessage(null);
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  return (
    <div className={`notification-modal ${isVisible ? 'visible' : ''}`}>
      {currentMessage && (
        <div className="notification-content">
          <p className="notification-message">{currentMessage}</p>
          <button className="dismiss-button" onClick={handleDismiss}>
            <IoCheckmarkDoneCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default Streamer;
