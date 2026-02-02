'use client';

import { useState } from 'react'
import MainLayout from '../components/MainLayout'
import { Briefcase, MapPin, Clock, DollarSign, Building2, ExternalLink, Filter, Search, Star, Calendar } from 'lucide-react'

// Sample Opportunities Data
const opportunitiesData = [
    {
        id: 1,
        company: 'Google',
        role: 'Software Engineer Intern',
        location: 'Bangalore, India',
        type: 'Internship',
        stipend: '₹80,000/month',
        deadline: '2025-02-15',
        posted: '2025-01-20',
        description: 'Work on cutting-edge products used by billions. Strong DSA and problem-solving skills required.',
        requirements: ['BTech CS/IT', 'Strong DSA', 'Python/Java/C++'],
        isNew: true,
        isFeatured: true,
    },
    {
        id: 2,
        company: 'Microsoft',
        role: 'Software Development Engineer',
        location: 'Hyderabad, India',
        type: 'Full-time',
        stipend: '₹18 LPA',
        deadline: '2025-02-20',
        posted: '2025-01-18',
        description: 'Join the Azure team to build cloud solutions. Looking for passionate developers.',
        requirements: ['BTech CS/IT/ECE', 'Cloud fundamentals', 'System Design basics'],
        isNew: true,
        isFeatured: true,
    },
    {
        id: 3,
        company: 'Amazon',
        role: 'SDE-1',
        location: 'Chennai, India',
        type: 'Full-time',
        stipend: '₹22 LPA',
        deadline: '2025-02-25',
        posted: '2025-01-15',
        description: 'Build scalable systems for millions of customers. Strong problem-solving skills needed.',
        requirements: ['BTech any branch', 'DSA expertise', 'OOP concepts'],
        isNew: false,
        isFeatured: true,
    },
    {
        id: 4,
        company: 'Goldman Sachs',
        role: 'Summer Analyst',
        location: 'Bangalore, India',
        type: 'Internship',
        stipend: '₹1,00,000/month',
        deadline: '2025-02-10',
        posted: '2025-01-10',
        description: 'Join our engineering division for a 10-week summer internship program.',
        requirements: ['BTech CS/IT', 'Finance interest', 'Problem solving'],
        isNew: false,
        isFeatured: false,
    },
    {
        id: 5,
        company: 'Flipkart',
        role: 'Product Engineer',
        location: 'Bangalore, India',
        type: 'Full-time',
        stipend: '₹16 LPA',
        deadline: '2025-03-01',
        posted: '2025-01-22',
        description: 'Work on India\'s leading e-commerce platform. Build features used by millions.',
        requirements: ['BTech CS/IT', 'React/Node.js', 'SQL'],
        isNew: true,
        isFeatured: false,
    },
    {
        id: 6,
        company: 'Adobe',
        role: 'Machine Learning Intern',
        location: 'Noida, India',
        type: 'Internship',
        stipend: '₹60,000/month',
        deadline: '2025-02-28',
        posted: '2025-01-19',
        description: 'Work on AI/ML features for creative cloud products. Python and ML expertise required.',
        requirements: ['BTech CS/AI', 'Python', 'ML frameworks'],
        isNew: true,
        isFeatured: false,
    },
]

const filters = {
    types: ['All', 'Full-time', 'Internship'],
    locations: ['All', 'Bangalore', 'Hyderabad', 'Chennai', 'Noida', 'Mumbai'],
}

function OpportunitiesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedType, setSelectedType] = useState('All')
    const [selectedLocation, setSelectedLocation] = useState('All')

    const filteredOpportunities = opportunitiesData.filter((opp) => {
        const matchesSearch = opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            opp.role.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = selectedType === 'All' || opp.type === selectedType
        const matchesLocation = selectedLocation === 'All' || opp.location.includes(selectedLocation)
        return matchesSearch && matchesType && matchesLocation
    })

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-primary mb-3">Career Opportunities</h1>
                    <p className="text-gray-600 text-lg">Explore latest job openings and internships from top companies.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-primary">{opportunitiesData.length}</p>
                        <p className="text-sm text-gray-600">Active Openings</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-secondary">{opportunitiesData.filter(o => o.type === 'Full-time').length}</p>
                        <p className="text-sm text-gray-600">Full-time Roles</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-accent">{opportunitiesData.filter(o => o.type === 'Internship').length}</p>
                        <p className="text-sm text-gray-600">Internships</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-primary">{opportunitiesData.filter(o => o.isFeatured).length}</p>
                        <p className="text-sm text-gray-600">Featured</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by company or role..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition"
                            />
                        </div>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary"
                        >
                            {filters.types.map((type) => (
                                <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                            ))}
                        </select>

                        {/* Location Filter */}
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary"
                        >
                            {filters.locations.map((loc) => (
                                <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Opportunities List */}
                <div className="space-y-6">
                    {filteredOpportunities.map((opp) => (
                        <div
                            key={opp.id}
                            className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all hover:shadow-xl ${opp.isFeatured ? 'border-accent' : 'border-gray-100'
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-6">
                                {/* Company Logo Placeholder */}
                                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                                    <Building2 className="text-white" size={28} />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-primary">{opp.role}</h3>
                                        {opp.isNew && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">NEW</span>
                                        )}
                                        {opp.isFeatured && (
                                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full flex items-center gap-1">
                                                <Star size={12} /> Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-lg font-semibold text-secondary mb-2">{opp.company}</p>
                                    <p className="text-gray-600 mb-4">{opp.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={16} className="text-secondary" /> {opp.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Briefcase size={16} className="text-secondary" /> {opp.type}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign size={16} className="text-secondary" /> {opp.stipend}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} className="text-red-500" /> Deadline: {new Date(opp.deadline).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Requirements */}
                                    <div className="flex flex-wrap gap-2">
                                        {opp.requirements.map((req) => (
                                            <span key={req} className="px-3 py-1 bg-background text-primary text-xs font-semibold rounded-full">
                                                {req}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition flex items-center gap-2 self-start">
                                    Apply <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOpportunities.length === 0 && (
                    <div className="text-center py-16">
                        <Briefcase className="mx-auto text-gray-300 mb-4" size={64} />
                        <p className="text-gray-500 text-lg">No opportunities found matching your criteria.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default OpportunitiesPage
