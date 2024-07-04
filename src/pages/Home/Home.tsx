// Імпортуємо необхідні бібліотеки та компоненти
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./Home.module.scss";

// Компонент Home відображає головну сторінку додатку
const Home = () => {
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();

  return (
    // Головний контейнер сторінки з класом стилів
    <div className={styles.home}>
      {/* Контейнер для основного контенту сторінки */}
      <div className={styles.homeContent}>
        {/* Заголовок галереї собак */}
        <div className={styles.dogsGallery}>{t("dogsGallery")}</div>
        {/* Основний текст головної сторінки */}
        <div className={styles.homeMain}>{t("homeMain")}</div>
        {/* Контейнер для кнопок */}
        <div className={styles.buttons}>
          {/* Посилання на сторінку зі списком порід собак */}
          <Link to="/dogbreeds" className={styles.browseBreeds}>
            {t("browseButton")}
          </Link>
          {/* Посилання на GitHub з іконкою */}
          <a
            href="https://github.com/chalamett/re-doggos/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github}
          >
            GitHub
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </a>
        </div>
      </div>
    </div>
  );
};

// Використовуємо memo для оптимізації компонента
export default Home;