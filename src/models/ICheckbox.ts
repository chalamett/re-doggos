// Інтерфейс ICheckbox описує структуру значень чекбоксів для фільтрів
export interface ICheckbox {
  size: {
    small: boolean; // Маленький розмір
    medium: boolean; // Середній розмір
    large: boolean; // Великий розмір
  };
  energyLvl: {
    low: boolean; // Низький рівень енергії
    moderate: boolean; // Помірний рівень енергії
    high: boolean; // Високий рівень енергії
  };
  easeTr: {
    easy: boolean; // Легкий рівень навчання
    average: boolean; // Середній рівень навчання
    difficult: boolean; // Важкий рівень навчання
  };
  groomReqs: {
    minimum: boolean; // Мінімальні вимоги до догляду
    reasonable: boolean; // Помірні вимоги до догляду
    demanding: boolean; // Високі вимоги до догляду
  };
}