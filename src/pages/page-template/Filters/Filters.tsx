// Імпортуємо необхідні бібліотеки та компоненти
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  updateFilterValues,
  updateCheckboxValues,
  clearFilterValues,
} from "store/reducers/filterSlice";
import { getFilterValues, getCheckboxValues } from "store/selectors";
import { ICheckbox } from "models";

import styles from "./Filters.module.scss";

// Визначаємо типи пропсів та опцій для фільтрів
type Props = {
  onClick: () => void;
};

type Options = {
  [key: string]: boolean;
};

const Filters = ({ onClick }: Props) => {
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();
  // Отримуємо dispatch функцію з Redux
  const dispatch = useAppDispatch();

  // Отримуємо стан завантаження, значення фільтрів та чекбоксів з Redux
  let loading = useAppSelector((state) => state.breedReducer.isLoading);
  let filterValues = useAppSelector(getFilterValues);
  let checkboxValues = useAppSelector(getCheckboxValues);

  // Обробка зміни стану чекбоксу
  const onCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue: string = e.target.value;
    let newFilterValues = { ...filterValues };
    let newCheckboxValues: ICheckbox = JSON.parse(
      JSON.stringify(checkboxValues)
    );

    let [param, value]: string[] = filterValue.split(": ");

    let valuesToNum: number[] | number = defaultFilters[
      filterOptions.find((opt) => opt.name === param)!.options.indexOf(value)
    ]
      .split(",")
      .map((x) => +x);

    let option: Options =
      newCheckboxValues[param as keyof typeof newCheckboxValues];

    // Додавання або видалення значень фільтру на основі стану чекбоксу
    if (e.target.checked) {
      newFilterValues[param as keyof typeof newFilterValues] =
        newFilterValues[param as keyof typeof newFilterValues].concat(
          valuesToNum
        );
    } else {
      const valuesToDelSet = new Set(valuesToNum);
      newFilterValues[param as keyof typeof newFilterValues] = newFilterValues[
        param as keyof typeof newFilterValues
      ].filter((x) => !valuesToDelSet.has(x));
    }
    option[value] = !option[value];
    dispatch(updateFilterValues({ ...newFilterValues }));
    dispatch(updateCheckboxValues(newCheckboxValues));
  };

  // Стан для управління розташуванням фільтрів
  const [positionLeft, setPosition] = useState(true);

  // Обробка кліку для перемикання позиції фільтрів
  function handleClick() {
    onClick();
    setPosition(!positionLeft);
  }

  // Очищення всіх фільтрів
  const clearFiltersHandler = () => {
    dispatch(clearFilterValues());
  };

  // Опції фільтрів
  const filterOptions: { options: string[]; name: string; tooltip?: string }[] =
    [
      { options: ["small", "medium", "large"], name: "size" },
      {
        options: ["low", "moderate", "high"],
        name: "energyLvl",
      },
      {
        options: ["easy", "average", "difficult"],
        name: "easeTr",
        tooltip: "tooltip1",
      },
      {
        options: ["minimum", "reasonable", "demanding"],
        name: "groomReqs",
        tooltip: "tooltip2",
      },
    ];

  // Значення фільтрів за замовчуванням
  const defaultFilters: string[] = ["1, 2", "3", "4, 5"];

  // Відображення завантажувача, якщо дані ще завантажуються
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.curtain} onClick={handleClick}></div>
      <div className={`${styles.filters} ${positionLeft ? "" : styles.right}`}>
        <button className={styles.resetbtn} onClick={clearFiltersHandler}>
          {t("resetFilters")}
        </button>
        {filterOptions.map((category) => (
          <div key={category.name}>
            <div className={styles.category}>
              {t(category.name)}
              {category.tooltip ? (
                <button className={styles.tooltipbtn}>
                  ?
                  <span className={styles.tooltipContainer}>
                    <span className={styles.tooltipText}>
                      {t(category.tooltip)}
                    </span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                </button>
              ) : null}
            </div>
            {category.options.map((option) => (
              <div className={styles.option} key={option}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={option}
                  value={`${category.name}: ${option}`}
                  checked={
                    checkboxValues[
                      category.name as keyof typeof checkboxValues
                    ][option as keyof typeof Option]
                  }
                  onChange={onCheckboxChanged}
                />
                <label htmlFor={option} className={styles.label}>
                  {t(option)}
                </label>
              </div>
            ))}
          </div>
        ))}

        <button className={styles.backbtn} onClick={handleClick}>
          {t("back")}
        </button>
      </div>
    </div>
  );
};

export default Filters;