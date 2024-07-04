// Імпортуємо необхідні модулі з бібліотеки @reduxjs/toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBreed } from "models";

// Оголошуємо інтерфейс для стану порід
interface BreedState {
  breeds: IBreed[]; // Масив порід
  isLoading: boolean; // Статус завантаження
  error: string | null; // Помилки завантаження
}

// Встановлюємо початковий стан
const initialState: BreedState = {
  breeds: [], // Порожній масив порід
  isLoading: false, // Початково завантаження вимкнено
  error: null, // Помилки відсутні
};

// Створюємо slice для управління станом порід
export const breedReducer = createSlice({
  name: "breed", // Ім'я slice
  initialState, // Початковий стан
  reducers: {
    // Обробник дії початку запиту порід
    fetchBreedsRequest: (state) => {
      state.breeds = []; // Очищуємо масив порід
      state.isLoading = true; // Встановлюємо статус завантаження
      state.error = null; // Очищуємо помилки
    },
    // Обробник дії успішного отримання порід
    fetchBreedsSuccess: (state, action: PayloadAction<IBreed[]>) => {
      state.breeds = action.payload; // Зберігаємо отримані породи
      state.isLoading = false; // Вимикаємо статус завантаження
    },
    // Обробник дії невдалого запиту порід
    fetchBreedsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false; // Вимикаємо статус завантаження
      state.error = action.payload; // Зберігаємо повідомлення про помилку
    },
  },
});

// Експортуємо дії для запиту порід
export const { fetchBreedsRequest, fetchBreedsSuccess, fetchBreedsFailure } =
  breedReducer.actions;

// Експортуємо ред'юсер
export default breedReducer.reducer;