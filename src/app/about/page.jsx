import Image from "next/image";
import styles from "../../css_styles/about.module.css";

export default function AboutCompany() {
  const cardArray = [
    {
      counter: "5+",
      description: "лет в разработке IT решений",
    },
    {
      counter: "40+",
      description: "успешных AI-проектов",
    },
    {
      counter: "10+",
      description: "индустрий, где применены наши технологии",
    },
    {
      counter: "99%",
      description: "клиентов рекомендуют нас партнёрам",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>О компании</h2>
          <p className={styles.subtitle}>
            Мы — команда экспертов в области AI и автоматизации, создающая
            индивидуальные решения под задачи вашего бизнеса. За годы работы мы
            реализовали десятки проектов для производственных предприятий,
            IT-компаний и креативных индустрий.
          </p>
          <div className={styles.stats}>
            {cardArray.map((item, key) => {
              return (
                <div
                  key={key}
                  style={{ animationDelay: `${0.3 + key * 0.2}s` }}
                  className={styles.card}
                >
                  <h3>{item.counter}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.partners}>
            <p className={styles.partnersTitle}>Нам доверяют:</p>
            <div className={styles.logos}>
              <div className={styles.partner_container}>
                <Image
                  width={355}
                  height={300}
                  src="/___2025-1.png.webp"
                  alt="Сертификат"
                />
                <Image
                  width={355}
                  height={150}
                  src="/kaspersky.jpg"
                  alt="Партнёр"
                />
              </div>
              <div className={styles.partner_container}>
                <Image
                  width={355}
                  height={400}
                  src="/_______-1.png"
                  alt="Сертификат"
                />
                <Image
                  width={355}
                  height={150}
                  src="/astra_linux.png"
                  alt="Партнёр"
                />
              </div>
              <div className={styles.partner_container}>
                <Image
                  width={355}
                  height={400}
                  src="/___113_9195_03_2024-.png"
                  alt="Сертификат"
                />
                <Image
                  width={355}
                  height={150}
                  src="/red_soft.jpg"
                  alt="Партнёр"
                />
              </div>
              <div className={styles.partner_container}>
                <Image
                  width={355}
                  height={400}
                  src="/_-1.png"
                  alt="Сертификат"
                />
                <Image
                  width={355}
                  height={150}
                  src="/cyber_project.png"
                  alt="Партнёр"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
