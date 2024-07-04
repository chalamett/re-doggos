// Імпортуємо необхідні бібліотеки та компоненти
import { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

import ErrorPage from "../ErrorPage";
import DogStats from "pages/page-template/DogStats";
import Loader from "components/Loader/Loader";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { getBreedById, getBreedPhotos } from "store/selectors";
import { updateCurrentBreed } from "store/reducers/filterSlice";
import { fetchImages } from "store/action-creators";
import { IBreed } from "models/IBreed";
import styles from "./DogPage.module.scss";

const DogPage = () => {
  // Ініціалізуємо переклад з i18next
  const { t } = useTranslation();
  // Отримуємо dispatch функцію з Redux
  const dispatch = useAppDispatch();

  // Отримуємо стан завантаження даних про породи
  let loading = useAppSelector((state) => state.breedReducer.isLoading);

  // Отримуємо параметри з URL
  let params = useParams();
  let id: string | undefined = params!.name;

  // Отримуємо зображення та інформацію про породу з Redux
  let images: string[] | undefined = useAppSelector(getBreedPhotos);
  let info: IBreed | undefined = useAppSelector(getBreedById);

  // Оновлюємо поточну породу при зміні id
  useEffect(() => {
    if (id) {
      dispatch(updateCurrentBreed(id));
    }
  });

  // Завантажуємо зображення породи при наявності інформації про породу
  useEffect(() => {
    if (info) {
      dispatch(fetchImages(info.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, info]);

  // Відображаємо сторінку помилки, якщо інформація про породу не знайдена
  if (!loading && !info) {
    return (
      <ErrorPage
        path="/dogbreeds"
        title="breedNotFound"
        message="errorPageBreedPage"
        button="browseButton"
      />
    );
  }

  // Визначаємо теми та статистичні показники для відображення
  const topics: string[] = [
    "history",
    "temperament",
    "upkeep",
    "health",
    "gallery",
  ];

  const stats: string[] = [
    "energyLvl",
    "exReqs",
    "playfulness",
    "affLvl",
    "frToDogs",
    "frToPets",
    "frToStr",
    "watchfulness",
    "easeTr",
    "groomReqs",
    "heatSens",
    "vocality",
  ];

  return !loading && info && images ? (
    <div className={styles.dogPage}>
      <ScrollToTop />

      {/* Відображаємо заголовок та зображення породи */}
      <div className={styles.subheaderLeft}>
        <div
          className={styles.headImg}
          style={{ backgroundImage: `url(${info.headImg})` }}
        ></div>
        <div className={styles.subDesc}>{info.subDesc}</div>
      </div>

      <div className={styles.subheaderRight}>
        <div className={styles.name}>{info.name}</div>
        <div className={styles.desc}>{info.desc}</div>
      </div>

      {/* Відображаємо загальну статистику породи */}
      <div className={styles.section}>
        <div className={styles.sectionName}>{t("genStats")}</div>
        <div className={styles.statsWrapper}>
          {stats.map((val) => (
            <DogStats
              n={info![val as keyof typeof info]}
              stat={val}
              key={val}
            />
          ))}
        </div>
      </div>

      {/* Відображаємо зміст та посилання на розділи */}
      <div className={styles.tableOfContents}>
        <div className={styles.lineOne}></div>
        <div className={styles.newLine}></div>

        {topics.map((topic, index) => (
          <span key={`${topic}Anchor`}>
            <AnchorLink
              className={styles.anchor}
              href={`#${topic}`}
              offset={window.innerWidth > 1024 ? "10" : "50"}
            >
              {t(topic)}
            </AnchorLink>
            {index === 4 ? null : <span className={styles.dot}>·</span>}
          </span>
        ))}
        <div className={styles.newLine}></div>
        <div className={styles.lineTwo}></div>
      </div>

      {/* Відображаємо інформацію про породу з розділами */}
      {topics.slice(0, 3).map((topic: string) => {
        let field: string = info![topic as keyof typeof info];
        return (
          <div key={topic}>
            <div className={styles.sectionName} id={topic}>
              {t(topic)}
            </div>
            {field.split("\n").map((x: string, index: number) => (
              <div className={styles.sectionContent} key={index}>
                {x}
              </div>
            ))}
          </div>
        );
      })}

      {/* Відображаємо розділ здоров'я породи */}
      <div className={styles.section}>
        <div className={styles.sectionName} id="health">
          {t("health")}
        </div>
        {info.health.map((item: string) => (
          <div key={item.slice(0, 3)} className={styles.sectionContent}>
            {item}
          </div>
        ))}
      </div>

      {/* Відображаємо галерею зображень породи */}
      <div className={styles.section}>
        <div className={styles.sectionName} id="gallery">
          {t("gallery")}
        </div>

        <div className={styles.gallery}>
          {images ? (
            images.map((image) => (
              <img
                className={styles.galleryImg}
                src={image}
                alt="dogpicture"
                key={image}
              />
            ))
          ) : (
            <div>Couldn't load photos</div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.loader}>
      <Loader />
    </div>
  );
};

export default memo(DogPage);
