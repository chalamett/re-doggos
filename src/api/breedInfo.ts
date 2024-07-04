// Імпортуємо дані про породи з локального файлу
import breedInfoData from "../utils/breedInfoData";
import { IBreed } from "../models/IBreed";

// Інтерфейс для структури відповіді, яка містить статус і список порід
interface InfoResolve {
  status: string,
  message: IBreed[]
}

// Функція для отримання списку порід собак з локальних даних (імітація запиту до сервера)
export const getBreedInfoList = (): Promise<InfoResolve> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'success', // Встановлюємо статус відповіді
        message: breedInfoData // Повертаємо локальні дані про породи
      });
    }, 500); // Імітуємо затримку у 500 мс
  });
};
