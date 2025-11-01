import { motion } from "motion/react";

export default function Settings({
  focusMinutes,
  shortMinutes,
  longMinutes,
  longBreakInterval,
  onChangeFocus,
  onChangeShort,
  onChangeLong,
  onChangeInterval,
  onApply,
}) {
  return (
    <div className="settings">
      <h2 className="settings-title">Settings</h2>
      <div className="settings-grid">
        <div className="form-row">
          <label className="label">Focus (minutes)</label>
          <motion.input
            className="input"
            type="number"
            min="1"
            max="180"
            value={focusMinutes}
            onChange={(e) => onChangeFocus(parseInt(e.target.value || 0, 10))}
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div className="form-row">
          <label className="label">Short break (minutes)</label>
          <motion.input
            className="input"
            type="number"
            min="1"
            max="60"
            value={shortMinutes}
            onChange={(e) => onChangeShort(parseInt(e.target.value || 0, 10))}
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div className="form-row">
          <label className="label">Long break (minutes)</label>
          <motion.input
            className="input"
            type="number"
            min="1"
            max="60"
            value={longMinutes}
            onChange={(e) => onChangeLong(parseInt(e.target.value || 0, 10))}
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div className="form-row">
          <label className="label">Sessions before long break</label>
          <motion.input
            className="input"
            type="number"
            min="1"
            max="12"
            value={longBreakInterval}
            onChange={(e) =>
              onChangeInterval(parseInt(e.target.value || 0, 10))
            }
            whileFocus={{ scale: 1.01 }}
          />
        </div>
      </div>
      <motion.button
        className="btn primary"
        onClick={onApply}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Apply
      </motion.button>
    </div>
  );
}
