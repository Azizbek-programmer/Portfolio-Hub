import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "uz" | "ru" | "en";

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
  };
}

export const translations: Translations = {
  portfolio: {
    uz: "Portfolio.",
    ru: "Портфолио.",
    en: "Portfolio.",
  },
  greeting: {
    uz: "👋 Salom, men Fullstack Dasturchiman",
    ru: "👋 Привет, я Fullstack Разработчик",
    en: "👋 Hi, I am a Fullstack Developer"
  },
  heroTitle1: {
    uz: "G'oyalarni ",
    ru: "Превращаю ",
    en: "Turning ideas "
  },
  heroTitleHighlight: {
    uz: "Kodga",
    ru: "Идеи в Код",
    en: "Into Code"
  },
  heroTitle2: {
    uz: " \nAylantiraman",
    ru: "",
    en: ""
  },
  heroDesc: {
    uz: "Zamonaviy veb-saytlar va ilovalar yaratish bo'yicha mutaxassis. Mijozlar uchun sifatli va tezkor yechimlar taklif qilaman.",
    ru: "Специалист по созданию современных веб-сайтов и приложений. Предлагаю качественные и быстрые решения для клиентов.",
    en: "Expert in building modern websites and applications. Providing high-quality and fast solutions for clients."
  },
  contactBtn: {
    uz: "Bog'lanish",
    ru: "Связаться",
    en: "Contact"
  },
  myWorksBtn: {
    uz: "Mening ishlarim",
    ru: "Мои работы",
    en: "My works"
  },
  aboutTitle: {
    uz: "Men Haqimda",
    ru: "Обо мне",
    en: "About Me"
  },
  aboutSubtitle: {
    uz: "Qisqacha o'zim va faoliyatim haqida ma'lumot",
    ru: "Краткая информация обо мне и моей деятельности",
    en: "Brief info about me and my activities"
  },
  aboutDesc1: {
    uz: "Men O'zbekistonda yashaydigan ishtiyoqli Fullstack Dasturchiman. Dasturlash olamiga kirib kelganimdan beri, men har doim yangi texnologiyalarni o'rganishga va murakkab muammolarga optimal yechimlar topishga intilaman.",
    ru: "Я амбициозный Fullstack Разработчик, живущий в Узбекистане. С тех пор, как я вошел в мир программирования, я всегда стремился изучать новые технологии и находить оптимальные решения сложных проблем.",
    en: "I am a passionate Fullstack Developer based in Uzbekistan. Since entering the world of programming, I have always strived to learn new technologies and find optimal solutions to complex problems."
  },
  aboutDesc2: {
    uz: "Mening asosiy maqsadim - foydalanuvchilar uchun qulay, tezkor va chiroyli raqamli mahsulotlar yaratishdir. Har bir loyihaga individual yondashaman va maksimal darajada sifatli natija ko'rsatishga harakat qilaman.",
    ru: "Моя главная цель - создавать удобные, быстрые и красивые цифровые продукты для пользователей. К каждому проекту подхожу индивидуально и стараюсь показать максимально качественный результат.",
    en: "My main goal is to create user-friendly, fast, and beautiful digital products. I approach each project individually and try to deliver the highest quality possible."
  },
  experienceText: {
    uz: "Yillik tajriba",
    ru: "Года опыта",
    en: "Years of experience"
  },
  projectsText: {
    uz: "Loyihalar",
    ru: "Проекты",
    en: "Projects"
  },
  skillsTitle: {
    uz: "Texnik Ko'nikmalar",
    ru: "Технические навыки",
    en: "Technical Skills"
  },
  skillsSubtitle: {
    uz: "Men foydalanadigan asosiy texnologiyalar va vositalar",
    ru: "Основные технологии и инструменты, которые я использую",
    en: "Main technologies and tools I use"
  },
  contactTitle: {
    uz: "Bog'lanish",
    ru: "Связаться",
    en: "Contact"
  },
  contactSubtitle: {
    uz: "Hamkorlik qilish yoki savollaringiz bo'lsa xabar qoldiring",
    ru: "Если у вас есть вопросы или вы хотите сотрудничать, оставьте сообщение",
    en: "Leave a message if you want to collaborate or have questions"
  },
  contactInfoTitle: {
    uz: "Aloqa ma'lumotlari",
    ru: "Контактная информация",
    en: "Contact Info"
  },
  footerText: {
    uz: "Fullstack Developer Portfolio. Barcha huquqlar himoyalangan.",
    ru: "Портфолио Fullstack Разработчика. Все права защищены.",
    en: "Fullstack Developer Portfolio. All rights reserved."
  }
};

interface I18nContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("uz");

  const t = (key: keyof typeof translations): string => {
    return translations[key]?.[lang] || (key as string);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
