// Функція для отримання зображень породи собак за її назвою
export const getBreedImages = (breed: string) =>
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/20`) // Виконуємо запит до API для отримання 20 випадкових зображень породи
    .then((response) => response.json()) // Перетворюємо відповідь у формат JSON
    .then((data) => data) // Повертаємо отримані дані
    .catch((error) => error); // Обробляємо помилку