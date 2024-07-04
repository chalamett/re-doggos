// Імпортуємо зображення для повідомлення про помилку
import Picture from "assets/images/error-message.png";

// Компонент ErrorIndicator відображає зображення помилки
const ErrorIndicator = () => {
  return <img src={Picture} alt="error-message"></img>;
};

export default ErrorIndicator;
