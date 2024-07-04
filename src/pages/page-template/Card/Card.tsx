// Імпортуємо необхідні бібліотеки та стилі
import { Link } from "react-router-dom";
import { memo } from "react";
import styles from "./Card.module.scss";

// Визначаємо типи пропсів для компонента Card
type Props = {
  cardDesc: string; // Опис породи собак
  id: string; // Унікальний ідентифікатор породи
  name: string; // Назва породи
  cardImg: string; // URL зображення породи
};

// Оголошуємо компонент Card, який відображає картку з інформацією про породу собак
const Card = ({ cardDesc, id, name, cardImg }: Props) => {
  return (
    <>
      {/* Створюємо посилання на сторінку з детальною інформацією про породу */}
      <Link to={`/dogbreeds/${id}`} className={styles.card} key={id}>
        {/* Відображаємо зображення породи */}
        <img src={cardImg} alt="cover" className={styles.cardImage} />
        <div className={styles.cardBody}>
          {/* Відображаємо назву породи */}
          <div className={styles.cardName}>{name}</div>
          {/* Відображаємо опис породи */}
          <div className={styles.cardDesc}>{cardDesc}</div>
        </div>
      </Link>
    </>
  );
};

// Експортуємо компонент, використовуючи memo для оптимізації
export default memo(Card);