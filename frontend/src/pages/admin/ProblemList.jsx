import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Eye, Trash2, AlertTriangle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProblems();
    }, [page, difficulty]);

    const fetchProblems = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/admin/problems`, {
                params: { page, difficulty },
                headers: { Authorization: `Bearer ${token}` }
            });
            setProblems(res.data.problems);
            setTotalPages(res.data.pages);
        } catch (error) {
            console.error('Error fetching problems:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/problems/${deleteId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProblems();
            setDeleteId(null);
        } catch (error) {
            console.error('Error deleting problem:', error);
            alert('Failed to delete problem');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Problem Repository</h1>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4">
                <div className="flex items-center space-x-2">
                    <Filter size={20} className="text-gray-400" />
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            {/* Grid view for problems */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="col-span-full text-center text-gray-500 py-10">Loading problems...</p>
                ) : problems.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-10">No problems found</p>
                ) : (
                    problems.map((problem) => (
                        <div key={problem._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded text-xs font-semibold
                  ${problem.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'}`}>
                                    {problem.difficulty}
                                </span>
                                <div className="flex space-x-2">
                                    {/* View Details functionality could be a modal or expansion, omitted for brevity but button is here */}
                                    <button
                                        onClick={() => setDeleteId(problem._id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{problem.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                                {problem.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-50">
                                {problem.tags && problem.tags.map((tag, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="px-4 py-2 text-sm text-gray-600">Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mx-auto mb-4">
                            <AlertTriangle className="text-red-600" size={24} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Problem?</h3>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            Are you sure? This will remove the problem from the repository. uploader will be notified.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProblemList;
