// Оголошення модуля для файлів з розширенням .scss
declare module "*.scss";

// Оголошення модуля для файлів з розширенням .png
declare module "*.png" {
  const path: string;
  export default path;
}

// Оголошення модуля для бібліотеки react-anchor-link-smooth-scroll
declare module "react-anchor-link-smooth-scroll";