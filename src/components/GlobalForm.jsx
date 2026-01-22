"use client";

import { useEffect, useState } from "react";
import styles from "../css_styles/globalForm.module.css";
import { useSwitcherState, useUIStore, useSessionId } from "../stores/useStore";
import { IMaskInput } from "react-imask";
import { validate } from "../app/utils";
import { dalApi } from "../app/dal.api";

export default function GlobalForm() {
  const { isFormOpen, closeForm } = useUIStore();
  const [visible, setVisible] = useState(false);
  const { switcher } = useSwitcherState();
  const { sessionId } = useSessionId();
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");
  const typeDate = (e) => {
    const key = e.target.name;
    let value = e.target.value;
    setFormState((state) => ({ ...state, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formState, setError)) return;

    const message = `
id Сессии: ${sessionId}    
Новая заявка с сайта:
Имя / Компания: ${formState.name}
Телефон: ${formState.phone}
Email: ${formState.email}
    `;

    try {
      const res = await dalApi.sendContacts(message);
      if (res !== "ok") throw new Error("Ошибка отправки заявки");
      else alert("Заявка отправлена!");
      setFormState({ name: "", phone: "", email: "" });
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки. Попробуйте позже.");
    }
  };

  useEffect(() => {
    if (isFormOpen && switcher == "site") {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isFormOpen, switcher]);

  if (!isFormOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.show : ""}`}
      onClick={closeForm}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          Оставьте заявку
          <span> — мы свяжемся с вами</span>
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            onChange={(e) => typeDate(e)}
            name="name"
            type="text"
            placeholder="Имя или компания"
            required
            value={formState.name}
          />

          <IMaskInput
            mask="+{7} (000) 000-00-00"
            value={formState.phone}
            required
            placeholder="Телефон"
            onAccept={(value) =>
              setFormState((state) => ({ ...state, phone: value }))
            }
          />

          <input
            onChange={(e) => typeDate(e)}
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formState.email}
          />
          {error && <span style={{ color: "red" }}>{error}</span>}
          <button type="submit">Отправить заявку →</button>
        </form>
      </div>
    </div>
  );
}
