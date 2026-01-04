import Link from "next/link";
import styles from "../css_styles/home.module.css";

export default function Home() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={`${styles.title} ${styles.fadeInUp}`}>
          Автоматизация производственных процессов <br />
          <span className={styles.accent}>с помощью AI</span>
        </h1>

        <p
          className={`${styles.subtitle} ${styles.fadeInUp}`}
          style={{ animationDelay: "0.3s" }}
        >
          Мы создаём кастомные решения под ваши задачи — без шаблонов, без SaaS,
          только ваш код.
        </p>

        <div
          className={`${styles.buttons} ${styles.fadeInUp}`}
          style={{ animationDelay: "0.6s" }}
        >
          {/* <button className={styles.primaryBtn}>Запросить PoC</button> */}
          <Link className={styles.primaryBtn} href="/what-we-do">
            Что делаем →
          </Link>
          {/* <button className={styles.secondaryBtn}>Посмотреть кейсы →</button> */}
          <Link className={styles.secondaryBtn} href="/cases">
            Посмотреть кейсы →
          </Link>
        </div>
      </div>
    </section>
  );
}
