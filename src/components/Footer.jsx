import Link from "next/link";
import styles from "../css_styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              AI<span>Systems</span>
            </div>
            <p className={styles.description}>
              Разрабатываем AI-решения под ключ для бизнеса и производств.
            </p>
          </div>

          <div className={styles.linksGroup}>
            <div className={styles.column}>
              <h4 className={styles.title}>Решения</h4>
              <Link href="/products/automation">AI-Автоматизация</Link>
              <Link href="/products/ai-hub">AI-Хаб</Link>
            </div>

            <div className={styles.column}>
              <h4 className={styles.title}>Компания</h4>
              <Link href="/about">О нас</Link>
              <Link href="/cases">Кейсы</Link>
              <Link href="/contacts">Контакты</Link>
            </div>

            <div className={styles.column}>
              <h4 className={styles.title}>Следите за нами</h4>
              <div className={styles.socials}>
                <a
                  href="https://t.me/ai_for_buisnes"
                  target="_blank"
                  aria-label="Telegram"
                >
                  <img src="/icons/telegram.svg" alt="Telegram" />
                </a>
                {/* <a href="#" aria-label="LinkedIn">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" />
                </a> */}
                <a href="#" aria-label="GitHub">
                  <img src="/icons/github.png" alt="GitHub" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} AI Systems. Все права защищены.</p>
          <Link href="/privacy" className={styles.privacy}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
