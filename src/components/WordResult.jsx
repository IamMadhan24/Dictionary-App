import React, { useEffect, useState } from "react";
import Audio from "../components/Audio";
import { Heart } from "lucide-react";

const WordResult = ({ data, onBookmark }) => {
  const phoneticText = data.phonetics?.find(p => p.text)?.text;
  const audioUrl = data.phonetics?.find(p => p.audio)?.audio;

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setSaved(stored.some(item => item.word === data.word));
  }, [data.word]);

  function toggleBookmark() {
    onBookmark(data);
    setSaved(!saved);
  }

  const allSynonyms = [...new Set(data.meanings.flatMap(m => m.synonyms || []))].slice(0, 10);
  const allAntonyms = [...new Set(data.meanings.flatMap(m => m.antonyms || []))].slice(0, 10);

  return (
    <div className="mt-5 space-y-8">

      {/* Word + Audio + Heart */}
      <div className="flex justify-between items-start">
        <div className="border-l-8 sm:border-l-10 border-purple-600 pl-5">
          <h1 className="dark:text-white font-bold text-3xl sm:text-4xl capitalize">
            {data.word}
          </h1>

          {phoneticText && (
            <p className="text-[#9C7CF5] text-sm sm:text-lg mt-1">
              {phoneticText}
            </p>
          )}
        </div>

        <div className="flex gap-3 items-center">
          {audioUrl && <Audio audioUrl={audioUrl} />}

          {/* Bookmark Button */}
          <button onClick={toggleBookmark}>
            <Heart
              className={`size-8 sm:size-12 cursor-pointer hover:fill-red-500 transition
              ${saved ? "text-red-500 fill-red-500" : "text-red-500"}`}
            />
          </button>
        </div>
      </div>

      {/* Synonyms */}
      {allSynonyms.length > 0 && (
        <div>
          <p className="font-semibold dark:text-white mb-4 text-lg sm:text-xl">Synonyms:</p>
          <div className="flex flex-wrap gap-2">
            {allSynonyms.map((syn, i) => (
              <span key={i} className="px-3 py-1 bg-purple-200 dark:bg-purple-700 text-purple-900 dark:text-white rounded-full text-sm">
                {syn}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Antonyms */}
      {allAntonyms.length > 0 && (
        <div>
          <p className="font-semibold dark:text-white mb-4 text-lg sm:text-xl">Antonyms:</p>
          <div className="flex flex-wrap gap-2">
            {allAntonyms.map((ant, i) => (
              <span key={i} className="px-3 py-1 bg-red-200 dark:bg-red-700 text-red-900 dark:text-white rounded-full text-sm">
                {ant}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Meanings */}
      {data.meanings.map((meaning, i) => (
        <div key={i} className="space-y-2">
          <p className="dark:text-white font-semibold text-lg sm:text-xl capitalize">
            {meaning.partOfSpeech}
          </p>

          <ul className="dark:text-white list-decimal pl-6 space-y-6">
            {meaning.definitions.map((def, j) => (
              <li key={j}>
                <p className="dark:text-gray-300 text-gray-600">
                  <span className="font-bold">Definition: </span>{def.definition}
                </p>
                {def.example && (
                  <p className="italic dark:text-gray-300 text-gray-600">
                    <span className="font-bold">Example: </span>“{def.example}”
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Source */}
      {data.sourceUrls?.length > 0 && (
        <p className="dark:text-white font-semibold text-lg">
          Source:{" "}
          <a href={data.sourceUrls[0]} className="text-purple-500 underline break-all" target="_blank">
            {data.sourceUrls[0]}
          </a>
        </p>
      )}
    </div>
  );
};

export default WordResult;
