"use client"
import React, { useState } from 'react';
import { ClipboardList, Award, Eye, ArrowLeft } from 'lucide-react';

const StudentResultsPage = () => {
  // Dummy data directly in the component
  const dummyQuestionPapers = [
    { id: "qp1", name: "Mathematics Final", totalMarks: 100 },
    { id: "qp2", name: "Physics Midterm", totalMarks: 50 },
    { id: "qp3", name: "Chemistry Quiz", totalMarks: 30 },
    { id: "qp4", name: "Biology Test", totalMarks: 75 }
  ];

  const dummyResults = {
    qp1: {
      totalMarks: 85,
      maxMarks: 100,
      questions: [
        { number: 1, marks: 18, maxMarks: 20, feedback: "Good attempt, clear explanation" },
        { number: 2, marks: 15, maxMarks: 15, feedback: "Perfect solution" },
        { number: 3, marks: 12, maxMarks: 15, feedback: "Missed one part of the explanation" },
        { number: 4, marks: 25, maxMarks: 30, feedback: "Calculation error in last step" },
        { number: 5, marks: 15, maxMarks: 20, feedback: "Good approach but incomplete solution" },
      ]
    },
    qp2: {
      totalMarks: 42,
      maxMarks: 50,
      questions: [
        { number: 1, marks: 9, maxMarks: 10, feedback: "Correct approach" },
        { number: 2, marks: 12, maxMarks: 15, feedback: "Good work, minor error in calculation" },
        { number: 3, marks: 8, maxMarks: 10, feedback: "Well explained" },
        { number: 4, marks: 13, maxMarks: 15, feedback: "Almost perfect, small conceptual error" },
      ]
    },
    qp3: {
      totalMarks: 25,
      maxMarks: 30,
      questions: [
        { number: 1, marks: 9, maxMarks: 10, feedback: "Good understanding of concepts" },
        { number: 2, marks: 8, maxMarks: 10, feedback: "Correct but explanation could be clearer" },
        { number: 3, marks: 8, maxMarks: 10, feedback: "Well done" },
      ]
    },
    qp4: {
      totalMarks: 65,
      maxMarks: 75,
      questions: [
        { number: 1, marks: 18, maxMarks: 20, feedback: "Excellent work" },
        { number: 2, marks: 15, maxMarks: 15, feedback: "Perfect answer" },
        { number: 3, marks: 12, maxMarks: 20, feedback: "Missing important details" },
        { number: 4, marks: 20, maxMarks: 20, feedback: "Outstanding answer" },
      ]
    }
  };

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResults = (paper) => {
    // Simulate loading state for a more realistic UI experience
    setLoading(true);
    setSelectedPaper(paper);
    
    // Simulate network delay with setTimeout
    setTimeout(() => {
      setResults(dummyResults[paper.id]);
      setLoading(false);
    }, 500); // 500ms delay to simulate network request
  };

  if (selectedPaper && results) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
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
                <Award className="w-6 h-6" />
                {selectedPaper.name} Results
              </h2>
            </div>
            
            {/* Total marks displayed in bigger size at the top */}
            <div className="p-8 bg-emerald-50 flex flex-col items-center justify-center">
              <div className="text-sm font-medium text-emerald-700 mb-2">YOUR TOTAL SCORE</div>
              <div className="text-5xl font-bold text-emerald-800">
                {results.totalMarks} <span className="text-2xl text-emerald-600">/ {results.maxMarks}</span>
              </div>
              <div className="mt-2 text-emerald-600 font-medium">
                {Math.round((results.totalMarks / results.maxMarks) * 100)}%
              </div>
            </div>
            
            {/* Question-wise breakdown */}
            <div className="p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Question-wise Breakdown</h3>
              <div className="space-y-4">
                {results.questions.map((question) => (
                  <div
                    key={question.number}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Question {question.number}</h4>
                        {question.feedback && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Feedback:</span> {question.feedback}
                          </p>
                        )}
                      </div>
                      <div className="font-bold text-emerald-700">
                        {question.marks} <span className="text-gray-600 font-normal">/ {question.maxMarks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              Your Exam Results
            </h2>
          </div>
          <div className="p-8">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {dummyQuestionPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{paper.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Total Marks: {paper.totalMarks}</p>
                      </div>
                      <button
                        onClick={() => fetchResults(paper)}
                        disabled={loading}
                        className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Grades
                      </button>
                    </div>
                  </div>
                ))}
                
                {dummyQuestionPapers.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    No results available yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResultsPage;