"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { ClipboardList, Lock, Eye, ChevronRight, Users, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ReviewPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [std, setStd] = useState([]);
  const [qp, setQp] = useState([]);
  const [queryCounts, setQueryCounts] = useState({});
  const [cpass, setCpass] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch("/api/getqp");
        const data = await response.json();
        setQp(data);
      } catch (error) {
        console.error("Error fetching papers:", error);
        setQp([]);
      }
    };
    fetchPapers();
  }, []);

  useEffect(() => {
    if (!selectedPaper?.name) return;

    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/student-qpaper?name=${encodeURIComponent(selectedPaper.name)}`);
        const data = await res.json();
        
        // Transform data based on API response format
        if (Array.isArray(data)) {
          // If data is already an array of roll numbers
          const formattedData = data.map(roll => typeof roll === 'object' ? roll : { roll });
          setStd(formattedData);
        } else if (data.error) {
          console.error("API error:", data.error);
          setStd([]);
        } else {
          // Convert to array format expected by the UI
          setStd([typeof data === 'object' ? data : { roll: data }]);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setStd([]);
      }
    };

    fetchStudents();
  }, [selectedPaper]);

  useEffect(() => {
    const fetchQueryCounts = async () => {
      if (std.length === 0) return;

      const counts = {};
      await Promise.all(
        std.map(async (student) => {
          if (!student || !student.roll) return;
          
          try {
            const res = await fetch(`/api/get-query-count?roll=${encodeURIComponent(student.roll)}`);
            const data = await res.json();
            counts[student.roll] = data.count || 0;
          } catch (error) {
            console.error("Error fetching query count for", student.roll, error);
            counts[student.roll] = 0;
          }
        })
      );

      setQueryCounts(counts);
    };

    fetchQueryCounts();
  }, [std]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password === cpass) {
      setIsVerified(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => setIsVerified(false)}
              className="text-emerald-700 hover:text-emerald-800 font-medium flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Papers
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 pt-8 pb-6 bg-emerald-600">
              <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                <Users className="w-6 h-6" />
                Student Submissions
              </h2>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedPaper?.name}
                </h3>
              </div>
              <div className="space-y-4">
                {std?.length > 0 ? (
                  std.map((student) => (
                    <div
                      key={`student-${student.roll}`}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-700">{student.roll}</span>

                          {/* Query count indicator */}
                          {queryCounts[student.roll] > 0 && (
                            <button
                              onClick={() =>
                                router.push(`/studentqueries?roll=${encodeURIComponent(student.roll)}&name=${selectedPaper?.name}`)
                              }
                              className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                              title={`${queryCounts[student.roll]} unresolved queries`}
                            >
                              {queryCounts[student.roll]}
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            router.push(
                              `/teacherevaluation?name=${encodeURIComponent(selectedPaper.name)}&roll=${encodeURIComponent(student.roll)}`
                            )
                          }
                          className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                        >
                          View Submission <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6">
                    <p className="text-gray-500">No student submissions found</p>
                  </div>
                )}
              </div>
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
                    Enter Password for {selectedPaper?.name}
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
              Question Papers Review
            </h2>
          </div>
          <div className="p-8">
            {qp?.length > 0 ? (
              <div className="space-y-4">
                {qp.map((paper) => (
                  <div
                    key={`paper-${paper.name}`}
                    className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{paper.name}</h3>
                      <button
                        onClick={() => {
                          setSelectedPaper(paper);
                          setCpass(paper.password);
                        }}
                        className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" /> Check
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-500">No question papers available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;