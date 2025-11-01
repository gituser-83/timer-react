import { motion } from "motion/react";
import { useState } from "react";
import { useTimer } from "../Components/TimerProvider.jsx";
import TimerDisplay from "../components/TimerDisplay.jsx";
import Controls from "../components/Controls.jsx";
import Settings from "../components/Settings.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

const MODES = {
  focus: { key: "focus", label: "Focus" },
  short: { key: "short", label: "Short Break" },
  long: { key: "long", label: "Long Break" },
};

export default function Home() {
  const {
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
    baseDuration,
    pausedRemainingRef,
  } = useTimer();

  const [showSettings, setShowSettings] = useState(false);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => {
    setIsRunning(false);
    pausedRemainingRef.current = timeLeft;
  };
  const handleReset = () => {
    setIsRunning(false);
    pausedRemainingRef.current = baseDuration;
    setTimeLeft(baseDuration);
  };

  const handleModeSelect = (next) => {
    setIsRunning(false);
    setMode(next);
  };

  const accent =
    mode === MODES.focus.key
      ? "accent-focus"
      : mode === MODES.short.key
      ? "accent-short"
      : "accent-long";

  return (
    <div className={`home ${accent}`}>
      <div className="home-inner">
        <div className="stack">
          <motion.div
            className="panel timer-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mode-tabs">
              {Object.values(MODES).map((m) => (
                <motion.button
                  key={m.key}
                  className={`tab ${mode === m.key ? "tab-active" : ""}`}
                  onClick={() => handleModeSelect(m.key)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {m.label}
                </motion.button>
              ))}
            </div>

            <div className="ring-wrap">
              <ProgressRing
                seconds={timeLeft}
                totalSeconds={baseDuration}
                accentClass={accent}
              />
            </div>

            <TimerDisplay seconds={timeLeft} />

            <Controls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
            />

            <div className="panel-actions">
              <motion.button
                className="btn ghost"
                onClick={() => setShowSettings((s) => !s)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Settings
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className={`panel settings-panel ${showSettings ? "open" : ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Settings
              focusMinutes={focusMinutes}
              shortMinutes={shortMinutes}
              longMinutes={longMinutes}
              longBreakInterval={longBreakInterval}
              onChangeFocus={(v) => setFocusMinutes(Math.max(1, v))}
              onChangeShort={(v) => setShortMinutes(Math.max(1, v))}
              onChangeLong={(v) => setLongMinutes(Math.max(1, v))}
              onChangeInterval={(v) => setLongBreakInterval(Math.max(1, v))}
              onApply={() => {
                setIsRunning(false);
                pausedRemainingRef.current = baseDuration;
                setTimeLeft(baseDuration);
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
