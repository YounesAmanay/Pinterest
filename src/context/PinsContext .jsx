import React, { createContext, useState } from 'react';

const PinsContext = createContext();

const PinsProvider = ({ children }) => {
  const [pins, setPins] = useState([]);

  return (
    <PinsContext.Provider value={{ pins, setPins }}>
      {children}
    </PinsContext.Provider>
  );
};

export default PinsContext;
export { PinsProvider };
