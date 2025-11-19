import Image from "next/image";
import styles from "../../css_styles/cases.module.css";
import Link from "next/link";

export default function CasesSection() {
  const cases = [
    {
      id: 1,
      title: "AI-мониторинг линии сборки",
      text: "Внедрили компьютерное зрение для автоматического выявления дефектов на этапе финальной сборки.",
      result: "−28% брака за 2 месяца",
      image:
        "/Lucid_Origin_An_image_of_a_hightech_assembly_line_in_a_factory_3.jpg",
    },
    {
      id: 2,
      title: "Предиктивная аналитика станков",
      text: "Создали систему прогнозирования износа деталей по данным IoT-датчиков и журналов техобслуживания.",
      result: "−35% простоев оборудования",
      image:
        "/Lucid_Origin_A_futuristic_manufacturing_facility_showcasing_a__3.jpg",
    },
    {
      id: 3,
      title: "AI Hub в корпоративной среде",
      text: "Развернули AI-хаб с интеграцией ChatGPT и Claude для отдела аналитики крупного холдинга.",
      result: "↑ 2.4× рост скорости аналитических отчётов",
      image:
        "/Lucid_Origin_A_dynamic_corporate_AI_Hub_with_multiple_workstat_1.jpg",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${styles.fadeInUp}`}>
          Кейсы и результаты
        </h2>
        <p
          className={`${styles.subtitle} ${styles.fadeInUp}`}
          style={{ animationDelay: "0.2s" }}
        >
          Реальные внедрения AI-решений, которые улучшили эффективность
          компаний.
        </p>

        <div className={styles.grid}>
          {cases.map((item, i) => (
            <Link style={{textDecoration:'none', color:'white'}} key={item.id} href={`cases/${item.id}`}>
              <div
                className={`${styles.card} ${styles.fadeInUp}`}
                style={{ animationDelay: `${0.3 + i * 0.2}s` }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    style={{ opacity: 0.9 }}
                    src={item.image}
                    width={355}
                    height={200}
                    alt={item.title}
                  />

                  {/* <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                /> */}
                </div>
                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.text}>{item.text}</p>
                  <div className={styles.result}>{item.result}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
