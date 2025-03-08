"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpload = async (e) => {
    setLoading(true)
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
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundColor:'#1b263b'}}>
      <h1 className="text-2xl font-bold mb-4" style={{color:'white'}}>Upload Answer Sheet</h1>

      <form onSubmit={handleUpload} className=" p-6 rounded-lg shadow-md" style={{borderRadius:'30px',backgroundColor:'#a4c3b2'}}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 w-full mb-4"
        />
       {loading? <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Uploading....
        </button>:
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload 
        </button>}
      </form>

      {message && (
        <div className={`mt-4 p-4 rounded w-full max-w-2xl ${message.startsWith("✅") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
