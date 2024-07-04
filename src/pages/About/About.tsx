import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";

import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import styles from "./About.module.scss";

// Компонент About для відображення інформації про проект
const About = () => {
  // Використання хука useTranslation для багатомовності
  const { t } = useTranslation();

  // Масив інструментів, використаних у проекті
  const usedTools: string[] = [
    "React",
    "Redux Toolkit",
    "Redux Persist",
    "TypeScript",
    "i18next",
    "Sass",
    "Font Awesome",
  ];

  // Масив API, використаних у проекті
  const usedAPIs: string[] = ["Dog API", "Wikipedia", "PetFinder"];

  // Інтерфейс для списків інструментів та API
  interface forLists {
    name: string;
    content: string[];
  }

  // Структура списків для відображення у компоненті
  const lists: forLists[] = [
    {
      name: "tools",
      content: usedTools,
    },
    {
      name: "apis",
      content: usedAPIs,
    },
  ];

  return (
    <div className={styles.about}>
      {/* Компонент для прокручування сторінки до верху */}
      <ScrollToTop />
      <div className={styles.aboutHeader}>
        {/* Заголовок сторінки з посиланням на профіль автора */}
        {t("aboutHeader")}&nbsp;
        <a
          href="https://github.com/chalamett"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.name}
        >
          Nataliia Stepanova
        </a>
      </div>

      <div className={styles.content}>
        {/* Посилання на GitHub репозиторій проекту */}
        <a
          href="https://github.com/chalamett/re-doggos/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          {t("viewGithub")}
          <FontAwesomeIcon icon={faChevronCircleRight} />
        </a>

        {/* Відображення списків використаних інструментів та API */}
        {lists.map((list) => (
          <div key={list.name} className={styles.column}>
            <div className={styles.subheader}>{t(list.name)}</div>
            <div className={styles.list}>
              {list.content.map((item) => (
                <li className={styles.listItem} key={item}>
                  <span className={styles.listLink}>{item}</span>
                </li>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Експортуємо компонент з використанням memo для оптимізації
export default memo(About);
