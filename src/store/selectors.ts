// Імпортуємо RootState з нашого store
import { RootState } from "./store";
// Імпортуємо createSelector з Redux Toolkit
import { createSelector } from "@reduxjs/toolkit";
// Імпортуємо інтерфейс IBreed
import { IBreed } from "../models";

// Функція для отримання всіх порід з стану breedReducer
const getAllBreeds = (state: RootState) => state.breedReducer.breeds;

// Селектор для отримання лише ID всіх порід
export const getBreedId = createSelector([getAllBreeds], (getAllBreeds) => {
  return getAllBreeds.map((breed) => ({
    id: breed.id,
  }));
});

// Селектор для отримання назв та ID всіх порід
export const getBreedName = createSelector([getAllBreeds], (getAllBreeds) => {
  return getAllBreeds.map((breed) => ({
    name: breed.name,
    id: breed.id,
  }));
});

// Селектор для отримання поточної вибраної породи
export const getCurrentBreed = (state: RootState) =>
  state.filtersReducer.currentBreed;

// Селектор для отримання породи за ID
export const getBreedById = createSelector(
  [getAllBreeds, getCurrentBreed],
  (breeds, breedId) => breeds.find((breed) => breed.id === breedId)
);

// Селектор для отримання всіх зображень порід
export const getBreedPhotos = createSelector(
  [(state: RootState) => state.imageReducer.images],
  (images) => {
    return images;
  }
);

// Селектор для отримання властивостей карток порід
export const getCardProps = createSelector([getAllBreeds], (getAllBreeds) => {
  return getAllBreeds.map((breed) => ({
    id: breed.id,
    cardDesc: breed.cardDesc,
    name: breed.name,
    cardImg: breed.cardImg,
  }));
});

// Функція для отримання всіх значень фільтрів з стану filtersReducer
const getAllFilterValues = (state: RootState) =>
  state.filtersReducer.filterValues;

// Селектор для отримання значень фільтрів
export const getFilterValues = createSelector(
  [getAllFilterValues],
  (getAllFilterValues) => {
    const filterValues = {
      size: getAllFilterValues.size,
      energyLvl: getAllFilterValues.energyLvl,
      groomReqs: getAllFilterValues.groomReqs,
      easeTr: getAllFilterValues.easeTr,
    };
    return filterValues;
  }
);

// Селектор для отримання відфільтрованих порід
export const getFilteredBreeds = createSelector(
  [getAllFilterValues, getAllBreeds],
  (getAllFilterValues, getAllBreeds) => {
    let filteredBreeds: string[] = [];

    // Фільтруємо породи за заданими критеріями
    getAllBreeds.forEach((breed: IBreed) => {
      if (
        (getAllFilterValues.size.length === 0 ||
          getAllFilterValues.size.includes(breed.size)) &&
        (getAllFilterValues.energyLvl.length === 0 ||
          getAllFilterValues.energyLvl.includes(breed.energyLvl)) &&
        (getAllFilterValues.easeTr.length === 0 ||
          getAllFilterValues.easeTr.includes(breed.easeTr)) &&
        (getAllFilterValues.groomReqs.length === 0 ||
          getAllFilterValues.groomReqs.includes(breed.groomReqs))
      ) {
        filteredBreeds.push(breed.id);
      }

      // Якщо жоден фільтр не активний, повертаємо пустий список
      if (
        getAllFilterValues.size.length === 0 &&
        getAllFilterValues.energyLvl.length === 0 &&
        getAllFilterValues.easeTr.length === 0 &&
        getAllFilterValues.groomReqs.length === 0
      ) {
        filteredBreeds = [];
      }
    });
    return filteredBreeds;
  }
);

// Селектор для перевірки, чи застосовано фільтри
export const getIsFiltered = createSelector(
  [getFilteredBreeds],
  (getFilteredBreeds) => {
    return getFilteredBreeds.length > 0;
  }
);

// Селектор для перевірки наявності активних фільтрів
export const getIsFilters = createSelector(
  [getFilterValues],
  (getFilterValues) => {
    return (
      getFilterValues.size.length > 0 ||
      getFilterValues.energyLvl.length > 0 ||
      getFilterValues.groomReqs.length > 0 ||
      getFilterValues.easeTr.length > 0
    );
  }
);

// Функція для отримання всіх значень чекбоксів з стану filtersReducer
const getAllCheckboxValues = (state: RootState) =>
  state.filtersReducer.checkboxValues;

// Селектор для отримання значень чекбоксів
export const getCheckboxValues = createSelector(
  [getAllCheckboxValues],
  (getAllCheckboxValues) => {
    const checkboxValues = {
      size: getAllCheckboxValues.size,
      energyLvl: getAllCheckboxValues.energyLvl,
      groomReqs: getAllCheckboxValues.groomReqs,
      easeTr: getAllCheckboxValues.easeTr,
    };
    return checkboxValues;
  }
);