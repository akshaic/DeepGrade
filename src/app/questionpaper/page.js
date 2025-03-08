"use client"
import React, { useEffect, useState } from 'react';
import { Lock, X, FileText, ChevronRight } from 'lucide-react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [cpass,setcpass]=useState('');
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [qp,setqp]=useState(null);

  // Sample question papers (in a real app, this would come from an API/database)
  

  useEffect(()=>{
    const fetchpaper=async()=>{
      const response=await fetch('/api/getqp');
      const data=await response.json()
      setqp(data);
    }
    fetchpaper();
  },[])
  const handleCheck = (paper) => {
    setSelectedPaper(paper);
    setcpass(paper.password)
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate the password
    console.log(`Checking password for ${selectedPaper?.name}: ${password}:${cpass}`);
    if(cpass==password){
      console.log("ok");
    }
    setPassword('');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Question Papers</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          {qp?.map((paper) => (
            <div
              key={paper.id}
              className="bg-white/80 backdrop-blur rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-50"
            >
              <div className="px-6 py-5 flex items-center justify-between group">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {paper.name}
                    </h2>
                    <ChevronRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all ml-2" />
                  </div>
                
                </div>
                <button
                  onClick={() => handleCheck(paper)}
                  className="ml-4 inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-xl"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Check
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-[fadeIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Enter Password</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors hover:bg-gray-100 p-2 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Please enter the password to access <span className="font-medium text-indigo-600">{selectedPaper?.name}</span>
                </p>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;