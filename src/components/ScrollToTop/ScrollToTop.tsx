// Імпортуємо необхідні бібліотеки та стилі
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./ScrollToTop.module.scss";

// Компонент ScrollToTop додає кнопку прокрутки до верху сторінки
const ScrollToTop = () => {
  // Використовуємо стан для контролю видимості кнопки
  const [showButton, setShowButton] = useState<boolean>(false);

  // Використовуємо useEffect для додавання слухача подій прокрутки
  useEffect(() => {
    // Додаємо слухача події прокрутки вікна
    window.addEventListener("scroll", () => {
      // Перевіряємо, чи сторінка прокручена більше ніж на 200 пікселів
      if (window.pageYOffset > 200) {
        setShowButton(true); // Показуємо кнопку
      } else {
        setShowButton(false); // Ховаємо кнопку
      }
    });
  }, []);

  // Функція для прокрутки сторінки до верху
  const scrollToTop = () => {
    window.scrollTo({
      top: 0, // Прокрутка до верхньої частини сторінки
      behavior: "smooth", // Плавна прокрутка
    });
  };

  return (
    <>
      {showButton ? (
        // Якщо showButton дорівнює true, відображаємо кнопку
        <button onClick={scrollToTop} className={styles.scrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      ) : null}{" "}
      {/* Інакше нічого не відображаємо */}
    </>
  );
};

export default ScrollToTop;
