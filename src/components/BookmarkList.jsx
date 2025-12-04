import React, { useEffect } from "react";
import { X, Trash2 } from "lucide-react";

const BookmarkList = ({ items, onClose, onSelect, onDelete }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 px-4">
      <div
        className="
        bg-white dark:bg-[#1a1a1a] 
        w-full max-w-[450px] 
        p-6 rounded-xl shadow-xl relative
      "
      >
        <button className="absolute right-4 top-4" onClick={onClose}>
          <X className="text-gray-500 hover:text-black dark:hover:text-white cursor-pointer" />
        </button>

        <h2 className="text-xl font-bold dark:text-white mb-4">Saved Words</h2>

        {items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-center">
            No bookmarks found.
          </p>
        ) : (
          <ul
            className="
              space-y-3 
              max-h-[500px] overflow-y-auto 
              pr-2"
          >
            {items.map((w, i) => (
              <li
                key={i}
                className="
                  p-3 bg-gray-200 dark:bg-gray-700 
                  rounded-lg text-lg capitalize 
                  flex justify-between items-center
                "
              >
                <span
                  className="cursor-pointer hover:text-purple-600 dark:hover:text-purple-400"
                  onClick={() => onSelect(w.word)}
                >
                  {w.word}
                </span>

                <button onClick={() => onDelete(w.word)}>
                  <Trash2
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    size={20}
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookmarkList;
