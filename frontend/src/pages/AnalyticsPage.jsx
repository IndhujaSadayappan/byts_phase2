'use client';

import MainLayout from '../components/MainLayout'
import { TrendingUp, Users, Building2, Award, BarChart3, PieChart, Target, Calendar } from 'lucide-react'

// Sample Analytics Data
const statsData = {
    totalPlacements: 847,
    companiesVisited: 125,
    averagePackage: 12.5,
    highestPackage: 45,
    placementRate: 87,
    internshipsConverted: 234,
}

const topCompanies = [
    { name: 'Google', placements: 45, avgPackage: 32 },
    { name: 'Microsoft', placements: 38, avgPackage: 28 },
    { name: 'Amazon', placements: 52, avgPackage: 26 },
    { name: 'Goldman Sachs', placements: 28, avgPackage: 24 },
    { name: 'Flipkart', placements: 35, avgPackage: 22 },
    { name: 'Adobe', placements: 22, avgPackage: 20 },
]

const branchWiseStats = [
    { branch: 'CSE', placed: 180, total: 200, percentage: 90 },
    { branch: 'IT', placed: 145, total: 170, percentage: 85 },
    { branch: 'ECE', placed: 120, total: 150, percentage: 80 },
    { branch: 'EEE', placed: 85, total: 110, percentage: 77 },
    { branch: 'ME', placed: 70, total: 100, percentage: 70 },
    { branch: 'AI&DS', placed: 95, total: 100, percentage: 95 },
]

const monthlyTrends = [
    { month: 'Aug', placements: 45 },
    { month: 'Sep', placements: 120 },
    { month: 'Oct', placements: 185 },
    { month: 'Nov', placements: 230 },
    { month: 'Dec', placements: 267 },
]

function AnalyticsPage() {
    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 py-12 bg-background min-h-screen">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-primary mb-3">Placement Analytics</h1>
                    <p className="text-gray-600 text-lg">Insights and statistics from the 2024-25 placement season.</p>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                        <Users className="mx-auto text-primary mb-2" size={28} />
                        <p className="text-3xl font-bold text-primary">{statsData.totalPlacements}</p>
                        <p className="text-xs text-gray-600 font-medium">Students Placed</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                        <Building2 className="mx-auto text-secondary mb-2" size={28} />
                        <p className="text-3xl font-bold text-secondary">{statsData.companiesVisited}</p>
                        <p className="text-xs text-gray-600 font-medium">Companies</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                        <TrendingUp className="mx-auto text-accent mb-2" size={28} />
                        <p className="text-3xl font-bold text-accent">{statsData.averagePackage} LPA</p>
                        <p className="text-xs text-gray-600 font-medium">Avg Package</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                        <Award className="mx-auto text-primary mb-2" size={28} />
                        <p className="text-3xl font-bold text-primary">{statsData.highestPackage} LPA</p>
                        <p className="text-xs text-gray-600 font-medium">Highest Package</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                        <Target className="mx-auto text-secondary mb-2" size={28} />
                        <p className="text-3xl font-bold text-secondary">{statsData.placementRate}%</p>
                        <p className="text-xs text-gray-600 font-medium">Placement Rate</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                        <Calendar className="mx-auto text-accent mb-2" size={28} />
                        <p className="text-3xl font-bold text-accent">{statsData.internshipsConverted}</p>
                        <p className="text-xs text-gray-600 font-medium">Internships</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Top Recruiting Companies */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="text-primary" size={24} />
                            <h2 className="text-xl font-bold text-primary">Top Recruiting Companies</h2>
                        </div>
                        <div className="space-y-4">
                            {topCompanies.map((company, index) => (
                                <div key={company.name} className="flex items-center gap-4">
                                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-gray-800">{company.name}</span>
                                            <span className="text-sm text-gray-600">{company.placements} offers</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full"
                                                style={{ width: `${(company.placements / 60) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-secondary">{company.avgPackage} LPA</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Branch-wise Placement Stats */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <PieChart className="text-secondary" size={24} />
                            <h2 className="text-xl font-bold text-primary">Branch-wise Statistics</h2>
                        </div>
                        <div className="space-y-4">
                            {branchWiseStats.map((branch) => (
                                <div key={branch.branch} className="flex items-center gap-4">
                                    <span className="w-16 font-bold text-primary">{branch.branch}</span>
                                    <div className="flex-1">
                                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-secondary rounded-full transition-all"
                                                style={{ width: `${branch.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 w-20 text-right">
                                        {branch.placed}/{branch.total}
                                    </span>
                                    <span className="text-sm font-bold text-accent w-12">{branch.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Monthly Trends */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="text-accent" size={24} />
                        <h2 className="text-xl font-bold text-primary">Monthly Placement Trends (2024-25)</h2>
                    </div>
                    <div className="flex items-end justify-between gap-4 h-48">
                        {monthlyTrends.map((data) => (
                            <div key={data.month} className="flex-1 flex flex-col items-center">
                                <div className="w-full flex justify-center mb-2">
                                    <span className="text-xs font-bold text-primary">{data.placements}</span>
                                </div>
                                <div
                                    className="w-full max-w-16 bg-primary rounded-t-lg transition-all hover:bg-secondary"
                                    style={{ height: `${(data.placements / 300) * 150}px` }}
                                />
                                <span className="mt-2 text-sm font-medium text-gray-600">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default AnalyticsPage
