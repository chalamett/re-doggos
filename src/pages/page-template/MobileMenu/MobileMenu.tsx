// Імпортуємо необхідні бібліотеки та компоненти
import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import RandomDog from "../RandomDog";

import styles from "./MobileMenu.module.scss";

// Визначаємо типи пропсів для компоненту
type Props = {
  mobileMeniIsClosed: boolean; // Визначає чи мобільне меню закрите
  onCloseMobileMenu: () => void; // Функція для закриття мобільного меню
};

// Компонент MobileMenu з використанням пропсів
export const MobileMenu = ({ mobileMeniIsClosed, onCloseMobileMenu }: Props) => {
  const { t } = useTranslation(); // Ініціалізуємо переклад з i18next

  return (
    // Контейнер для мобільного меню, який викликає onCloseMobileMenu при кліку
    <div className={styles.mobileMenu} onClick={onCloseMobileMenu}>
      <div
        className={`${styles.content} ${mobileMeniIsClosed ? styles.right : styles.left}`}
      >
        {/* Посилання на сторінку з породами собак */}
        <Link to="/dogbreeds">{t("dogBreeds")}</Link>
        <div className={styles.line}></div>
        {/* Компонент для відображення випадкової породи собаки */}
        <RandomDog />
        <div className={styles.line}></div>
        {/* Посилання на сторінку "Про нас" */}
        <Link to="/about">{t("about")}</Link>
        <div className={styles.line}></div>
        {/* Посилання на GitHub */}
        Github
      </div>
    </div>
  );
};

// Експортуємо компонент з використанням memo для оптимізації
export default memo(MobileMenu);