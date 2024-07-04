// Імпортуємо необхідні функції та бібліотеки з Redux Toolkit та redux-persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Імпортуємо ред'юсери для порід собак, фільтрів, зображень та перемикачів
import breedReducer from "./reducers/breedSlice";
import filterReducer from "./reducers/filterSlice";
import imageReducer from "./reducers/imageSlice";
import toggleReducer from "./reducers/toggleSlice";

// Налаштовуємо конфігурацію для збереження стану фільтрів у локальному сховищі браузера
const persistConfig = {
  key: "root",
  storage,
};

// Створюємо збережений ред'юсер для фільтрів з використанням конфігурації
const filtersReducer = persistReducer(persistConfig, filterReducer);

// Комбінуємо всі ред'юсери в один кореневий ред'юсер
const rootReducer = combineReducers({
  breedReducer,
  filtersReducer,
  imageReducer,
  toggleReducer,
});

// Функція для налаштування та створення Redux store
const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Експортуємо створений store
export const store = setupStore();

// Експортуємо persistor для керування збереженим станом
export const persistor = persistStore(store);

// Визначаємо та експортуємо типи RootState, AppStore та AppDispatch для типізації у проекті
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];