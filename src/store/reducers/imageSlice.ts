// Імпортуємо необхідні модулі з бібліотеки @reduxjs/toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Оголошуємо інтерфейс для стану зображень
interface ImageState {
  images: [string] | []; // Масив зображень
  isLoading: boolean; // Статус завантаження
  error: string | null; // Помилки завантаження
}

// Встановлюємо початковий стан
const initialState: ImageState = {
  images: [], // Порожній масив зображень
  isLoading: false, // Початково завантаження вимкнено
  error: null, // Помилки відсутні
};

// Створюємо slice для управління станом зображень
export const imageReducer = createSlice({
  name: "image", // Ім'я slice
  initialState, // Початковий стан
  reducers: {
    // Обробник дії початку запиту зображень
    fetchImagesRequest: (state) => {
      state.images = []; // Очищуємо масив зображень
      state.isLoading = true; // Встановлюємо статус завантаження
      state.error = null; // Очищуємо помилки
    },
    // Обробник дії успішного отримання зображень
    fetchImagesSuccess: (state, action: PayloadAction<[string]>) => {
      state.images = action.payload; // Зберігаємо отримані зображення
      state.isLoading = false; // Вимикаємо статус завантаження
    },
    // Обробник дії невдалого запиту зображень
    fetchImagesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false; // Вимикаємо статус завантаження
      state.error = action.payload; // Зберігаємо повідомлення про помилку
    },
  },
});

// Експортуємо дії для запиту зображень
export const { fetchImagesRequest, fetchImagesSuccess, fetchImagesFailure } =
  imageReducer.actions;

// Експортуємо ред'юсер
export default imageReducer.reducer;