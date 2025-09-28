import React, { createContext, useState, useContext } from "react";

interface TimerSettings {
    workTime: number;
    shortBreak: number;
    longBreak: number;
    setWorkTime: (val: number) => void;
    setShortBreak: (val: number) => void;
    setLongBreak: (val: number) => void;
}

const TimerSettingsContext = createContext<TimerSettings | undefined>(undefined);

export const TimerSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [workTime, setWorkTime] = useState(25 * 60);
    const [shortBreak, setShortBreak] = useState(5 * 60);
    const [longBreak, setLongBreak] = useState(15 * 60);

    return (
        <TimerSettingsContext.Provider
            value={{ workTime, shortBreak, longBreak, setWorkTime, setShortBreak, setLongBreak }}
        >
            {children}
        </TimerSettingsContext.Provider>
    );
};

export const useTimerSettings = () => {
    const context = useContext(TimerSettingsContext);
    if (!context) throw new Error("useTimerSettings must be used within TimerSettingsProvider");
    return context;
};
