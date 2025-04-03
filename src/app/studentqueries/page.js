"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FileText, MessageCircle, User, Calendar, CheckCircle } from 'lucide-react';

export default function StudentQueriesPage() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resolving, setResolving] = useState({});
  const searchParams = useSearchParams();
  const roll = searchParams.get('roll');
  const name = searchParams.get('name'); // Get name from query params
  const router = useRouter();
  
  useEffect(() => {
    if (!roll) return;
    fetchQueries();
  }, [roll]);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/get-student-queries?roll=${roll}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Fetched query data:", data);
      setQueries(data);
    } catch (err) {
      console.error("Failed to fetch queries:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveQuery = async (queryId) => {
    try {
      setResolving((prev) => ({ ...prev, [queryId]: true }));
      
      const response = await fetch('/api/resolve-query', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to resolve query: ${response.statusText}`);
      }

      // Remove the resolved query from the state
      setQueries(queries.filter(query => query.query_id !== queryId));
    } catch (err) {
      console.error("Error resolving query:", err);
      alert("Failed to resolve query. Please try again.");
    } finally {
      setResolving((prev) => ({ ...prev, [queryId]: false }));
    }
  };

  const handleCheckPaper = () => {
    router.push(`/teacherevaluation?name=final&roll=${roll}`);
  };

  // Mock student data
  const student = {
    name: name || "Student",
    email: roll ? queries[0]?.student?.email : "Loading...",
    rollNumber: roll || "Loading..."
  };

  if (!roll) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-emerald-600 font-medium">Loading student information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 relative">
      {/* Profile display */}
      <div className="absolute top-8 right-12 flex items-center bg-white shadow-md rounded-2xl px-5 py-3 border-2 border-emerald-600">
        <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
          <User className="h-7 w-7 text-emerald-600" />
        </div>
        <div>
          <p className="font-medium text-gray-800 text-lg">{student.name}</p>
          <p className="text-gray-500">{roll}</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-24">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-8 pt-8 pb-6 bg-emerald-600">
            <h2 className="text-2xl font-bold text-white text-center">
              Student Queries
            </h2>
          </div>
          
          <div className="p-8">
            {loading && (
              <div className="flex justify-center items-center p-8">
                <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                  <MessageCircle className="h-7 w-7 text-emerald-600" />
                </div>
                <p className="ml-4 text-emerald-600 font-medium">Loading queries...</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-6 py-4 rounded-xl mb-6">
                <p className="font-medium">Error loading queries: {error}</p>
              </div>
            )}
            
            {!loading && !error && queries.length === 0 && (
              <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-6 py-8 rounded-xl flex flex-col items-center">
                <MessageCircle className="h-10 w-10 mb-3 text-emerald-500" />
                <p className="font-medium text-center">No queries found for this student.</p>
              </div>
            )}
            
            {!loading && !error && queries.length > 0 && (
              <div className="space-y-6">
                {queries.map((query) => (
                  <div key={query.query_id} className="bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                            <FileText className="h-5 w-5 text-emerald-600" />
                          </div>
                          <h3 className="font-medium text-lg text-gray-800">
                            {query.questionPaper.name}
                          </h3>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(query.createdAt).toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-emerald-50 rounded-xl p-4 mb-2">
                        <p className="text-gray-700">{query.query}</p>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <span>Query ID: {query.query_id.substring(0, 8)}...</span>
                        </div>
                        <button
                          onClick={() => handleResolveQuery(query.query_id)}
                          disabled={resolving[query.query_id]}
                          className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          {resolving[query.query_id] ? (
                            <>
                              <span className="mr-2">Resolving...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>Resolve Query</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Centered Check Paper button */}
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={handleCheckPaper}
                    className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors text-lg font-medium"
                  >
                    Check Paper
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}