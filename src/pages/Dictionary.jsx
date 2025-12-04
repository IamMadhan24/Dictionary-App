import React, { useState } from "react";
import Search from "../components/Search";
import Nav from "../components/Nav";
import WordResult from "../components/WordResult";
import AlertMessage from "../components/AlertMessage";
import BookmarkList from "../components/BookmarkList";

const Dictionary = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || []
  );

  const [searchText, setSearchText] = useState("");

  async function searchWord(word) {
    if (!word.trim()) {
      setAlert("Please enter a word!");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!res.ok) throw new Error("Word not found");

      const json = await res.json();
      setData(json[0]);
    } catch (err) {
      setError(
        err.message === "Word not found" ? "Word not found!" : "Network error"
      );
    }

    setLoading(false);
  }

  function clearAll() {
    setData(null);
    setError("");
    setLoading(false);
  }

  function handleBookmark(wordObj) {
    let updated = [...bookmarks];
    const exists = updated.some((item) => item.word === wordObj.word);

    if (exists) {
      updated = updated.filter((item) => item.word !== wordObj.word);
      setAlert("Removed from bookmarks");
    } else {
      updated.push({ word: wordObj.word });
      setAlert("Added to bookmarks");
    }

    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }

  function loadFromBookmark(word) {
    setSearchText(word);
    searchWord(word);
    setShowBookmarks(false);
  }

  function deleteBookmark(word) {
    const updated = bookmarks.filter((b) => b.word !== word);
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  }

  return (
    <div className="dark:bg-[#0b0e11] bg-[#f6f7f9] min-h-screen flex flex-col justify-center items-center p-4">
      <AlertMessage message={alert} onClose={() => setAlert("")} />

      {showBookmarks && (
        <BookmarkList
          items={bookmarks}
          onClose={() => setShowBookmarks(false)}
          onSelect={loadFromBookmark}
          onDelete={deleteBookmark}
        />
      )}

      <div className="dark:bg-[#0f1720] bg-white p-6 md:p-10 rounded-3xl w-full max-w-[900px] flex flex-col gap-10">
        <Nav onOpenBookmarks={() => setShowBookmarks(true)} />

        <Search
          onSearch={searchWord}
          onClear={clearAll}
          value={searchText}
          setValue={setSearchText}
        />

        <div>
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {data && <WordResult data={data} onBookmark={handleBookmark} />}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;
