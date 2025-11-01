import { motion } from "motion/react";

export default function About() {
  return (
    <div className="about">
      <motion.div
        className="panel"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="title">About the Pomodoro Technique</h1>
        <p className="text">
          The Pomodoro Technique is a time management method that uses focused
          work sessions, typically 25 minutes, followed by short breaks. After
          several cycles, a longer break helps you recharge.
        </p>
        <p className="text">
          It aims to reduce mental fatigue, increase sustained concentration,
          and improve productivity through rhythmic work-rest intervals.
        </p>
        <a
          className="btn primary"
          href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
          target="_main"
        >
          Learn more on Wikipedia
        </a>
      </motion.div>
    </div>
  );
}
