// Імпортуємо необхідні модулі з бібліотеки @reduxjs/toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Оголошуємо інтерфейс для стану перемикачів
interface ToggleState {
  [key: string]: boolean; // Динамічні ключі перемикачів
}

// Встановлюємо початковий стан
const initialState: ToggleState = {};

// Створюємо slice для управління станом перемикачів
export const toggleReducer = createSlice({
  name: "toggle", // Ім'я slice
  initialState, // Початковий стан
  reducers: {
    // Обробник дії перемикання стану за ключем
    switchToggle: (state, action: PayloadAction<string>) => {
      state[action.payload] = !state[action.payload];
    },
  },
});

// Експортуємо дію для перемикання
export const { switchToggle } = toggleReducer.actions;

// Експортуємо ред'юсер
export default toggleReducer.reducer;