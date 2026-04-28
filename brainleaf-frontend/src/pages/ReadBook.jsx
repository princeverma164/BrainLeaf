import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import axios from "axios";
import { apiUrl, fileUrl } from "../utils/api";

const ReadBook = () => {
  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(apiUrl(`/api/books/${id}`));

        // ✅ SAFE FILE SET
        if (res.data && res.data.file) {
          setFile(fileUrl(res.data.file));
        } else {
          setFile(null);
        }

      } catch (err) {
        console.log("Error loading book:", err);
        setFile(null);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Reading Book 📖</h1>

      {!file && (
        <p className="text-gray-500">Loading book...</p>
      )}

      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(error) => console.log("PDF error:", error)}
        >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={600}
            />
          ))}
        </Document>
      )}

    </div>
  );
};

export default ReadBook;