// Імпортуємо необхідні модулі з бібліотеки @reduxjs/toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter, ICheckbox } from "models";

// Оголошуємо інтерфейс для стану фільтрів
interface FilterState {
  filterValues: IFilter; // Значення фільтрів
  checkboxValues: ICheckbox; // Значення чекбоксів
  currentBreed: string; // Поточна порода
}

// Встановлюємо початковий стан
const initialState: FilterState = {
  filterValues: {
    size: [],
    energyLvl: [],
    easeTr: [],
    groomReqs: [],
  },
  checkboxValues: {
    size: {
      small: false,
      medium: false,
      large: false,
    },
    energyLvl: {
      low: false,
      moderate: false,
      high: false,
    },
    easeTr: {
      easy: false,
      average: false,
      difficult: false,
    },
    groomReqs: {
      minimum: false,
      reasonable: false,
      demanding: false,
    },
  },
  currentBreed: "", // Початково порода не вибрана
};

// Створюємо slice для управління станом фільтрів
export const filterReducer = createSlice({
  name: "filter", // Ім'я slice
  initialState, // Початковий стан
  reducers: {
    // Обробник дії очищення значень фільтрів
    clearFilterValues: () => initialState,
    // Обробник дії оновлення значень фільтрів
    updateFilterValues: (state, action: PayloadAction<IFilter>) => {
      state.filterValues = action.payload;
    },
    // Обробник дії оновлення значень чекбоксів
    updateCheckboxValues: (state, action: PayloadAction<ICheckbox>) => {
      state.checkboxValues = action.payload;
    },
    // Обробник дії оновлення поточної породи
    updateCurrentBreed: (state, action: PayloadAction<string>) => {
      state.currentBreed = action.payload;
    },
  },
});

// Експортуємо дії для фільтрів
export const {
  clearFilterValues,
  updateFilterValues,
  updateCheckboxValues,
  updateCurrentBreed,
} = filterReducer.actions;

// Експортуємо ред'юсер
export default filterReducer.reducer;