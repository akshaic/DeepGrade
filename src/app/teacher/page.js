"use client"
import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import UploadPage from '../../components/evalupload2';
import { BookOpen, Lock } from 'lucide-react';

function App() {
  const [name, setname] = useState("");
  const [qpid, setqpid] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target.qname.value;
    setname(data);
    const res = await fetch('/api/questionpaper', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: e.target.qname.value, password: e.target.password.value })
    });
    const dres = await res.json();
    console.log("response" + dres);
    setqpid(dres);
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-8 pt-8 pb-6 bg-emerald-600">
          <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6" />
            Create Question Paper
          </h2>
        </div>
        
        <div className="p-8">
          {name === "" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Question Paper Name</label>
                <div className="relative">
                  <Input
                    id="qname"
                    placeholder="Enter question paper name"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter password"
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Create Paper
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-emerald-800 font-medium">
                  Paper ID: {name + qpid}
                </p>
              </div>
              <UploadPage name={name} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;