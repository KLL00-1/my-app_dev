"use client";

import { useUIStore } from "../../stores/useStore";
import styles from "../../css_styles/contacts.module.css";

export default function CallToAction() {
  const { openForm } = useUIStore();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Готовы внедрить AI в ваш бизнес?</h2>
          <p className={styles.subtitle}>
            Свяжитесь с нами, чтобы обсудить задачи, провести аудит процессов и
            получить персональное AI-решение.
          </p>

          <div className={styles.actions}>
            <div onClick={openForm} className={styles.buttonPrimary}>
              Связаться с нами
            </div>
            <a
              href="https://t.me/KLL001"
              target="_blank"
              className={styles.buttonSecondary}
            >
              Telegram
            </a>
          </div>
        </div>

        <div className={styles.contacts}>
          <div>
            <h3>Контакты</h3>
            <p>📍 г Москва, Погорельский пер, д 5 стр 2, офис №30</p>
            <p>✉️ ai@asrtratech.team</p>
            <p>📞 +7 (901) 444-44-71</p>
          </div>
          <div>
            <h3>Соцсети</h3>
            <a href="https://t.me/ai_for_buisnes" target="_blank">
              Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
