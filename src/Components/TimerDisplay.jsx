import React from "react";
import { formatTime } from "../utils/formatTime.js";
import { motion } from "motion/react";

export default function TimerDisplay({ seconds }) {
  return (
    <motion.div
      className="timer-display"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <span className="time">{formatTime(seconds)}</span>
    </motion.div>
  );
}
