// Інтерфейс для структури відповіді від API, який містить статус і список повідомлень
interface InfoCatalog {
  status: string,
  message: string[]
}

// Функція для отримання каталогу порід собак з API
export const getCatalog = (): Promise<InfoCatalog> =>
  fetch("https://dog.ceo/api/breeds/list") // Виконуємо запит до API для отримання списку порід
    .then((response) => response.json()) // Перетворюємо відповідь у формат JSON
    .then((data) => data) // Повертаємо отримані дані
    .catch((error) => error.message); // Обробляємо помилку та повертаємо повідомлення про помилку