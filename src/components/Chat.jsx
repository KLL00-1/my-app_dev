"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../css_styles/chat.module.css";
import { useMessagesState } from "@/stores/useStore";

export default function Chat({ setSwitcher }) {
  const { messages, setMessages, setMessagesForBot } = useMessagesState();
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      const vh = window.visualViewport.height;
      const chatEl = document.querySelector(`.${styles.chat}`);
      if (chatEl) chatEl.style.height = `${vh}px`;
    };

    window.visualViewport.addEventListener("resize", handleResize);
    return () =>
      window.visualViewport.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const initialized = useRef(false); // 👈 ГАРД

  useEffect(() => {
    if (initialized.current) return; // 👈 защита от double call
    initialized.current = true;
    setTimeout(() => setVisible(true), 200);
    if (!messages.length)
      setTimeout(() => {
        typeBotMessage("Привет! 👋 Что ты хочешь узнать?");
      }, 600);
  }, []);

  const typeBotMessage = (text) => {
    setIsTyping(true);
    let index = 0;

    setMessages({ from: "bot", text: "" });
    const interval = setInterval(() => {
      index++;

      setMessagesForBot(text, index); // глобальный зустанд стайт для вывода сообщений от бота через печать

      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22); // скорость печати
  };

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput("");
    setMessages({ from: "user", text: userText });

    // здесь будет работа с API от нейросети

    setTimeout(() => {
      typeBotMessage(
        "Отличный вопрос. Я могу рассказать про AI-мониторинг линии сборки, предиктивную аналитику станков или корпоративный AI Hub. Что вам ближе?"
      );
    }, 500);
  };

  return (
    <div className={`${styles.wrapper} ${visible ? styles.show : ""}`}>
      <div className={styles.chat}>
        <div className={styles.header}>
          <div className={styles.status} />
          <span>AI-Консультант</span>
          <span
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => setSwitcher("site")}
          >
            Перейти на сайт
          </span>
        </div>
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.message} ${
                msg.from === "bot" ? styles.bot : styles.user
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className={styles.inputDock}>
        <input
          value={input}
          placeholder="Задайте вопрос об AI-автоматизации…"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➜</button>
      </div>
    </div>
  );
}
