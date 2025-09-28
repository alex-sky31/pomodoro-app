// TimerStateContext.tsx
import { createContext, useContext, useState } from 'react';

export const TimerStateContext = createContext(null);

export const TimerStateProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <TimerStateContext.Provider value={{ isRunning, setIsRunning }}>
      {children}
    </TimerStateContext.Provider>
  );
};

export const useTimerState = () => useContext(TimerStateContext);
