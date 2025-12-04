import React from "react";

const Suggestions = ({ suggestions, onSelect }) => {
  if (!suggestions.length) return null;

  return (
    <div
      className="
        absolute 
        w-full 
        bg-white dark:bg-[#1a1a1a] dark:text-white 
        border border-gray-300 dark:border-gray-600 
        rounded-xl shadow-md 
        max-h-50 overflow-y-auto

        /* MOBILE: show ABOVE input */
        bottom-full mb-2

        /* DESKTOP: show BELOW input */
        sm:bottom-auto sm:mt-2
      "
    >
      {suggestions.map((item, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item.word);
          }}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"
        >
          {item.word}
        </button>
      ))}
    </div>
  );
};

export default Suggestions;
