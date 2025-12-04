import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="dark:bg-white/10 border dark:border-white/10 hover:bg-black/10 border-black/10 rounded-lg p-1 sm:p-2 dark:hover:bg-white/80 transition cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="text-blue-500 size-6 sm:size-7" />
      ) : (
        <Sun className="text-orange-500 size-6 sm:size-7" />
      )}
    </button>
  );
};

export default ToggleTheme;
