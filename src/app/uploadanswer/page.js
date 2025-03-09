"use client"
import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { ClipboardList, Upload, FileUp, Lock, Check, ArrowLeft } from 'lucide-react';

// Mock data - replace with actual API calls
const mockPapers = [
  { id: "qp1", name: "Mathematics Final" },
  { id: "qp2", name: "Physics Midterm" },
  { id: "qp3", name: "Chemistry Quiz" },
];

const UploadPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileInput, setFileInput] = useState(null);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    // Replace with actual API call
    try {
      // Mock API call
      if (password === "test") { // Replace with actual verification
        setIsVerified(true);
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFileInput(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileInput) return;

    setUploading(true);
    
    // Replace with actual API call
    try {
      // Mock API call - simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadSuccess(true);
      setUploading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setSelectedPaper(null);
                setIsVerified(false);
                setUploadSuccess(false);
                setFileName("");
                setFileInput(null);
                setPassword("");
              }}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Papers
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 pt-8 pb-6 bg-emerald-600">
              <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                <Check className="w-6 h-6" />
                Upload Successful
              </h2>
            </div>
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Answer Sheet Uploaded
              </h3>
              <p className="text-gray-600 mb-6">
                Your answer sheet for {mockPapers.find(p => p.id === selectedPaper)?.name} has been uploaded successfully.
              </p>
              <button
                onClick={() => {
                  setSelectedPaper(null);
                  setIsVerified(false);
                  setUploadSuccess(false);
                  setFileName("");
                  setFileInput(null);
                  setPassword("");
                }}
                className="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Return to Papers
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPaper && isVerified) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setSelectedPaper(null);
                setIsVerified(false);
                setPassword("");
              }}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Papers
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 pt-8 pb-6 bg-emerald-600">
              <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                <FileUp className="w-6 h-6" />
                Upload Answer Sheet
              </h2>
            </div>
            <div className="p-8">
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {mockPapers.find(p => p.id === selectedPaper)?.name}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select Answer Sheet (PDF only)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('file-upload').click()}>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    {fileName ? (
                      <p className="mt-1 text-sm text-gray-900">{fileName}</p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">Click to browse or drag and drop</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">PDF files only (max. 10MB)</p>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!fileName || uploading}
                  className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                    !fileName || uploading
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload Answer Sheet"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPaper) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setSelectedPaper(null)}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Papers
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 pt-8 pb-6 bg-emerald-600">
              <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                <Lock className="w-6 h-6" />
                Verify Password
              </h2>
            </div>
            <div className="p-8">
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Enter Password for {mockPapers.find(p => p.id === selectedPaper)?.name}
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Verify
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 bg-emerald-600">
            <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
              <ClipboardList className="w-6 h-6" />
              Question Papers
            </h2>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {mockPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{paper.name}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedPaper(paper.id)}
                      className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-200 transition-colors"
                    >
                      <FileUp className="w-4 h-4" />
                      Upload
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;