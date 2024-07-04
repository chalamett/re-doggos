// Імпортуємо користувацький хук useAppSelector з файлу redux
import { useAppSelector } from "hooks/redux";

// Описуємо типи пропсів для компонента Toggle
type Props = {
  id: string; // Ідентифікатор перемикача
  children: JSX.Element; // Дочірній елемент, що буде відображатися або приховуватися
};

// Компонент Toggle умовно відображає дочірні елементи на основі стану в Redux
export const Toggle = ({ id, children }: Props): JSX.Element => {
  // Отримуємо стан відображення для конкретного ідентифікатора перемикача з Redux
  const show = useAppSelector((state) => state.toggleReducer[id]);

  // Якщо show дорівнює true, відображаємо дочірні елементи, інакше повертаємо порожній фрагмент
  return show ? children : <></>;
};

export default Toggle;
