"use client"
import React from 'react';
import { FileText, Upload, ClipboardCheck, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
const TeacherDashboard = () => {
  const router=useRouter();
  const session=useSession()
  const name=session.data?.user.name
  console.log(name)
  // Mock teacher data
  const teacher = {
    name: "hel",
    staffId: "T-2025-042"
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 relative">
      {/* Profile display with green border matching buttons - now with rounded edges */}
      <div className="absolute top-8 right-12 flex items-center bg-white shadow-md rounded-2xl px-5 py-3 border-2 border-emerald-600">
        <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
          <User className="h-7 w-7 text-emerald-600" />
        </div>
        <div>
          <p className="font-medium text-gray-800 text-lg">{name}</p>
          <p className="text-gray-500">{teacher.staffId}</p>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto mt-24">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="px-8 pt-8 pb-6 bg-emerald-600">
            <h2 className="text-2xl font-bold text-white text-center">
              Teacher Dashboard
            </h2>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Dashboard Options - Vertical Layout with Narrower Buttons */}
            <div className="flex flex-col items-center space-y-6">
              {/* Create Question Paper */}
              <div className="flex flex-col items-center w-full">
                <button onClick={()=>{router.push('/teacher')}} className="w-64 bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <FileText className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="font-medium text-center">Create Question Paper</span>
                </button>
              </div>
              {/* Upload Answer Sheet */}
              <div className="flex flex-col items-center w-full">
                <button onClick={()=>{router.push('/uploadanswer')}} className="w-64 bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <Upload className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="font-medium text-center">Upload Answer Sheet</span>
                </button>
              </div>
              {/* Review Answer Sheets */}
              <div className="flex flex-col items-center w-full">
                <button onClick={()=>{router.push('/review')}} className="w-64 bg-white hover:bg-emerald-50 border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center p-6 rounded-2xl shadow-md transition-all hover:shadow-lg">
                  <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                    <ClipboardCheck className="h-7 w-7 text-emerald-600" />
                  </div>
                  <span className="font-medium text-center">Review Answer Sheets</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;