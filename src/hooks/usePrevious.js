import { useState, useRef, useEffect } from 'react'

//It just gives you the previous value of whatever you give it (useful for previous props or state) in hook components
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


//Utility hook to watch for a change from falsy to truthy
export const useTrigger = (val) => {
  const [isTriggered, setIsTriggered] = useState(false)
  const prevVal = usePrevious(val)
  if (!prevVal && val && !isTriggered) {
    setIsTriggered(true)
  }
  return isTriggered
}