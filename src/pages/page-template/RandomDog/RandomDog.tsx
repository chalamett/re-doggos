// Імпортуємо необхідні бібліотеки та компоненти
import { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Імпортуємо стилі для компоненту
import styles from "./RandomDog.module.scss";

// Імпортуємо необхідні дії та селектори з Redux
import { fetchImages } from "store/action-creators";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { getBreedId } from "store/selectors";

const RandomDog = () => {
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();
  // Отримуємо dispatch функцію з Redux
  const dispatch = useAppDispatch();
  // Отримуємо стан завантаження з Redux
  let isLoading = useAppSelector((state) => state.breedReducer.isLoading);

  // Отримуємо список ID порід собак з Redux
  const breedsIds = useAppSelector(getBreedId);

  // Ініціалізуємо стан для зберігання випадкової породи
  const [randomPage, setRandomPage] = useState<string>("akita");

  // Функція для оновлення випадкової породи
  function updateRandomPage() {
    setRandomPage(breedsIds[Math.floor(Math.random() * breedsIds.length)].id);
  }

  // Перевірка, чи кнопка має бути неактивною
  const isButtonDisabled: boolean = Object.keys(breedsIds).length === 0;

  // Використовуємо useEffect для оновлення випадкової породи при зміні стану завантаження або списку порід
  useEffect(() => {
    if (!isLoading && breedsIds.length > 0) {
      updateRandomPage();
    }
  }, [isLoading, breedsIds]);

  // Обробник кліку по кнопці для отримання випадкової породи
  const randomDogHandler = () => {
    updateRandomPage();
    dispatch(fetchImages(randomPage));
  };

  return (
    <Link to={`/dogbreeds/${randomPage}`}>
      <button
        disabled={isButtonDisabled}
        className={styles.randomDog}
        onClick={randomDogHandler}
      >
        {t("randomDog")}
      </button>
    </Link>
  );
};

// Експортуємо компонент, використовуючи memo для оптимізації
export default memo(RandomDog);