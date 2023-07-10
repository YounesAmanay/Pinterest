import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import Personalise from "./Personalise";
import { useSelector } from "react-redux";
import "./onboarding.css";

function Onboarding() {
  const [next, setNext] = useState(false);
  const [show, setShow] = useState(false);
  const onboarding = useSelector((state) => state.onboarding);
  console.log(onboarding)

  useEffect(() => {
    if (onboarding === 0) {
      setShow(true);
    }
  }, [onboarding]);

  const handleNext = () => {
    setNext(true);
  };

  return (
    <div>
      {show && (
        <>
          <div className="boarding-overlay"></div>
          <div className="boarding-container">
            {next ? (
              <Personalise onclose={() => setShow(false)} />
            ) : (
              <Welcome onNext={handleNext} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Onboarding;
