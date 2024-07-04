// Інтерфейс IBreed описує структуру об'єкта породи собак
export interface IBreed {
  name: string; // Назва породи
  id: string; // Унікальний ідентифікатор породи
  cardDesc: string; // Опис породи для картки
  cardImg: string; // Зображення породи для картки
  headImg: string; // Головне зображення породи
  subDesc: string; // Короткий опис породи
  desc: string; // Детальний опис породи
  history: string; // Історія породи
  temperament: string; // Темперамент породи
  health: string[]; // Список здоров'я породи
  size: number; // Розмір породи
  energyLvl: number; // Рівень енергії породи
  exReqs: number; // Вимоги до фізичних вправ
  playfulness: number; // Грайливість породи
  affLvl: number; // Рівень прихильності породи
  frToDogs: number; // Дружелюбність до інших собак
  frToPets: number; // Дружелюбність до інших тварин
  frToStr: number; // Дружелюбність до незнайомців
  watchfulness: number; // Пильність породи
  easeTr: number; // Легкість навчання
  groomReqs: number; // Вимоги до догляду
  heatSens: number; // Чутливість до тепла
  vocality: number; // Гучність породи
}