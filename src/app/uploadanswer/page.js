"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before uploading

    if (!file) {
      setMessage("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/uploadanswer", {
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Upload a PDF</h1>

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

      {message && (
        <div className={`mt-4 p-4 rounded w-full max-w-2xl ${message.startsWith("✅") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
