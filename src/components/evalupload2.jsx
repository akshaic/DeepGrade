"use client";

import React, { useState } from "react";
import { HashLoader } from "react-spinners";

const UploadPage = ({ name }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!file) {
      setMessage("Please select a PDF file first.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("name", name);

    try {
      const res = await fetch("/api/uploadevalc", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Success: Answers inserted successfully!");
      } else {
        setMessage(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("❌ Error: Failed to upload the file.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 p-6 bg-gray-100 rounded-xl shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Upload Answer Evaluation</h3>
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Answer Sheet (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-emerald-50 file:text-emerald-700
              hover:file:bg-emerald-100
              transition-colors"
          />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <HashLoader color="#023047" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Upload PDF
          </button>
        )}
      </form>

      {message && (
        <div
          className={`mt-4 p-4 rounded w-full max-w-lg ${
            message.startsWith("✅") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
