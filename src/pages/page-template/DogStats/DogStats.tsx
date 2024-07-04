// Імпортуємо необхідні бібліотеки та компоненти
import { useTranslation } from "react-i18next";

import styles from "./DogStats.module.scss";

// Визначаємо типи пропсів для компонента DogStats
type Props = {
  n: number; // Значення статистики
  stat: string; // Назва статистики
};

// Компонент для відображення статистики породи собак
export const DogStats = ({ n, stat }: Props) => {
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();

  return (
    <div className={styles.dogStat}>
      {/* Відображаємо назву статистики */}
      <div className={styles.statName}>{t(stat)}</div>
      <div className={styles.statsContainer}>
        {/* Відображаємо значення статистики у вигляді заповнених або порожніх блоків */}
        {[0, 1, 2, 3, 4].map((el) => (
          <div className={`${styles.stat} ${n > el ? styles.filled : styles.empty}`} key={el}></div>
        ))}
      </div>
    </div>
  );
};

export default DogStats;