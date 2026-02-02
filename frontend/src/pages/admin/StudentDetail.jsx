import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    BookOpen,
    Briefcase,
    Award,
    Linkedin,
    Github
} from 'lucide-react';

const StudentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:5000/api/admin/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (error) {
            console.error('Error fetching student detail:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading profile...</div>;
    if (!data || !data.profile) return <div className="p-10 text-center">Student not found</div>;

    const { profile, experiences, problems } = data;

    return (
        <div className="space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to List
            </button>

            {/* Header Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-32 bg-indigo-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex items-end -mt-12 mb-6">
                        <img
                            className="h-24 w-24 rounded-full ring-4 ring-white object-cover bg-white"
                            src={profile.profilePicture || `https://ui-avatars.com/api/?name=${profile.fullName}`}
                            alt={profile.fullName}
                        />
                        <div className="ml-6 mb-1">
                            <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                                <span className="capitalize">{profile.role || 'Student'}</span>
                                {profile.placementStatus === 'placed' && (
                                    <span className="ml-3 px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-semibold">
                                        Placed
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="ml-auto flex gap-3">
                            {profile.linkedinUrl && (
                                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                    <Linkedin size={24} />
                                </a>
                            )}
                            {profile.githubUrl && (
                                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                                    <Github size={24} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <Mail size={18} className="mr-3" />
                                <span>{profile.userId?.email}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Phone size={18} className="mr-3" />
                                <span>{profile.whatsappNumber || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <MapPin size={18} className="mr-3" />
                                <span>{profile.branch}, {profile.year}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Calendar size={18} className="mr-3" />
                                <span>Batch of {profile.batch || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <Briefcase size={18} className="mr-3" />
                                <span>{profile.company ? `${profile.role} at ${profile.company}` : 'Seeking Opportunities'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Skills & Stats */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.skills?.length > 0 ? (
                                profile.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No skills listed</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-4">Platform Activity</h3>
                        <ul className="space-y-3">
                            <li className="flex justify-between text-sm">
                                <span className="text-gray-600">Interview Experiences</span>
                                <span className="font-medium text-gray-900">{experiences.length}</span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span className="text-gray-600">Problems Uploaded</span>
                                <span className="font-medium text-gray-900">{problems.length}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Experiences & Problems */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <BookOpen size={20} className="mr-2 text-indigo-600" />
                            Interview Experiences
                        </h3>
                        <div className="space-y-4">
                            {experiences.length === 0 ? (
                                <p className="text-gray-500 text-sm italic">No interview experiences shared yet.</p>
                            ) : (
                                experiences.map(exp => (
                                    <div key={exp._id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{exp.companyName}</h4>
                                                <p className="text-sm text-gray-600">{exp.roleAppliedFor} • {exp.placementSeason}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium capitalize 
                        ${exp.outcome === 'selected' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                                                {exp.outcome}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <Award size={20} className="mr-2 text-orange-600" />
                            Problems Contributed
                        </h3>
                        <div className="space-y-4">
                            {problems.length === 0 ? (
                                <p className="text-gray-500 text-sm italic">No problems uploaded yet.</p>
                            ) : (
                                problems.map(prob => (
                                    <div key={prob._id} className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium text-gray-900">{prob.title}</h4>
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium 
                        ${prob.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                                    prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'}`}>
                                                {prob.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
