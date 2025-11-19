// components/Navbar.jsx
"use client";

import styles from "../css_styles/navbar.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/compat/router";
import { match } from "path-to-regexp";
import { useEffect, useMemo, useState } from "react";
import AnimatedLogo from "./Logo";

export default function Navbar() {
  const path = usePathname();
  const styleObj = {
    color: "#6b21a8",
    textShadow: "0 0 22px #6b21a8",
    textDecoration: "underline",
    paddingBottom: "5px",
    fontWeight: 900,
    textShadow: "0 0 15px #6b21a8",
  };

  const [width, setWidth] = useState(0);
  useEffect(() => setWidth(window.innerWidth), []);

  // Короче большой вопрос по этому скороллу

  const menuItems = [
    { label: "Главная", href: "/", counter: 6 },
    { label: "Что делаем?", href: "/what-we-do", counter: 5 },
    { label: "Как это работает", href: "/how-it-works", counter: 4 },
    { label: "Продукты", href: "/products", counter: 3 },
    { label: "Кейсы и результаты", href: "/cases", counter: 2 },
    { label: "ROI симулятор", href: "/calculator", counter: 1 },
    { label: "Контакты", href: "/contacts", counter: 0 },
  ];

  // константа для мобильной версии
  const menuItemsMobile = useMemo(
    () =>
      menuItems
        .map((el) => {
          return { ...el, active: false };
        })
        .reverse(),
    []
  );
  const checkLastRoute = (el) => {
    if (lastRouts.includes(el)) return true;
    else return false;
  };

  // для мобильного меню
  const [lastRouts, setLastRouts] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    let counter;
    switch (path) {
      case "/about":
        counter = 0;
        break;
      case "/products/automation":
        counter = 3;
        break;
      case "/products/ai-hub":
        counter = 3;
        break;
      case "/cases/1":
        counter = 2;
        break;
      case "/cases/2":
        counter = 2;
        break;
      case "/cases/3":
        counter = 2;
        break;
      default:
        break;
    }
    if (counter === undefined)
      counter = menuItemsMobile.filter((el) => el.href === path)[0].counter;
    setCurrentPageIndex(counter);
    setLastRouts(
      menuItemsMobile
        .map((el, index) => {
          if (index >= counter) {
            if (el.counter == counter) el.active = true;
            return el;
          }
        })
        .filter((el) => el)
        .reverse()
    );
  }, [path]);

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
        </div>
        <div className={styles.mobileMenu}>
          {menuItemsMobile.map((item, index) => {
            // console.log(item.counter, currentPageIndex);
            if (item.counter == currentPageIndex) item.active = true;
            else item.active = false;
            return (
              <Link
                onClick={() => {
                  if (item.counter != currentPageIndex) {
                    if (!checkLastRoute(item)) {
                      setLastRouts((prev) => [...prev, item]);
                    } else if (checkLastRoute(item)) {
                      setLastRouts((prev) =>
                        prev.filter((el) => {
                          if (item.counter == 1) {
                            return el;
                          }
                          if (item.counter - 1 != el.counter) {
                            return el;
                          }
                        })
                      );
                      if (!currentPageIndex) {
                        setLastRouts((prev) =>
                          prev.filter((el) => el.href !== "/contacts")
                        );
                      }
                    }
                    setCurrentPageIndex(item.counter);
                  }
                }}
                key={item.label}
                href={item.href}
                style={{
                  right: checkLastRoute(item) ? "75px" : "",
                  // transform:
                  //   item.active && checkLastRoute(item)
                  //     ? "translate(80px, 49px) scale(1.2)"
                  //     : item.active
                  //     ? "translate(-80px, 49px)"
                  //     : "",
                  zIndex: checkLastRoute(item) ? -(index + 1) : "",
                  // right: width <= 500 && checkLastRoute(item) ? "135px" : "",
                  // right: width <= 440 && checkLastRoute(item) ? "75px" : "",
                  transform:
                    item.active && checkLastRoute(item)
                      ? "translate(75px, 35px) scale(1.2)"
                      : item.active
                      ? "translate(-75px, 35px)"
                      : "",
                  zIndex: checkLastRoute(item) ? -(index + 1) : "",
                  background: item.active ? "#3abef9" : "",
                }}
                className={styles.mobileMenuItem}
              >
                {item.label}
                {checkLastRoute(item) && !item.active && (
                  <span className={styles.back_page}>←</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
