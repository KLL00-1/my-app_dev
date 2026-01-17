"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../css_styles/chat.module.css";
import { useMessagesState, useInitApplication } from "@/stores/useStore";
import { dalApi } from "@/app/dal.api";
import { combineStringFunction } from "@/app/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chat({ setSwitcher, sessionId }) {
  const {
    messages,
    setMessages,
    setMessagesForBot,
    deleteLastMessage,
    setAnimatedMessage,
  } = useMessagesState();
  const { setInitApp, isInitApp } = useInitApplication();
  const initialized = useRef(false); // 👈 ГАРД

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

  useEffect(() => {
    if (initialized.current) return; // 👈 защита от double call
    initialized.current = true;

    // при первой загрузке чата, подгружаем историю сообщений
    // если массив приходит пустой, то ничего не делаем, если есть сообщения, то деструктурируем их в глобальный стейт messages
    if (!isInitApp)
      dalApi.getCurrentChat(sessionId).then((res) => {
        if (!res?.length && !messages.length) {
          setTimeout(() => {
            typeBotMessage("Привет! 👋 Что ты хочешь узнать?");
          }, 600);
        } else {
          setMessages({
            role: "assistant",
            content: "Привет! 👋 Что ты хочешь узнать?",
          }); // для того чтобы загружать в стейт первое сообщение от бота каждый раз
          res.forEach((msg) => setMessages(msg));
        }
      });
    setTimeout(() => setVisible(true), 200);
    setInitApp();
  }, []);

  const typeBotMessage = (text) => {
    setIsTyping(true);

    let index = 0;

    setMessages({ role: "assistant", content: "" });
    const interval = setInterval(() => {
      index++;

      setMessagesForBot(text, index); // глобальный зустанд стайт для вывода сообщений от бота через печать

      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22); // скорость печати
  };

  // console.log(messages);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput("");
    setMessages({ role: "user", content: userText });

    const array = [{ role: "user", content: userText }];

    return setTimeout(() => {
      typeBotMessage(
        "Мы работает над нашим ассистентом, нужно немного времени!",
      );
    }, 500);

    setMessages({ role: "assistant", content: "" });

    let index = 0;
    const interval = setInterval(() => {
      index++;

      setAnimatedMessage(index); // глобальный зустанд стайт для вывода сообщений от бота через печать

      if (index >= 3) {
        index = 0;
      }
    }, 200);

    const res = await dalApi.askBot([...messages, ...array]);

    const cleanAnswer = await combineStringFunction(res, sessionId);

    await dalApi.createNewSessionOrUpdateChat(sessionId, [
      ...array,
      { role: "assistant", content: cleanAnswer },
    ]); // мы либо создаем новую сессию, либо обновляем чат, существующей сессии, вся логика происходит на сервере
    clearInterval(interval);
    deleteLastMessage();
    setTimeout(() => {
      typeBotMessage(
        // "Отличный вопрос. Я могу рассказать про AI-мониторинг линии сборки, предиктивную аналитику станков или корпоративный AI Hub. Что вам ближе?"
        cleanAnswer,
      );
    }, 500);
  };
  // console.log(messages);
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
                msg.role === "assistant" ? styles.bot : styles.user
              }`}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>

              {isTyping && i === messages.length - 1 && msg.from === "bot" && (
                <span className={styles.cursor}>▍</span>
              )}
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
