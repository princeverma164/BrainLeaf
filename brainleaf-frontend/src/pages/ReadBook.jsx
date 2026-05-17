import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { apiUrl } from "../utils/api";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState("");

  const getBlobErrorMessage = async (err) => {
    const data = err.response?.data;

    if (data instanceof Blob) {
      try {
        const text = await data.text();
        const parsed = JSON.parse(text);
        return parsed.message || "Failed to load PDF file";
      } catch {
        return "Failed to load PDF file";
      }
    }

    return err.response?.data?.message || "Failed to load PDF file";
  };

  useEffect(() => {
    let objectUrl = null;

    const fetchPdf = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(apiUrl(`/api/books/${id}/read`), {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });

        objectUrl = URL.createObjectURL(res.data);
        setFile(objectUrl);
        setError("");
      } catch (err) {
        console.log("PDF load error:", err);
        setError(await getBlobErrorMessage(err));
      }
    };

    fetchPdf();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [id, navigate]);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen px-4">
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reading Book</h1>
        <button
          onClick={() => navigate(`/book/${id}`)}
          className="border px-4 py-2 rounded-md bg-white"
        >
          Back
        </button>
      </div>

      {!file && !error && <p className="text-gray-500">Loading PDF...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => {
            console.log("PDF render error:", err);
            setError("Failed to load PDF file");
          }}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={Math.min(820, window.innerWidth - 32)}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      )}
    </div>
  );
};

export default ReadBook;
