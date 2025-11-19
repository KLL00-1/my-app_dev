import styles from "../../css_styles/how-it-works.module.css";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Анализ бизнес-процессов",
      text: "Мы изучаем производственную цепочку, выявляем узкие места и формируем гипотезы, где AI может повысить эффективность.",
    },
    {
      number: "02",
      title: "Проектирование решения",
      text: "Создаём архитектуру, подбираем модели, определяем точки интеграции и готовим PoC для тестирования концепции.",
    },
    {
      number: "03",
      title: "Разработка и внедрение",
      text: "Реализуем кастомное решение, интегрируем его в инфраструктуру предприятия и обучаем сотрудников.",
    },
    {
      number: "04",
      title: "Поддержка и развитие",
      text: "Мы сопровождаем систему, обновляем модели, добавляем новые AI-модули по мере роста вашего бизнеса.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${styles.fadeInUp}`}>Как это работает</h2>
        <p className={`${styles.subtitle} ${styles.fadeInUp}`} style={{ animationDelay: "0.2s" }}>
          Внедрение AI-решений под ключ — от анализа до поддержки.
        </p>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.step} ${styles.fadeInUp}`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <div className={styles.number}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
