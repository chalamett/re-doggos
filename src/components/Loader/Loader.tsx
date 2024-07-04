// src/pages/components/Loader/Loader.tsx

// Імпортуємо стилі з файлу Loader.module.scss
import styles from "./Loader.module.scss";

// Компонент Loader для відображення анімації завантаження
const Loader = () => {
  return (
    // Контейнер для анімації завантаження
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span>Loading...</span>
        {/* // Текст, який відображається під час завантаження */}
      </div>
    </div>
  );
};

// Експортуємо компонент Loader за замовчуванням
export default Loader;
