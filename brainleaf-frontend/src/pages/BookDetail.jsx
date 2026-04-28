import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ReadBook = () => {
  const { id } = useParams();
  const containerRef = useRef(null);

  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [darkMode, setDarkMode] = useState(false);
  const [inputPage, setInputPage] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  // 🔥 FETCH BOOK
  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(apiUrl(`/api/books/${id}`));
      setFile(fileUrl(res.data.file));
    };
    fetchBook();
  }, [id]);

  // 🔥 LOAD BOOKMARKS
  useEffect(() => {
    const saved = localStorage.getItem(`book-${id}-bookmarks`);
    if (saved) {
      setBookmarks(JSON.parse(saved));
    }
  }, [id]);

  // 🔥 AUTO SAVE PAGE
  useEffect(() => {
    if (id && pageNumber) {
      localStorage.setItem(`book-${id}-page`, pageNumber);
    }
  }, [pageNumber, id]);

  // 🔥 ON LOAD PDF
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);

    const savedPage = localStorage.getItem(`book-${id}-page`);
    if (savedPage) {
      setPageNumber(Number(savedPage));
    } else {
      setPageNumber(1);
    }
  };

  // 🔥 NAVIGATION
  const goPrev = () => pageNumber > 1 && setPageNumber(pageNumber - 1);
  const goNext = () =>
    pageNumber < numPages && setPageNumber(pageNumber + 1);

  // 🔥 ZOOM
  const zoomIn = () => setScale(scale + 0.2);
  const zoomOut = () => scale > 0.6 && setScale(scale - 0.2);

  // 🔥 JUMP
  const handleJump = () => {
    const page = Number(inputPage);
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
      setInputPage("");
    }
  };

  // 🔥 FULLSCREEN
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // 🔥 BOOKMARK ADD
  const addBookmark = () => {
    if (!bookmarks.includes(pageNumber)) {
      const updated = [...bookmarks, pageNumber];
      setBookmarks(updated);
      localStorage.setItem(
        `book-${id}-bookmarks`,
        JSON.stringify(updated)
      );
    }
  };

  // 🔥 GO TO BOOKMARK
  const goToBookmark = (page) => {
    setPageNumber(page);
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col items-center py-6 ${
        darkMode ? "bg-black text-white" : "bg-gray-100"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">📖 Reading Mode</h1>

      {/* 🔥 CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">

        <button onClick={goPrev} className="px-3 py-1 bg-gray-200 rounded">
          ⬅
        </button>

        <span>
          {pageNumber} / {numPages || "..."}
        </span>

        <button onClick={goNext} className="px-3 py-1 bg-gray-200 rounded">
          ➡
        </button>

        {/* ZOOM */}
        <button onClick={zoomOut} className="px-3 py-1 bg-gray-200 rounded">
          ➖
        </button>

        <button onClick={zoomIn} className="px-3 py-1 bg-gray-200 rounded">
          ➕
        </button>

        {/* JUMP */}
        <input
          type="number"
          placeholder="Page"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          className="w-16 px-2 py-1 border rounded"
        />

        <button
          onClick={handleJump}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Go
        </button>

        {/* BOOKMARK */}
        <button
          onClick={addBookmark}
          className="px-3 py-1 bg-yellow-400 rounded"
        >
          🔖 Save
        </button>

        {/* DARK MODE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* FULLSCREEN */}
        <button
          onClick={toggleFullscreen}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          ⛶ Full
        </button>
      </div>

      {/* 🔥 BOOKMARK LIST */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {bookmarks.map((b, i) => (
          <button
            key={i}
            onClick={() => goToBookmark(b)}
            className="px-2 py-1 bg-gray-300 rounded"
          >
            {b}
          </button>
        ))}
      </div>

      {/* 🔥 PDF */}
      {file && (
        <Document file={file} onLoadSuccess={onLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
          />
        </Document>
      )}
    </div>
  );
};

export default ReadBook;
