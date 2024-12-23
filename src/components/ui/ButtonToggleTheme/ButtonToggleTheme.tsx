"use client";
import React from "react";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export default function ButtonToggleTheme() {
  const [dark, setDark] = React.useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <div className="bg-yellow-">
      <button onClick={() => darkModeHandler()}>
        {dark && <IoSunny className="w-6 h-6" />}
        {!dark && <IoMoon className="w-6 h-6" />}
      </button>
    </div>
  );
}
