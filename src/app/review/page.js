"use client"
import React, { useState,useEffect } from 'react';
import { Input } from '../../components/ui/input';
import { ClipboardList, Lock, Eye, ChevronRight, Users, ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";


// Mock data - replace with actual API calls
const mockPapers = [
  { id: "qp1", name: "Mathematics Final", submissions: 45 },
  { id: "qp2", name: "Physics Midterm", submissions: 32 },
  { id: "qp3", name: "Chemistry Quiz", submissions: 28 },
];

const ReviewPage = () => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [students, setStudents] = useState([]);
  const [std,setstd]=useState([]);
  const [qp,setqp]=useState([]);
  const [cpass,setcpass]=useState("");
  const router= useRouter()
  useEffect(()=>{
    const fetchpaper=async()=>{
      const response=await fetch('/api/getqp');
      const data=await response.json()
      setqp(data);
    }
    fetchpaper();
  },[])

  useEffect(() => {
    if (!selectedPaper?.name) return; // Prevent fetching if name is missing

    const studentgetter = async () => {
      try {
        const res = await fetch(`/api/student-qpaper?name=${selectedPaper.name}`);
        const data = await res.json();
        setstd(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    studentgetter();
  }, [selectedPaper]);
console.log(std);
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      if (password === cpass) { 
        setIsVerified(true);
        setStudents([
          "John Doe - ID: 001",
          "Jane Smith - ID: 002",
          "Alex Johnson - ID: 003",
          "Sarah Williams - ID: 004",
        ]);
      } 
      console.log("hello"+std);
    } catch (error) {
      console.error("Verification failed:", error);
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
                  {mockPapers.find(p => p.id === selectedPaper)?.name}
                </h3>
              </div>
              <div key={1} className="space-y-4">
                {std?.map((index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{index.roll}</span>
                      <button onClick={()=>{router.push(`/teacherevaluation?name=${encodeURIComponent(selectedPaper.name)}&?roll=${encodeURIComponent(index.roll)}`)}} className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                        View Submission <ChevronRight className="w-4 h-4" />
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
            <div  key={2} className="space-y-4">
              {qp?.map((paper) => (
                <div
                  key={paper.name}
                  className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{paper.name}</h3>
                   
                      
                    </div>
                    <button
                      onClick={() => {setSelectedPaper(paper);setcpass(paper.password)}}
                      className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-200 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Check
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

export default ReviewPage;