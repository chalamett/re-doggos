// Імпортуємо необхідні модулі з бібліотек
import { Suspense } from "react"; // Suspense використовується для відображення запасного контенту під час завантаження асинхронних компонентів
import ReactDOM from "react-dom/client"; // ReactDOM для рендерингу React компонентів у DOM
import { Provider } from "react-redux"; // Provider надає доступ до Redux store для всіх компонентів додатку
import { PersistGate } from "redux-persist/integration/react"; // PersistGate забезпечує збереження стану додатку між сеансами

// Імпортуємо основний компонент додатку
import App from "App";

// Імпортуємо store та persistor з конфігурації Redux store
import { store, persistor } from "store";
// Імпортуємо налаштування для багатомовності
import "utils/i18n";

// Створюємо структуру додатку з використанням Redux Provider, Suspense та PersistGate
const application = (
  <Provider store={store}>
    <Suspense fallback={<div>loading</div>}>
      {/* Відображаємо "loading" під час завантаження компонентів */}
      <PersistGate loading={null} persistor={persistor}>
        {/* PersistGate забезпечує збереження стану додатку */}
        <App /> {/* Рендеримо основний компонент додатку */}
      </PersistGate>
    </Suspense>
  </Provider>
);

// Знаходимо елемент у DOM, в який буде вбудовано додаток
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Рендеримо структуру додатку у вибраний елемент
root.render(application);
