import Link from "next/link";
import styles from "../../css_styles/products.module.css";

export default function ProductSection() {
  const products = [
    {
      title: "AI-Хаб",
      href: "ai-hub",
      text: "Единая платформа для бизнеса, которая объединяет нейросети и инструменты автоматизации. Работайте с ChatGPT, Claude, Gemini и другими через единый интерфейс с аналитикой, безопасным хранением и доступами для сотрудников.",
      btn: "Подробнее о AI-Хаб",
      image:
        "/compressed_vecteezy-ai-tech-businessman-show-virtual-graphic-global-internet-45364192_vabhblhm.mp4",
    },
    {
      title: "AI-Автоматизация производств",
      href: "automation",
      text: "Мы разрабатываем индивидуальные AI-системы под конкретные задачи вашего предприятия — от предиктивной аналитики и компьютерного зрения до оптимизации энергопотребления и планирования ресурсов.",
      btn: "Подробнее о решениях",
      image:
        "/vecteezy_ai-technology-the-future-is-now_52003464_compressed_watermarkless.mp4",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${styles.fadeInUp}`}>Наши продукты</h2>
        <p
          className={`${styles.subtitle} ${styles.fadeInUp}`}
          style={{ animationDelay: "0.2s" }}
        >
          AI-решения, созданные под бизнес-задачи. Два ключевых направления —
          один технологический вектор.
        </p>
        <div className={styles.grid}>
          {products.map((product, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.fadeInUp}`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className={styles.imageWrapper}>
                <video autoPlay loop muted playsInline className={styles.image}>
                  <source src={product.image} type="video/webm" />
                  <source src={product.image} type="video/mp4" />
                </video>
                {/* <Image
                  src={product.image}
                  width={355}
                  height={200}
                  unoptimized
                  priority
                  alt={product.title}
                  className={styles.image}
                /> */}
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardText}>{product.text}</p>
                <Link href={`products/${product.href}`}>
                  <button className={styles.button}>{product.btn}</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.glow}></div>
    </section>
  );
}
