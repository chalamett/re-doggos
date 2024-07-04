import { getBreedImages } from "api"; // Імпортуємо функцію для отримання зображень породи з API
import { AppDispatch } from "store"; // Імпортуємо тип диспетчера з нашого Redux store
import {
  fetchImagesRequest,
  fetchImagesSuccess,
  fetchImagesFailure,
} from "store/reducers/imageSlice"; // Імпортуємо дії з slice для зображень

// Функція для отримання зображень конкретної породи собак
export const fetchImages = (breed: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchImagesRequest()); // Відправляємо дію для початку запиту

    let res = await getBreedImages(breed); // Отримуємо зображення породи з API

    dispatch(fetchImagesSuccess(res.message)); // Відправляємо дію про успішне завершення запиту
  } catch (e: any) {
    dispatch(fetchImagesFailure(e.message)); // Відправляємо дію про помилку під час запиту
  }
};