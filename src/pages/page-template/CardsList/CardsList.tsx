// Імпортуємо необхідні бібліотеки та компоненти
import { memo } from "react";
import Card from "../Card";
import { useAppSelector } from "hooks/redux";
import Loader from "components/Loader/Loader";
import ErrorIndicator from "components/ErrorIndicator";
import ZeroMatches from "components/ZeroMatches/ZeroMatches";
import {
  getCardProps,
  getFilteredBreeds,
  getIsFiltered,
  getIsFilters,
} from "store/selectors";
import styles from "./CardsList.module.scss";

// Компонент CardsList, який відображає список карток з породами собак
const CardsList = () => {
  // Отримуємо стан завантаження та помилок з Redux store
  let isLoading = useAppSelector((state) => state.breedReducer.isLoading);
  let error = useAppSelector((state) => state.breedReducer.error);

  // Отримуємо дані карток порід собак та стан фільтрації з Redux store
  let cards = useAppSelector(getCardProps);
  let filteredBreeds = useAppSelector(getFilteredBreeds);
  let isFiltered = useAppSelector(getIsFiltered);
  let isFilters = useAppSelector(getIsFilters);

  // Відображаємо Loader, якщо дані завантажуються
  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );
  }

  // Відображаємо ZeroMatches, якщо фільтри застосовані, але немає результатів
  if (!isFiltered && isFilters) {
    return <ZeroMatches />;
  }

  // Відображаємо ErrorIndicator, якщо сталася помилка при завантаженні даних
  if (error) {
    return <ErrorIndicator />;
  }

  // Відображаємо список карток з породами собак
  return (
    <div className={styles.cardsList}>
      {cards.map((breed) =>
        isFiltered ? (
          filteredBreeds.map((filtered: string) =>
            breed.id === filtered ? <Card key={breed.id} {...breed} /> : null
          )
        ) : (
          <Card key={breed.id} {...breed} />
        )
      )}
    </div>
  );
};

// Експортуємо компонент з використанням memo для оптимізації продуктивності
export default memo(CardsList);