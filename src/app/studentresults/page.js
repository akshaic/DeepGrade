"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const StudentResultsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            try {
                const response = await fetch("/api/studentresults");
                const data = await response.json();
                setResults(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching results:", error);
                setLoading(false);
            }
        }
        fetchResults();
    }, []);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
            <div className="max-w-xl mx-auto mt-24">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
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
        </div>
    );
};

export default StudentResultsPage;
