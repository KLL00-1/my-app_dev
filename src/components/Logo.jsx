"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../css_styles/logo.module.css";

export default function AnimatedLogo() {
  const [active, setActive] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [typedText, setTypedText] = useState("");
  const logoRef = useRef(null);

  const bubbleText = "Спроси меня о чём угодно...";

  const [inputText, setInputText] = useState("");

  const [dialogWithBot, setDialogWithBot] = useState([]);

  const pushDialog = () => {
    setDialogWithBot((ar) => [...ar, { you: inputText, bot: "" }]);
    setInputText("");
    setTimeout(() => {
      setDialogWithBot((ar) =>
        ar.map((el) => {
          if (el.you === inputText) {
            el.bot = inputText;
          }
          return el;
        })
      );
    }, 4000);
  };

  // движение глаз
  useEffect(() => {
    if (!active) {
      const handleMouseMove = (e) => {
        const rect = logoRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 40) {
          setHovered(true);
          setMouse({ x: dx / rect.width, y: dy / rect.height });
        } else {
          setHovered(false);
          setMouse({ x: 0, y: 0 });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [active]);

  // появление и печать текста в облаке
  useEffect(() => {
    let timer;
    if (hovered && !active) {
      setShowBubble(true);
      setTypedText("");
      let i = 0;
      timer = setInterval(() => {
        setTypedText(bubbleText.slice(0, i));
        i++;
        if (i > bubbleText.length) clearInterval(timer);
      }, 40);
    } else {
      setShowBubble(false);
      setTypedText("");
    }
    return () => clearInterval(timer);
  }, [hovered, active]);

  return (
    <div className={styles.wrapper}>
      {!active ? (
        <div
          className={`${styles.robot} ${hovered ? styles.hovered : ""}`}
          ref={logoRef}
          onClick={() => setActive(true)}
        >
          <div className={styles.antenna} />
          <div className={styles.head}>
            <div
              className={styles.eye}
              style={{
                transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`,
              }}
            />
            <div
              className={styles.eye}
              style={{
                transform: `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`,
              }}
            />
          </div>
          <div className={styles.mouth} />

          {showBubble && (
            <div className={styles.bubble}>
              <span>{typedText}</span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.overlay}>
          <div
            style={
              dialogWithBot.length
                ? { transform: "translate(0, -300px)" }
                : {}
            }
            className={styles.expandedRobot}
          >
            <div className={styles.antenna} />
            <div className={styles.head_1}>
              <div className={styles.eye} />
              <div className={styles.eye} />
            </div>
            <div className={styles.mouth_1} />
            <div className={styles.inputContainer}>
              <input
                type="text"
                placeholder="Спроси меня о чём угодно..."
                className={styles.input}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoFocus
              />
              <button
                className={styles.closeBtn}
                onClick={() => {
                  setActive(false);
                  setDialogWithBot([])
                }}
              >
                ✕
              </button>
              {inputText && (
                <button className={styles.sendButton} onClick={pushDialog}>
                  Спросить
                </button>
              )}
            </div>
          </div>
          <div
            style={
              dialogWithBot.length
                ? { transform: "translate(0, -300px)" }
                : {}
            }
            className={styles.dialog_with_bot}
          >
            {dialogWithBot.map((el, index) => {
              return (
                <div key={index}>
                  <div className={styles.you}>{el.you} :Вы</div>
                  {el.bot ? (
                    <div className={styles.bot}>Бот: {el.bot}</div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
