"use client";

import { useState, useEffect } from "react";
import styles from "../../css_styles/calculator.module.css";

export default function RoiCalculator() {
  const [employees, setEmployees] = useState(100);
  const [salary, setSalary] = useState(80000);
  const [automation, setAutomation] = useState(20);
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    const saved = employees * salary * (automation / 100) * 12;
    setRoi(saved);
  }, [employees, salary, automation]);

  return (
    <section className={`${styles.section} ${styles.fadeInUp}`}>
      <div className={styles.container}>
        <div>
          <h2 className={`${styles.title} ${styles.fadeInUp}`}>
            Интерактивный <span>ROI симулятор</span>
          </h2>
          <p
            className={`${styles.subtitle} ${styles.fadeInUp}`}
            style={{ animationDelay: "0.2s" }}
          >
            Оцените, сколько ваша компания может сэкономить с внедрением
            AI-автоматизации.
          </p>
          <button className={styles.get_offer}>Получить детальный рассчет</button>
        </div>
        <div
          className={`${styles.calculator} ${styles.fadeInUp}`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className={styles.inputGroup}>
            <label>Количество сотрудников</label>
            <input
              type="range"
              min="10"
              max="1000"
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
            />
            <span>{employees}</span>
          </div>

          <div className={styles.inputGroup}>
            <label>Средняя зарплата (₽/мес)</label>
            <input
              type="range"
              min="30000"
              max="300000"
              step="1000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
            <span>{salary.toLocaleString("ru-RU")} ₽</span>
          </div>

          <div className={styles.inputGroup}>
            <label>Процент процессов, которые можно автоматизировать</label>
            <input
              type="range"
              min="0"
              max="100"
              value={automation}
              onChange={(e) => setAutomation(Number(e.target.value))}
            />
            <span>{automation}%</span>
          </div>

          <div className={styles.resultBox}>
            <h3>Ожидаемая экономия за год:</h3>
            <p className={styles.result}>{roi.toLocaleString("ru-RU")} ₽</p>
            <p className={styles.note}>
              (Оценка примерная. Точный ROI рассчитывается после аудита
              процессов.)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
