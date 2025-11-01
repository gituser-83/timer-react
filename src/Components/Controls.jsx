import { motion } from "motion/react";

export default function Controls({ isRunning, onStart, onPause, onReset }) {
  return (
    <div className="controls">
      {isRunning ? (
        <motion.button
          className="btn danger"
          onClick={onPause}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Pause
        </motion.button>
      ) : (
        <motion.button
          className="btn primary"
          onClick={onStart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start
        </motion.button>
      )}
      <motion.button
        className="btn ghost"
        onClick={onReset}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Reset
      </motion.button>
    </div>
  );
}
