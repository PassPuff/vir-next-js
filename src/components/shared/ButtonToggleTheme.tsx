"use client";

import React, { useEffect, useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export default function ButtonToggleTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Проверка сохраненного состояния темы в localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDark(true);
    }
  }, []);

  const darkModeHandler = () => {
    const newDarkMode = !dark;
    setDark(newDarkMode);
    document.body.classList.toggle("dark", newDarkMode);

    // Сохранение состояния в localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <div className="ml-auto">
      <button onClick={darkModeHandler}>
        {dark ? (
          <IoSunny className="w-6 h-6" />
        ) : (
          <IoMoon className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
