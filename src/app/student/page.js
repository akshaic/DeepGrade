"use client"
import React from 'react';
import { FileText, ClipboardCheck, Award, User } from 'lucide-react';
import { useRouter } from "next/navigation";


const StudentDashboard = () => {
  // Mock student data
  const student = {
    name: "Alex Rodriguez",
    studentId: "S-2025-128"
  };
  const router= useRouter()

  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 relative">
      {/* Profile display with green border matching buttons */}
      <div className="absolute top-8 right-12 flex items-center bg-white shadow-md rounded-2xl px-5 py-3 border-2 border-emerald-600">
        <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
          <User className="h-7 w-7 text-emerald-600" />
        </div>
        <div>
          <p className="font-medium text-gray-800 text-lg">{student.name}</p>
          <p className="text-gray-500">{student.studentId}</p>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto mt-24">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-8 pt-8 pb-6 bg-emerald-600">
            <h2 className="text-2xl font-bold text-white text-center">
              Student Dashboard
            </h2>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Dashboard Options - Vertical Layout with Narrower Buttons */}
            <div className="flex flex-col items-center space-y-6">
              {/* View Question Papers and Evaluation Criteria */}
              <div className="flex flex-col items-center w-full">
                <button className="w-64 bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <FileText className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="font-medium text-center">View Question Papers and Evaluation Criteria</span>
                </button>
              </div>
              {/* View My Answer */}
              <div className="flex flex-col items-center w-full">
                <button className="w-64 bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <ClipboardCheck className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="font-medium text-center">View My Answer</span>
                </button>
              </div>
              {/* View Results */}
              <div className="flex flex-col items-center w-full">
                <button onClick={()=>{router.push('./studentgrade')}} className="w-64 bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <Award className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="font-medium text-center">View Results</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;