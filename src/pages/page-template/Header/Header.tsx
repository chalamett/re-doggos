// Імпортуємо необхідні бібліотеки та компоненти
import React, { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faDog, faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

// Імпортуємо користувацькі компоненти
import ModeToggler from "../ModeToggler/ModeToggler";
import SearchBar from "../SearchBar";
import MobileMenu from "../MobileMenu";
import RandomDog from "../RandomDog";

import Toggle from "components/Toggle";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { switchToggle } from "store/reducers/toggleSlice";
import styles from "./Header.module.scss";

const Header = () => {
  // Отримуємо поточне розташування маршруту
  const location = useLocation();
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();
  // Отримуємо функцію dispatch з Redux
  const dispatch = useAppDispatch();
  // Визначаємо ідентифікатори для перемикачів меню та пошуку
  const mobileMenuToggle = "mobileMenuToggle";
  const mobileSearchToggle = "mobileSearchToggle";
  // Отримуємо стан перемикача мобільного меню
  const showMobileMenu = useAppSelector(
    (state) => state.toggleReducer[mobileMenuToggle]
  );

  // Ініціалізуємо стан для контролю закриття мобільного меню
  const [mobileMeniIsClosed, setMobileMeniIsClosed] = useState<boolean>(true);

  // Функція для перемикання мобільного меню
  const switchMobileMenuHandler = () => {
    setMobileMeniIsClosed(!mobileMeniIsClosed);
    setTimeout(() => {
      dispatch(switchToggle(mobileMenuToggle));
    }, 300);
  };

  // Функція для перемикання мобільного пошуку
  const switchMobileSearchHandler = () => {
    setTimeout(() => {
      dispatch(switchToggle(mobileSearchToggle));
    }, 300);
  };

  // Функція для зміни мови
  const changeLanguageHandler = () => {
    i18next.changeLanguage(t("code"));
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        {/* Компонент для відображення мобільного меню з використанням перемикача */}
        <Toggle id={mobileMenuToggle}>
          <MobileMenu
            mobileMeniIsClosed={mobileMeniIsClosed}
            onCloseMobileMenu={switchMobileMenuHandler}
          />
        </Toggle>
        {/* Іконка для перемикання мобільного меню */}
        <FontAwesomeIcon
          className={styles.mobileMenuToggle}
          icon={showMobileMenu ? faTimes : faBars}
          onClick={switchMobileMenuHandler}
        />

        {/* Іконка для перемикання мобільного пошуку */}
        <FontAwesomeIcon
          className={styles.mobileSearchToggle}
          icon={faSearch}
          onClick={switchMobileSearchHandler}
        />
        {/* Компонент для відображення пошукового рядка з використанням перемикача */}
        <Toggle id={mobileSearchToggle}>
          <SearchBar onClick={switchMobileSearchHandler} />
        </Toggle>

        {/* Лінк на головну сторінку з логотипом */}
        <Link to="/" className={styles.reDoggos}>
          <FontAwesomeIcon icon={faDog} className={styles.faDog} />
          ReDoggos
        </Link>

        {/* Компонент для перемикання теми */}
        <ModeToggler />

        {/* Відображення пошукового рядка */}
        <div className={styles.searchBarWrapper}>
          <SearchBar />
        </div>
        {/* Лінки на сторінки About та DogBreeds */}
        <Link
          to="/about"
          className={`${styles.page} ${styles.about} ${
            location.pathname === "/about" ? styles.underline : ""
          }`}
        >
          {t("about")}
        </Link>
        <Link
          to="/dogbreeds"
          className={`${styles.page} ${
            location.pathname === "/dogbreeds" ? styles.underline : ""
          }`}
        >
          {t("dogBreeds")}
        </Link>
        {/* Компонент для відображення випадкової породи */}
        <div className={styles.page}>
          <RandomDog />
        </div>

        {/* Елемент для зміни мови */}
        <div className={styles.language} onClick={changeLanguageHandler}>
          {t("language")}
        </div>
      </div>
    </React.Fragment>
  );
};

// Експортуємо компонент з використанням memo для оптимізації
export default memo(Header);