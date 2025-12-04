import { SearchIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Suggestions from "./Suggestions";

const Search = ({ onSearch, onClear }) => {
  const [word, setWord] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [blockSuggestions, setBlockSuggestions] = useState(false);

  const wrapperRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (blockSuggestions) {
      setBlockSuggestions(false);
      return;
    }

    if (word.length < 2) {
      setSuggestions([]);
      return;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      fetch(`https://api.datamuse.com/sug?s=${word}`)
        .then((res) => res.json())
        .then((data) =>
          setSuggestions(data.filter((item) => !item.word.includes(" ")))
        )
        .catch(() => setSuggestions([]));
    }, 300);
  }, [word]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleSelect(selectedWord) {
    setBlockSuggestions(true);
    setWord(selectedWord);
    setSuggestions([]);
    onSearch(selectedWord);
  }

  function handleSubmit() {
    if (!word.trim()) return onSearch("");
    setBlockSuggestions(true);
    setSuggestions([]);
    onSearch(word);
  }

  function handleClear() {
    setBlockSuggestions(false);
    setWord("");
    setSuggestions([]);
    onClear();
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full items-center">
        <div className="relative w-full sm:flex-1">
          <input
            className="w-full border border-gray-700 px-5 py-3 rounded-xl dark:placeholder:text-white 
                       placeholder:text-black dark:text-white focus:ring-2 focus:ring-purple-400 
                       outline-none pr-10"
            type="text"
            placeholder="Search a word..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          {word && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                         hover:text-black dark:hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto text-white bg-purple-600 hover:bg-purple-400 
                     transition px-8 py-3 rounded-2xl font-semibold cursor-pointer flex justify-center"
        >
          <SearchIcon />
        </button>
      </div>

      <Suggestions suggestions={suggestions} onSelect={handleSelect} />
    </div>
  );
};

export default Search;
