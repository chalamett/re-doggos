import { getCatalog, getBreedInfoList } from "api"; // Імпортуємо функції для отримання даних про породи з API
import { AppDispatch } from "store"; // Імпортуємо тип диспетчера з нашого Redux store
import { IBreed } from "models/IBreed"; // Імпортуємо інтерфейс IBreed
import {
  fetchBreedsRequest,
  fetchBreedsSuccess,
  fetchBreedsFailure,
} from "store/reducers/breedSlice"; // Імпортуємо дії з slice для порід

// Функція для отримання даних про породи собак
export const fetchBreeds = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchBreedsRequest()); // Відправляємо дію для початку запиту
    interface BreedInfo {
      status: string;
      message: IBreed[];
      error?: Error;
    }

    interface CatalogInfo {
      status: string;
      message: string[];
    }

    let info: BreedInfo = await getBreedInfoList(); // Отримуємо список порід з API
    let catalog: CatalogInfo = await getCatalog(); // Отримуємо каталог порід з API

    const breedsInfoExt: IBreed[] = info.message;
    const finalInfo: IBreed[] = [];

    // Фільтруємо породи, які присутні в каталозі
    breedsInfoExt.forEach((name) => {
      if (catalog.message.includes(name.id)) {
        finalInfo.push(name);
      }
    });

    dispatch(fetchBreedsSuccess(finalInfo)); // Відправляємо дію про успішне завершення запиту
  } catch (e: any) {
    dispatch(fetchBreedsFailure(e.message)); // Відправляємо дію про помилку під час запиту
  }
};