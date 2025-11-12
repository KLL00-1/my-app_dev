
import Link from "next/link";
import styles from "../../../css_styles/current-case.module.css";

const ProductDetails = async ({ params }) => {
  const { current_case } = await params;

  const products = {
    "ai-hub": {
      title: "AI-Хаб — единый центр управления нейросетями для бизнеса",
      intro:
        "AI-Хаб — это внутренняя платформа, объединяющая ключевые нейросети и инструменты генерации данных в одном безопасном интерфейсе. Решение подходит компаниям, которые хотят использовать AI системно и централизованно.",
      image: "/vecteezy_adobe-illustrator-ai-logo_54666048.png",
      sections: [
        {
          title: "1. Единый доступ к нейросетям",
          text: "Подключайте ChatGPT, Claude, Gemini, Mistral и локальные модели — в одном интерфейсе. Управляйте токенами, доступами и версиями моделей централизованно.",
        },
        {
          title: "2. Управление командами и проектами",
          text: "Назначайте роли, контролируйте использование API и интеграцию нейросетей в рабочие процессы отдела маркетинга, продаж и аналитики.",
        },
        {
          title: "3. Аналитика и безопасность",
          text: "Система логирования и мониторинга позволяет отслеживать все AI-запросы, видеть эффективность, частоту и стоимость использования. Данные хранятся на серверах клиента.",
        },
      ],
    },

    automation: {
      title: "AI-Автоматизация производств",
      intro:
        "Мы разрабатываем кастомные решения для автоматизации производственных процессов — от анализа данных до внедрения предиктивных AI-моделей. Всё создаётся под конкретные задачи и инфраструктуру клиента.",
      image: "/vecteezy_businessman-hand-touching-virtual-brain-icon-a-i-the-use_3582979.jpg",
      sections: [
        {
          title: "1. Компьютерное зрение для контроля качества",
          text: "AI Vision выявляет дефекты на линии в реальном времени, снижая процент брака и ускоряя контроль производства.",
        },
        {
          title: "2. Предиктивная аналитика оборудования",
          text: "Модели прогнозируют износ и отказы узлов на основе данных датчиков, что позволяет сократить простои до 40%.",
        },
        {
          title: "3. Оптимизация энергопотребления и логистики",
          text: "AI анализирует энергопрофили и маршруты поставок, предлагая сценарии экономии ресурсов и времени.",
        },
      ],
    },
  };

  const product = products[current_case];

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Продукт не найден</h2>
        <p>Проверьте адрес страницы или вернитесь на главную.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Link className={styles.back_link} href={"/products"}>←</Link>
        <div className={styles.header}>
          <div className={`${styles.imageWrapper} ${styles.fadeInUp}`}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
          </div>

          <div
            className={`${styles.headerText} ${styles.fadeInUp}`}
            style={{ animationDelay: "0.2s" }}
          >
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.intro}>{product.intro}</p>
          </div>
        </div>
        <div className={styles.content}>
          {product.sections.map((section, index) => (
            <div
              key={index}
              className={`${styles.block} ${styles.fadeInUp}`}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
            >
              <h3 className={styles.blockTitle}>{section.title}</h3>
              <p className={styles.blockText}>{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
