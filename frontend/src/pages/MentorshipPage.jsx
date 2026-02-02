'use client';

import { useState } from 'react'
import MainLayout from '../components/MainLayout'
import { Users, MessageCircle, Briefcase, Star, Award, Clock, Search, Filter, CheckCircle, Calendar } from 'lucide-react'

// Sample Mentors Data
const mentorsData = [
    {
        id: 1,
        name: 'Rahul Sharma',
        role: 'Software Engineer',
        company: 'Google',
        batch: '2023',
        branch: 'CSE',
        skills: ['DSA', 'System Design', 'Python', 'Interview Prep'],
        rating: 4.9,
        sessions: 45,
        bio: 'Passionate about helping juniors crack FAANG interviews. Specialized in DSA and system design preparation.',
        available: true,
        image: null,
    },
    {
        id: 2,
        name: 'Priya Menon',
        role: 'SDE-2',
        company: 'Amazon',
        batch: '2022',
        branch: 'IT',
        skills: ['Backend', 'AWS', 'Java', 'Microservices'],
        rating: 4.8,
        sessions: 38,
        bio: 'Backend specialist with experience in building scalable systems. Love to guide students on career paths.',
        available: true,
        image: null,
    },
    {
        id: 3,
        name: 'Amit Kumar',
        role: 'Data Scientist',
        company: 'Microsoft',
        batch: '2023',
        branch: 'AI&DS',
        skills: ['Machine Learning', 'Python', 'Statistics', 'Deep Learning'],
        rating: 4.7,
        sessions: 32,
        bio: 'ML enthusiast helping students transition into data science roles. Strong focus on practical projects.',
        available: false,
        image: null,
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        role: 'Frontend Developer',
        company: 'Meta',
        batch: '2022',
        branch: 'CSE',
        skills: ['React', 'JavaScript', 'UI/UX', 'Web Performance'],
        rating: 4.9,
        sessions: 55,
        bio: 'Frontend expert passionate about creating beautiful user experiences. Mentoring since 2 years.',
        available: true,
        image: null,
    },
    {
        id: 5,
        name: 'Karthik Nair',
        role: 'Product Manager',
        company: 'Flipkart',
        batch: '2021',
        branch: 'ECE',
        skills: ['Product Strategy', 'Analytics', 'Communication', 'Leadership'],
        rating: 4.6,
        sessions: 28,
        bio: 'Transitioned from engineering to product. Happy to guide students exploring non-traditional paths.',
        available: true,
        image: null,
    },
    {
        id: 6,
        name: 'Divya Iyer',
        role: 'DevOps Engineer',
        company: 'Adobe',
        batch: '2023',
        branch: 'IT',
        skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud'],
        rating: 4.8,
        sessions: 22,
        bio: 'DevOps specialist helping students understand modern deployment practices and cloud technologies.',
        available: false,
        image: null,
    },
]

const filterOptions = {
    companies: ['All', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Flipkart', 'Adobe'],
    skills: ['All', 'DSA', 'System Design', 'Machine Learning', 'React', 'Backend', 'DevOps'],
}

function MentorshipPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCompany, setSelectedCompany] = useState('All')
    const [showAvailableOnly, setShowAvailableOnly] = useState(false)

    const filteredMentors = mentorsData.filter((mentor) => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCompany = selectedCompany === 'All' || mentor.company === selectedCompany
        const matchesAvailability = !showAvailableOnly || mentor.available
        return matchesSearch && matchesCompany && matchesAvailability
    })

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-primary mb-3">Mentorship Program</h1>
                    <p className="text-gray-600 text-lg">Connect with placed seniors for guidance, mock interviews, and career advice.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <Users className="mx-auto text-primary mb-2" size={24} />
                        <p className="text-3xl font-bold text-primary">{mentorsData.length}</p>
                        <p className="text-sm text-gray-600">Active Mentors</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <MessageCircle className="mx-auto text-secondary mb-2" size={24} />
                        <p className="text-3xl font-bold text-secondary">{mentorsData.reduce((acc, m) => acc + m.sessions, 0)}</p>
                        <p className="text-sm text-gray-600">Sessions Completed</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <Star className="mx-auto text-accent mb-2" size={24} />
                        <p className="text-3xl font-bold text-accent">4.8</p>
                        <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <Award className="mx-auto text-primary mb-2" size={24} />
                        <p className="text-3xl font-bold text-primary">15+</p>
                        <p className="text-sm text-gray-600">Companies</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Search */}
                        <div className="flex-1 relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or skill..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition"
                            />
                        </div>

                        {/* Company Filter */}
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary"
                        >
                            {filterOptions.companies.map((company) => (
                                <option key={company} value={company}>{company === 'All' ? 'All Companies' : company}</option>
                            ))}
                        </select>

                        {/* Available Toggle */}
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showAvailableOnly}
                                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                                className="w-5 h-5 rounded text-primary focus:ring-secondary"
                            />
                            <span className="text-sm font-medium text-gray-700">Available Only</span>
                        </label>
                    </div>
                </div>

                {/* Mentors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMentors.map((mentor) => (
                        <div
                            key={mentor.id}
                            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-accent transition-all"
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
                                    {mentor.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-lg font-bold text-primary">{mentor.name}</h3>
                                        {mentor.available ? (
                                            <span className="w-3 h-3 bg-green-500 rounded-full" title="Available" />
                                        ) : (
                                            <span className="w-3 h-3 bg-gray-400 rounded-full" title="Unavailable" />
                                        )}
                                    </div>
                                    <p className="text-secondary font-semibold">{mentor.role}</p>
                                    <p className="text-sm text-gray-600">{mentor.company} • {mentor.batch}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{mentor.bio}</p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {mentor.skills.slice(0, 3).map((skill) => (
                                    <span key={skill} className="px-2 py-1 bg-background text-primary text-xs font-semibold rounded">
                                        {skill}
                                    </span>
                                ))}
                                {mentor.skills.length > 3 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                                        +{mentor.skills.length - 3}
                                    </span>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-1">
                                    <Star size={14} className="text-yellow-500" />
                                    <span className="font-semibold">{mentor.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={14} />
                                    <span>{mentor.sessions} sessions</span>
                                </div>
                                <span className="text-xs text-gray-400">{mentor.branch}</span>
                            </div>

                            {/* Action */}
                            <button
                                disabled={!mentor.available}
                                className={`w-full py-3 rounded-xl font-bold transition ${mentor.available
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {mentor.available ? 'Request Session' : 'Currently Unavailable'}
                            </button>
                        </div>
                    ))}
                </div>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-16">
                        <Users className="mx-auto text-gray-300 mb-4" size={64} />
                        <p className="text-gray-500 text-lg">No mentors found matching your criteria.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default MentorshipPage
