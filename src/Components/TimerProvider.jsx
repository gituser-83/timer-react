import { createContext, useContext, useState, useRef, useEffect } from "react";

const TimerContext = createContext();

export function useTimer() {
  return useContext(TimerContext);
}

export default function TimerProvider({ children }) {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [shortMinutes, setShortMinutes] = useState(5);
  const [longMinutes, setLongMinutes] = useState(15);
  const [longBreakInterval, setLongBreakInterval] = useState(4);

  const [mode, setMode] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(focusMinutes * 60);
  const [completedFocusCount, setCompletedFocusCount] = useState(0);

  const intervalRef = useRef(null);
  const startedAtRef = useRef(null);
  const pausedRemainingRef = useRef(null);

  const baseDuration =
    mode === "focus"
      ? focusMinutes * 60
      : mode === "short"
      ? shortMinutes * 60
      : longMinutes * 60;

  useEffect(() => {
    setTimeLeft(baseDuration);
    pausedRemainingRef.current = baseDuration;
  }, [baseDuration, mode]);

  useEffect(() => {
    if (!isRunning) return;
    const startBase = pausedRemainingRef.current ?? baseDuration;
    startedAtRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);
      const remaining = startBase - elapsed;
      setTimeLeft(remaining > 0 ? remaining : 0);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        handleAutoSwitch();
      }
    }, 200);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, baseDuration]);

  const handleAutoSwitch = () => {
    setIsRunning(false);
    startedAtRef.current = null;
    pausedRemainingRef.current = null;
    if (mode === "focus") {
      const next = completedFocusCount + 1;
      setCompletedFocusCount(next);
      if (next % longBreakInterval === 0) {
        setMode("long");
      } else {
        setMode("short");
      }
    } else {
      setMode("focus");
    }
  };

  const value = {
    focusMinutes,
    shortMinutes,
    longMinutes,
    longBreakInterval,
    setFocusMinutes,
    setShortMinutes,
    setLongMinutes,
    setLongBreakInterval,
    mode,
    setMode,
    isRunning,
    setIsRunning,
    timeLeft,
    setTimeLeft,
    completedFocusCount,
    setCompletedFocusCount,
    baseDuration,
    pausedRemainingRef,
    startedAtRef,
    handleAutoSwitch,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}
