import React from "react";
import { Bookmark } from "lucide-react";
import ToggleTheme from "../components/ToggleTheme";

const Nav = ({ onOpenBookmarks }) => {
  return (
    <nav className="flex justify-between items-center">
      <h2 className="text-purple-600 dark:text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-widest">
        DICTIONARY
      </h2>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={onOpenBookmarks}
          className="dark:bg-white/10 border dark:border-white/10 hover:bg-black/10 border-black/10 rounded-lg p-1 sm:p-2 dark:hover:bg-white/80 transition cursor-pointer"
        >
          <Bookmark className="size-6 sm:size-7 text-purple-600 dark:text-purple-400" />
        </button>

        <ToggleTheme />
      </div>
    </nav>
  );
};

export default Nav;
