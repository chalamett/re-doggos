// Імпортуємо необхідні бібліотеки та компоненти
import { memo, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun as solidSun,
  faMoon as solidMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

import styles from "./ModeToggler.module.scss";

function ModeToggler() {
  // Встановлюємо стан для темної теми та стану наведення миші
  const [isDark, setDark] = useState<boolean>(false);
  const [isHovered, setHovered] = useState<boolean>(false);

  // Отримуємо поточну тему користувача з локального сховища
  const userTheme: string | null = localStorage.getItem("theme");
  // Перевіряємо системну тему (світлу або темну)
  const systemTheme: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // Використовуємо useEffect для встановлення початкової теми
  useEffect(() => {
    if ((!userTheme && systemTheme) || userTheme === "dark") {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Функція для перемикання теми
  const themeSwitch = () => {
    if (isDark) {
      setDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  // Обробники подій для наведення миші
  const handleHoverOver = () => {
    setTimeout(() => setHovered(true), 0.15);
  };

  const handleHoverOut = () => {
    setTimeout(() => setHovered(false), 0.15);
  };

  return (
    <div
      className={styles.modeToggler}
      onMouseOver={handleHoverOver}
      onMouseOut={handleHoverOut}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        id="checkbox"
        checked={isDark}
        onChange={() => {}}
      />
      <label htmlFor="checkbox" className={styles.label} onClick={themeSwitch}>
        <FontAwesomeIcon
          icon={isHovered ? faMoon : solidMoon}
          className={styles.faMoon}
        />
        <FontAwesomeIcon
          icon={isHovered ? faSun : solidSun}
          className={styles.faSun}
        />
        <div className={styles.ball} onClick={themeSwitch}></div>
      </label>
    </div>
  );
}

export default memo(ModeToggler);
