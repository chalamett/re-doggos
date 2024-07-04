// Імпортуємо необхідні бібліотеки та компоненти
import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./ErrorPage.module.scss";

// Оголошуємо типи для пропсів компонента ErrorPage
type Props = {
  path: string;    // Шлях для перенаправлення при натисканні кнопки
  title: string;   // Заголовок повідомлення про помилку
  message: string; // Текст повідомлення про помилку
  button: string;  // Текст кнопки
};

// Компонент ErrorPage для відображення сторінки помилки
const ErrorPage = ({ path, title, message, button }: Props) => {
  // Ініціалізуємо функцію перекладу з i18next
  const { t } = useTranslation();

  return (
    <div className={styles.errorPage}>
      {/* Відображаємо заголовок повідомлення про помилку */}
      <div className={styles.title}>{t(title)}</div>
      {/* Відображаємо текст повідомлення про помилку */}
      <div className={styles.message}>{t(message)}</div>
      {/* Кнопка для перенаправлення на вказаний шлях */}
      <Link to={path} className={styles.btn}>
        {t(button)}
      </Link>
    </div>
  );
};

// Експортуємо компонент, використовуючи memo для оптимізації продуктивності
export default memo(ErrorPage);