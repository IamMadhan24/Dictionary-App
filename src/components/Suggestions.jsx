import React from "react";

const Suggestions = ({ suggestions, onSelect }) => {
  if (!suggestions.length) return null;

  return (
    <div className="mt-2 bg-white dark:bg-[#1a1a1a] dark:text-white border border-gray-300 dark:border-gray-600 rounded-xl shadow-md max-h-48 overflow-y-auto">
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
