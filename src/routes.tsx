import React from "react";

// Використовуємо React.lazy для динамічного імпорту компонентів сторінок
export const About = React.lazy(() => import("pages/About/About"));
export const ErrorPage = React.lazy(() => import("pages/ErrorPage/ErrorPage"));
export const BreedsPage = React.lazy(() => import("pages/DogBreeds/DogBreeds"));
export const DogPage = React.lazy(() => import("pages/DogPage/DogPage"));
