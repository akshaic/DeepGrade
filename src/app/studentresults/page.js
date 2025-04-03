"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const StudentResultsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [roll, setRoll] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [showQueryDialog, setShowQueryDialog] = useState(false);
    const [query, setQuery] = useState("");

    const fetchResults = async () => {
        if (!roll.trim()) {
            alert("Please enter a roll number!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/studentresults?roll=${roll}`);
            const text = await response.text(); // Read response as text to debug errors

            try {
                const data = JSON.parse(text); // Attempt to parse JSON
                setResults(data);
                setShowResults(true);
            } catch (jsonError) {
                console.error("Invalid JSON response:", text);
                alert("Error: Invalid server response. Please try again later.");
            }
        } catch (error) {
            console.error("Error fetching results:", error);
            alert("Failed to fetch results. Please check your network connection.");
        } finally {
            setLoading(false);
        }
    };

    const submitQuery = async () => {
        if (!query.trim()) {
            alert("Please enter your query!");
            return;
        }

        try {
            const response = await fetch("/api/studentqueries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rollNumber: roll,
                    query: query,
                }),
            });

            if (response.ok) {
                alert("Query submitted successfully!");
                setQuery("");
                setShowQueryDialog(false);
            } else {
                // Fixed error handling here - don't assume JSON response on error
                const errorText = await response.text();
                let errorMessage = "Failed to submit query";
                
                try {
                    // Try to parse as JSON, but don't throw if it fails
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    // If parsing fails, use the raw text or a default message
                    errorMessage = errorText || errorMessage;
                }
                
                alert(`${errorMessage}`);
            }
        } catch (error) {
            console.error("Error submitting query:", error);
            alert("Failed to submit query. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-emerald-600 w-12 h-12" />
                    <p className="text-xl font-semibold text-emerald-700 animate-pulse">
                        Loading your results...
                    </p>
                </div>
            </div>
        );
    }

    if (!showResults) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
                    <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
                        Enter Roll Number
                    </h2>
                    <form onSubmit={(e) => { e.preventDefault(); fetchResults(); }} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                value={roll}
                                onChange={(e) => setRoll(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                placeholder="Enter Roll Number"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 py-3 text-lg font-medium rounded-lg transition-all"
                        >
                            Get Results
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 relative">
            <button
                onClick={() => setShowResults(false)}
                className="absolute top-4 left-4 text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1"
            >
                <ArrowLeft className="w-8 h-8" />
                <span className="text-lg font-medium">Back to Roll Number</span>
            </button>

            <div className="max-w-xl mx-auto mt-24">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="px-8 pt-8 pb-6 bg-emerald-600">
                        <h2 className="text-2xl font-bold text-white text-center">
                            Student Results
                        </h2>
                    </div>

                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                        {results.map((result, index) => (
                            <Card key={index} className="bg-white border-2 border-emerald-600 p-6 rounded-2xl shadow-md">
                                <CardContent>
                                    <h2 className="text-lg font-semibold text-emerald-700">
                                        Question {result.q_no}
                                    </h2>
                                    <p className="text-gray-700">Answer: {result.answer}</p>
                                    <p className="text-gray-700">Grade: {result.grade}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={() => setShowQueryDialog(true)}
                className="fixed bottom-4 right-4 bg-emerald-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
            >
                Raise Query
            </button>

            {showQueryDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
                        <h2 className="text-2xl font-bold text-emerald-700 mb-4 text-center">Raise Your Query</h2>
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            placeholder="Enter your query here..."
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <Button onClick={() => setShowQueryDialog(false)} className="bg-gray-400 text-white hover:bg-gray-500 py-2 px-4 rounded-lg">
                                Cancel
                            </Button>
                            <Button onClick={submitQuery} className="bg-emerald-600 text-white hover:bg-emerald-700 py-2 px-4 rounded-lg">
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentResultsPage;