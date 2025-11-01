import { useMemo } from "react";
import { motion } from "motion/react";

export default function ProgressRing({ seconds, totalSeconds, accentClass }) {
  const size = 240;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = useMemo(() => {
    if (totalSeconds === 0) return 0;
    return seconds / totalSeconds;
  }, [seconds, totalSeconds]);

  const dashOffset = useMemo(() => {
    return circumference * (1 - progress);
  }, [circumference, progress]);

  return (
    <div className={`progress-ring ${accentClass}`}>
      <svg width={size} height={size} className="ring-svg">
        <circle
          className="ring-track"
          strokeWidth={stroke}
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
        />
        <motion.circle
          className="ring-progress"
          strokeWidth={stroke}
          strokeLinecap="round"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{
            transform: "rotate(0deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
    </div>
  );
}
