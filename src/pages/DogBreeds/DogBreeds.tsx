// Імпортуємо необхідні бібліотеки та компоненти
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";

import CardsList from "pages/page-template/CardsList";
import Filters from "pages/page-template/Filters";

import ScrollToTop from "components/ScrollToTop";
import Toggle from "components/Toggle";
import { switchToggle } from "store/reducers/toggleSlice";
import { useAppDispatch } from "hooks/redux";
import styles from "./DogBreeds.module.scss";

const DogBreeds = () => {
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();
  // Отримуємо dispatch функцію з Redux
  const dispatch = useAppDispatch();
  // Визначаємо ідентифікатор для перемикача фільтрів
  const filtersToggle = "filtersToggle";

  // Функція для перемикання відображення фільтрів
  const switchFiltersHandler = () => {
    setTimeout(() => {
      dispatch(switchToggle(filtersToggle));
    }, 300);
  };

  return (
    <div className={styles.dogBreeds}>
      {/* Компонент для автоматичного прокручування до верху сторінки */}
      <ScrollToTop />

      {/* Компонент для відображення фільтрів з використанням перемикача */}
      <Toggle id={filtersToggle}>
        <Filters onClick={switchFiltersHandler} />
      </Toggle>

      <div className={styles.contentWrapper}>
        {/* Іконка для відображення меню фільтрів */}
        <FontAwesomeIcon
          icon={faBars}
          onClick={switchFiltersHandler}
          className={styles.bars}
        />
        <div className={styles.content}>
          {/* Кнопка для відображення фільтрів */}
          <button
            onClick={switchFiltersHandler}
            className={styles.filterBreeds}
          >
            <FontAwesomeIcon icon={faFilter} />
            {t("filterBreeds")}
          </button>
          {/* Компонент для відображення списку карток з породами собак */}
          <CardsList />
        </div>
      </div>
    </div>
  );
};

export default memo(DogBreeds);
