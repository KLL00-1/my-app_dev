"use client";

import { useSwitcherState } from "../stores/useStore";
import styles from "../css_styles/logo.module.css";

export default function AIChatButton({}) {
  const { switcher, setSwitcher } = useSwitcherState();

  return (
    <button
      className={`${styles.wrapper} ${
        switcher === "site" ? styles.active : ""
      }`}
      onClick={() => setSwitcher("chat")}
      title="Открыть AI чат"
      aria-label="Открыть AI чат"
    >
      <svg
        className={styles.robot}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Голова */}
        <rect
          x="20"
          y="25"
          width="80"
          height="70"
          rx="18"
          className={styles.head}
        />

        {/* Глаза */}
        <circle cx="45" cy="55" r="6" className={styles.eye} />
        <circle cx="75" cy="55" r="6" className={styles.eye} />

        {/* Рот / индикатор */}
        <rect
          x="45"
          y="72"
          width="30"
          height="6"
          rx="3"
          className={styles.mouth}
        />

        {/* Антенна */}
        <line x1="60" y1="15" x2="60" y2="25" className={styles.antenna} />
        <circle cx="60" cy="12" r="4" className={styles.antennaDot} />
      </svg>
    </button>
  );
}
