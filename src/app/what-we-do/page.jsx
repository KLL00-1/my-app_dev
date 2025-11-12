import styles from "../../css_styles/what_we_do.module.css";

export default function WhatWeDoSection() {
  const items = [
    {
      title: "Предсказание простоев",
      problem: "Неожиданные остановки оборудования снижают производительность.",
      solution:
        "Мы внедряем системы прогнозирования отказов на основе данных сенсоров и AI-моделей.",
      icon: "⚙️",
    },
    {
      title: "Оптимизация энергопотребления",
      problem: "Избыточное использование ресурсов увеличивает себестоимость.",
      solution:
        "AI анализирует энергопрофили оборудования и предлагает сценарии оптимизации до 20%.",
      icon: "💡",
    },
    {
      title: "Контроль качества через Vision",
      problem:
        "Ручной контроль качества отнимает время и зависит от человеческого фактора.",
      solution:
        "AI Vision выявляет брак на линии в реальном времени, снижая потери и ускоряя отгрузку.",
      icon: "🔍",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${styles.fadeInUp}`}>Что мы делаем</h2>
        <p
          className={`${styles.subtitle} ${styles.fadeInUp}`}
          style={{ animationDelay: "0.2s" }}
        >
          Мы решаем конкретные задачи бизнеса — автоматизируя производство с
          помощью AI и анализа данных.
        </p>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.fadeInUp}`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.problem}>
                <span style={{color:'red'}}>Проблема:</span> {item.problem}
              </p>
              <p className={styles.solution}>
                <span style={{color:'green'}}>Решение:</span> {item.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.glow}></div>
    </section>
  );
}
