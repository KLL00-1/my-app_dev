"use client";

import { useEffect, useState } from "react";
import styles from "../css_styles/cookieNotice.module.css";
import { useSwitcherState } from "@/stores/useStore";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const { switcher, setSwitcher } = useSwitcherState();

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) {
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;
  if(switcher != 'site') return null 

  return (
    <div className={styles.wrapper}>
      <div className={styles.notice}>
        <p>
          Наш веб-сайт использует <span>cookies</span>, необходимые для его
          корректной работы.
        </p>
        <button onClick={acceptCookies}>ОК</button>
      </div>
    </div>
  );
}
