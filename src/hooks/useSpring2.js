import React, { useState, useEffect } from "react";
import rebound from "rebound";

const useSpring2 = (targetValue = 0, tension = 50, friction = 50) => {
   
  var _a = useState(null), spring = _a[0], setSpring = _a[1];
  var _b = useState(targetValue), value = _b[0], setValue = _b[1];


  useEffect(function () {
      var listener = {
          onSpringUpdate: function (currentSpring) {
              var newValue = currentSpring.getCurrentValue();
              setValue(newValue);
          },
      };
      if (!spring) {
          var newSpring2 = new rebound.SpringSystem().createSpring(tension, friction);
          newSpring2.setCurrentValue(targetValue);
          setSpring(newSpring2);
          newSpring2.addListener(listener);
          return;
      }
      return function () {
          spring.removeListener(listener);
          setSpring(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
      if (spring) {
          spring.setEndValue(targetValue);
      }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetValue]);
  return value;
};

export default useSpring2;