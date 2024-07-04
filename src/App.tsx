import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { About, BreedsPage, DogPage, ErrorPage } from "routes";

import Home from "pages/Home/Home";
import Header from "./pages/page-template/Header";
import { useAppDispatch } from "hooks/redux";
import { fetchBreeds } from "store/action-creators/breeds";

function App() {
  const dispatch = useAppDispatch();

  // Використовуємо useEffect для завантаження списку порід собак при першому рендерингу компонента
  useEffect(() => {
    dispatch(fetchBreeds());
  }, [dispatch]);

  return (
    // Використовуємо BrowserRouter для налаштування маршрутизації в додатку
    <BrowserRouter>
      {/* Компонент Header відображає заголовок і навігацію */}
      <Header />
      <Routes>
        {/* Маршрут для головної сторінки */}
        <Route path="/" element={<Home />} />
        {/* Маршрут для сторінки "Про нас" */}
        <Route path="about" element={<About />} />
        {/* Маршрут для сторінки зі списком порід собак */}
        <Route path="dogbreeds" element={<BreedsPage />} />
        {/* Маршрут для сторінки з детальною інформацією про конкретну породу собак */}
        <Route path="dogbreeds/:name" element={<DogPage />} />
        {/* Маршрут для сторінки помилки 404 */}
        <Route
          path="*"
          element={
            <ErrorPage
              path="/"
              title="404"
              message="errorPageApp"
              button="goHome"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
