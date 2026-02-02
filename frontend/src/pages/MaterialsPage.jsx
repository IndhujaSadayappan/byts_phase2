'use client';

import { useState } from 'react'
import MainLayout from '../components/MainLayout'
import { BookOpen, FileText, Video, Link as LinkIcon, Download, Search, Filter, Star, Clock, Users } from 'lucide-react'

// Sample Materials Data
const materialsData = [
    {
        id: 1,
        title: 'Data Structures & Algorithms Complete Guide',
        type: 'PDF',
        category: 'DSA',
        company: 'Google',
        author: 'Rahul S.',
        downloads: 1250,
        rating: 4.8,
        uploadedAt: '2024-12-15',
        description: 'Complete DSA guide covering arrays, trees, graphs, dynamic programming with solved problems.',
        icon: FileText,
    },
    {
        id: 2,
        title: 'System Design Interview Preparation',
        type: 'Video',
        category: 'System Design',
        company: 'Amazon',
        author: 'Priya M.',
        downloads: 890,
        rating: 4.9,
        uploadedAt: '2024-12-20',
        description: 'Video series covering scalable system design, load balancing, caching, and microservices.',
        icon: Video,
    },
    {
        id: 3,
        title: 'SQL Interview Questions Bank',
        type: 'Document',
        category: 'Database',
        company: 'Microsoft',
        author: 'Amit K.',
        downloads: 2100,
        rating: 4.7,
        uploadedAt: '2025-01-05',
        description: '200+ SQL questions with solutions for technical interviews at top companies.',
        icon: FileText,
    },
    {
        id: 4,
        title: 'React.js Complete Tutorial',
        type: 'Link',
        category: 'Frontend',
        company: 'Meta',
        author: 'Sneha R.',
        downloads: 750,
        rating: 4.6,
        uploadedAt: '2025-01-10',
        description: 'Comprehensive React tutorial covering hooks, context, Redux, and best practices.',
        icon: LinkIcon,
    },
    {
        id: 5,
        title: 'Aptitude & Reasoning Shortcuts',
        type: 'PDF',
        category: 'Aptitude',
        company: 'TCS',
        author: 'Vijay P.',
        downloads: 3200,
        rating: 4.5,
        uploadedAt: '2025-01-12',
        description: 'Quick formulas and shortcuts for quantitative aptitude and logical reasoning.',
        icon: FileText,
    },
    {
        id: 6,
        title: 'Java OOPs Concepts Explained',
        type: 'Video',
        category: 'Programming',
        company: 'Infosys',
        author: 'Karthik N.',
        downloads: 1800,
        rating: 4.8,
        uploadedAt: '2025-01-15',
        description: 'Deep dive into OOP concepts with real-world examples and interview questions.',
        icon: Video,
    },
]

const categories = ['All', 'DSA', 'System Design', 'Database', 'Frontend', 'Aptitude', 'Programming']

function MaterialsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredMaterials = materialsData.filter((material) => {
        const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            material.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-primary mb-3">Study Materials</h1>
                    <p className="text-gray-600 text-lg">Access curated resources shared by placed students to ace your interviews.</p>
                </div>

                {/* Search & Filter */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary transition"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition ${selectedCategory === category
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-primary">{materialsData.length}</p>
                        <p className="text-sm text-gray-600">Total Resources</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-secondary">{materialsData.reduce((acc, m) => acc + m.downloads, 0).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Downloads</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-accent">15+</p>
                        <p className="text-sm text-gray-600">Companies</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
                        <p className="text-3xl font-bold text-primary">50+</p>
                        <p className="text-sm text-gray-600">Contributors</p>
                    </div>
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMaterials.map((material) => {
                        const Icon = material.icon
                        return (
                            <div
                                key={material.id}
                                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:border-accent transition-all group"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                                        <Icon className="text-white" size={24} />
                                    </div>
                                    <span className="px-3 py-1 bg-background text-primary text-xs font-bold rounded-full">
                                        {material.type}
                                    </span>
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-secondary transition">
                                    {material.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{material.description}</p>

                                {/* Meta Info */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded">
                                        {material.category}
                                    </span>
                                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                                        {material.company}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Star size={14} className="text-yellow-500" />
                                        <span>{material.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Download size={14} />
                                        <span>{material.downloads}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={14} />
                                        <span>{new Date(material.uploadedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                {/* Author & Action */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-500">By {material.author}</p>
                                    <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition">
                                        View
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {filteredMaterials.length === 0 && (
                    <div className="text-center py-16">
                        <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                        <p className="text-gray-500 text-lg">No materials found matching your criteria.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default MaterialsPage
