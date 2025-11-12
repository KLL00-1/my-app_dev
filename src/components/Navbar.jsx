// components/Navbar.jsx
"use client";

import styles from "../css_styles/navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/compat/router";
import { match } from "path-to-regexp";
import { useCallback, useEffect, useState } from "react";
import AnimatedLogo from "./Logo";

export default function Navbar() {
  const path = usePathname();
  const [currentPath, setCurrentPath] = useState(path);
  const styleObj = {
    color: "#6b21a8",
    textShadow: "0 0 22px #6b21a8",
    textDecoration: "underline",
    paddingBottom: "5px",
    fontWeight: 900,
    textShadow: "0 0 15px #6b21a8",
  };

  const [activeScroll, setActiveScroll] = useState(true); // нужно ставить эту настройку вручную прокидывая глобально, но нужен др стайт менеджер

  const router = useRouter();
  const navFunction = (e, index) => {
    // нужно чтобы скролл навигации происходиол только при условии первой вложенности
    if (currentPath.split("/").length < 3) {
      if (
        String(e.deltaY).split("")[0] == "1" &&
        index < menuItems.length - 1
      ) {
        router.push(menuItems[index + 1].href);
      } else if (String(e.deltaY).split("")[0] == "-" && index > 0) {
        router.push(menuItems[index - 1].href);
      }
    }
  };

  // Короче большой вопрос по этому скороллу

  const menuItems = [
    { label: "Главная", href: "/" },
    { label: "Что делаем?", href: "/what-we-do" },
    { label: "Как это работает", href: "/how-it-works" },
    { label: "Продукты", href: "/products" },
    { label: "Кейсы и результаты", href: "/cases" },
    { label: "ROI симулятор", href: "/calculator" },
    { label: "Контакты", href: "/contacts" },
  ];
  // useEffect(() => { пока что не знаю как это правильно использовать и нужно ли это вообще
  //   // навигация по страницам через колесо мыши
  //   let index;
  //   window.addEventListener("wheel", (e) => {
  //     for (let i = 0; i < menuItems.length; i++) {
  //       if (path === menuItems[i].href) {
  //         index = i;
  //       }
  //     }
  //     navFunction(e, index);
  //   });

  //   window.removeEventListener("wheel", (e) => {
  //     navFunction(e, index);
  //   });
  // }, [path]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span style={{ color: "#3abef9" }}>AI</span>Systems
        </div>
        {/* <AnimatedLogo /> */}
        {/* Desktop Menu */}
        <div className={styles.menuDesktop}>
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={!!match(item.href)(path) ? { ...styleObj } : {}}
              className={styles.menuItem}
            >
              {item.label}
            </Link>
          ))}
          {/* <Link href="/login" className={styles.loginButton}>
            Войти
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
