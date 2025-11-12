

import styles from "../../css_styles/contacts.module.css";

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Готовы внедрить AI в ваш бизнес?</h2>
          <p className={styles.subtitle}>
            Свяжитесь с нами, чтобы обсудить задачи, провести аудит процессов и получить персональное AI-решение.
          </p>

          <div className={styles.actions}>
            <a href="mailto:info@aifuturelab.ru" className={styles.buttonPrimary}>
              Написать нам
            </a>
            <a href="https://t.me/aifuturelab" target="_blank" className={styles.buttonSecondary}>
              Telegram
            </a>
          </div>
        </div>

        <div className={styles.contacts}>
          <div>
            <h3>Контакты</h3>
            <p>📍 Москва, Россия</p>
            <p>✉️ info@aifuturelab.ru</p>
            <p>📞 +7 (999) 123-45-67</p>
          </div>
          <div>
            <h3>Соцсети</h3>
            <a href="https://t.me/aifuturelab" target="_blank">Telegram</a>
            <a href="https://linkedin.com" target="_blank">LinkedIn</a>
            <a href="https://github.com" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
      <div className={styles.glow}></div>
    </section>
  );
}
