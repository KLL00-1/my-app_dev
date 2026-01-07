"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "../css_styles/start.module.css";
import Chat from "./Chat";
import { useSessionId, useSwitcherState } from "@/stores/useStore";
import { v4 } from "uuid";

const TITLE_TEXT = "Как подружить ИИ\nи Ваш бизнес";
const HIGHLIGHTS = ["ИИ", "Ваш"];

export default function Start() {
  // const [switcher, setSwitcher] = useState(null);
  const [title, setTitle] = useState("");
  const started = useRef(false);

  const { switcher, setSwitcher } = useSwitcherState(); // теперь мы получаем это состояние из глобального стайт менеджера
  const { sessionId, setSessionId } = useSessionId();

  useEffect(() => {
    if (!sessionId) setSessionId(v4()); // при первой загрузке создаём уникальный sessionId
  }, []);

  // typing effect для заголовка
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let i = 0;
    const interval = setInterval(() => {
      setTitle(TITLE_TEXT.slice(0, i));
      i++;
      if (i > TITLE_TEXT.length) clearInterval(interval);
    }, 28);

    // если пользователь уже выбирал путь
    // const saved = localStorage.getItem("entryMode");
    // if (saved) setSwitcher(saved);

    return () => clearInterval(interval);
  }, []);

  const choose = (mode) => {
    // localStorage.setItem("entryMode", mode);
    setSwitcher(mode);
  };

  function renderTitle(text) {
    let result = [text];

    HIGHLIGHTS.forEach((word, wIndex) => {
      result = result.flatMap((part) =>
        typeof part === "string"
          ? part.split(word).flatMap((p, i, arr) =>
              i < arr.length - 1
                ? [
                    p,
                    <span
                      key={`accent-${wIndex}-${i}`}
                      className={styles.accent}
                    >
                      {word}
                    </span>,
                  ]
                : [p]
            )
          : part
      );
    });

    return result;
  }

  return (
    <div
      className={`${styles.wrapper} ${
        switcher === "site" ? styles.hideSite : ""
      } ${switcher === "chat" ? styles.chatMode : ""}`}
    >
      {!switcher ? (
        <>
          <h1 className={styles.title}>
            {/* {title} */}
            {renderTitle(title)}
            <span className={styles.cursor}>▍</span>
          </h1>

          <p className={styles.subtitle}>Белая или голубая таблетка?</p>

          <div className={styles.actions}>
            <button
              onClick={() => choose("site")}
              // onClick={increment}
              className={`${styles.button} ${styles.first}`}
            >
              Посмотреть сайт
              <span>Ознакомиться с решениями</span>
            </button>

            <button
              onClick={() => choose("chat")}
              className={`${styles.button} ${styles.second}`}
            >
              Получить то, зачем пришёл
              <span>AI подберёт решение за 1–2 минуты</span>
            </button>
          </div>
        </>
      ) : (
        switcher !== "site" && (
          <Chat setSwitcher={setSwitcher} sessionId={sessionId} />
        )
      )}
    </div>
  );
}
