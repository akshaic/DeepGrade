"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [transcribedText, setTranscribedText] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setTranscribedText(data.transcribed); // Display transcribed text
      } else {
        alert(data.error || "Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Upload a PDF and Get Transcription</h1>

      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload PDF
        </button>
      </form>

      {transcribedText && (
        <div className="mt-4 p-4 bg-gray-200 text-black rounded w-full max-w-2xl">
          <h2 className="font-bold">Transcribed Text:</h2>
          <p className="text-sm">{transcribedText}</p>
        </div>
      )}
    </div>
  );
}
