// Підключаємо бібліотеку для багатомовності
import { useTranslation } from "react-i18next";

// Підключаємо функцію для очищення значень фільтрів з ред'юсера
import { clearFilterValues } from "store/reducers/filterSlice";
// Підключаємо кастомний хук для використання dispatch з Redux
import { useAppDispatch } from "hooks/redux";
// Підключаємо стилі для компонента
import styles from "./ZeroMatches.module.scss";

// Оголошуємо компонент ZeroMatches
const ZeroMatches = () => {
  // Використовуємо хук для багатомовності
  const { t } = useTranslation();
  // Отримуємо dispatch для відправки дій у Redux
  const dispatch = useAppDispatch();

  // Функція для очищення фільтрів, яка відправляє відповідну дію у Redux
  const clearFiltersHandler = () => {
    dispatch(clearFilterValues());
  };

  return (
    <div className={styles.zeroMatches}>
      {/* Відображаємо багатомовне повідомлення про відсутність результатів */}
      {t("zeroMatches0")}
      <span> {t("zeroMatches1")}</span>
      <div className={styles.subText}>
        {t("zeroMatches2")}
        {/* Кнопка для очищення фільтрів */}
        <button onClick={clearFiltersHandler} className={styles.resetFilters}>
          {t("resetFilters")}
        </button>
      </div>
    </div>
  );
};

// Експортуємо компонент за замовчуванням
export default ZeroMatches;
