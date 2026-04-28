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
      const res = await axios.get(
        apiUrl(`/api/books/${id}`)
      );

      setFile(fileUrl(res.data.file));
    };

    fetchBook();
  }, [id]);

  return (
    <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Reading Book 📖</h1>

      {file && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
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
