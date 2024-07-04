// Імпортуємо необхідні бібліотеки та компоненти
import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

// Імпортуємо селектор для отримання даних про породи
import { getBreedName } from "store/selectors";
import { useAppSelector } from "hooks/redux";
import styles from "./SearchBar.module.scss";

// Визначаємо типи пропсів
type Props = {
  onClick?: () => void;
};

// Компонент SearchBar для пошуку порід собак за назвою
const SearchBar = ({ onClick }: Props) => {
  const { t } = useTranslation();

  // Використовуємо селектори для отримання стану завантаження та помилок
  let isLoading = useAppSelector((state) => state.breedReducer.isLoading);
  let error = useAppSelector((state) => state.breedReducer.error);

  // Отримуємо список порід
  let breeds = useAppSelector(getBreedName);

  // Визначаємо стан для збереження відфільтрованих даних, введеного слова та позиції
  const [filteredData, setFilteredData] = useState<
    { name: string; id: string }[]
  >([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const [positionLeft, setPositionLeft] = useState<boolean>(false);

  // Функція для обробки введеного тексту в поле пошуку
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPositionLeft(true);

      const searchWord: string = event.target.value.trim();
      setWordEntered(searchWord);
      const newFilter: { name: string; id: string }[] = breeds.filter(
        (value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        }
      );

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    },
    // Функція для очищення введеного тексту
    clearInput = (): void => {
      setFilteredData([]);
      setWordEntered("");
      setPositionLeft(false);
    },
    // Функція для обробки кліку на іконку очищення
    handleClick = (): void => {
      if (onClick !== undefined) {
        onClick();
      }
      clearInput();
    },
    // Функція для зміни позиції
    positionHandler = () => {
      setPositionLeft(!positionLeft);
    },
    // Функція для обробки фокусу на поле введення
    onFocusHandler = () => {
      setPositionLeft(true);
    };

  return (
    <>
      <div className={styles.searchBar}>
        {isLoading ? (
          // Відображаємо завантажувач, якщо дані завантажуються
          <svg
            className={styles.loader}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (wordEntered === "" && breeds.length > 0) || error ? (
          // Відображаємо іконку пошуку, якщо немає введеного слова або є помилка
          <FontAwesomeIcon icon={faSearch} className={styles.faSearch} />
        ) : (
          // Відображаємо іконку для очищення поля пошуку
          <FontAwesomeIcon
            onClick={clearInput}
            icon={faTrash}
            className={styles.faTrash}
          />
        )}
        <input
          autoComplete="off"
          type="text"
          placeholder={
            error
              ? t("searchFetchError")
              : breeds.length === 0
              ? t("searchLoading")
              : t("searchBreeds")
          }
          value={wordEntered}
          onChange={handleFilter}
          onFocus={onFocusHandler}
          className={styles.input}
          disabled={breeds.length === 0}
        />
        <FontAwesomeIcon
          onClick={handleClick}
          icon={faTimes}
          className={styles.faTimes}
        />
        {filteredData.length !== 0 && positionLeft ? (
          <div className={styles.searchResults}>
            {filteredData.slice(0, 15).map((value, key) => (
              <Link
                to={`/dogbreeds/${value.id}`}
                key={key}
                target="_blank"
                className={styles.link}
              >
                {value.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      <div
        className={`${styles.curtain} ${
          filteredData.length !== 0 && positionLeft ? "" : styles.hidden
        }`}
        onClick={positionHandler}
      ></div>
    </>
  );
};

export default memo(SearchBar);