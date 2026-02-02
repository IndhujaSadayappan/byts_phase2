import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Tag, FileText } from 'lucide-react';

const ProblemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Since we don't have a direct "get single problem" route in the plan explicitly, 
        // assuming we might need to add it or filter from list?
        // Actually, in adminController I defined getAllProblems but not getProblemById explicitly 
        // BUT common pattern suggests we should have one or just use filter.
        // Wait, let's check adminController.js. I only defined getAllProblems and deleteProblem.
        // I missed getProblemDetails in controller! 
        // For now, I will implementation a fetch that relies on the list API with filter if needed, 
        // OR BETTER: I should quickly add getProblemDetails to backend.

        // However, to save time/complexity and since I am in Frontend phase, I will try to fetch all and find, 
        // OR assuming I can add the endpoint quickly.
        // Let's add the endpoint to backend first? No, context switching is risky.
        // Let's rely on standard GET /api/admin/problems?id={id} if I implemented filter?
        // No, I implemented filter by difficulty only.

        // OK, I will add getProblemDetails to adminController.js via replace_file_content 
        // AND adding route to adminRoutes.js.
        // This is better for correctness.
        fetchProblem();
    }, [id]);

    const fetchProblem = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            // Intentionally using a direct ID route hoping to fix backend in parallel
            const res = await axios.get(`http://localhost:5000/api/admin/problems/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProblem(res.data);
        } catch (error) {
            // Fallback or error handling
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading problem...</div>;
    if (!problem) return <div className="p-10 text-center">Problem not found</div>;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to List
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{problem.title}</h1>
                        <div className="flex items-center space-x-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold
                  ${problem.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                    problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'}`}>
                                {problem.difficulty}
                            </span>
                            <div className="flex items-center text-gray-500 text-sm">
                                <User size={14} className="mr-1" />
                                Uploaded by {problem.uploadedBy?.email || 'Unknown'}
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Calendar size={14} className="mr-1" />
                                {new Date(problem.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prose max-w-none text-gray-700 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-2">
                        <FileText size={20} className="mr-2 text-indigo-600" />
                        Description
                    </h3>
                    <p className="whitespace-pre-wrap">{problem.description}</p>
                </div>

                {problem.sampleInput && (
                    <div className="mb-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-2">Sample Input</h4>
                        <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-800">{problem.sampleInput}</pre>
                    </div>
                )}

                {problem.sampleOutput && (
                    <div className="mb-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-2">Sample Output</h4>
                        <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-800">{problem.sampleOutput}</pre>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                        <Tag size={18} className="mr-2 text-gray-400" />
                        Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {problem.tags && problem.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDetail;
