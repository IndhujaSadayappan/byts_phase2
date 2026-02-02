import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Users,
    Briefcase,
    FileQuestion,
    TrendingUp,
    UserCheck
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStudents: 0,
        totalPlacedStudents: 0,
        totalProblems: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: <Users size={24} className="text-blue-600" />,
            color: 'bg-blue-100',
            nav: '/admin/students' // Or generic users if implemented
        },
        {
            title: 'Total Students',
            value: stats.totalStudents,
            icon: <UserCheck size={24} className="text-green-600" />,
            color: 'bg-green-100',
            nav: '/admin/students'
        },
        {
            title: 'Placed Students',
            value: stats.totalPlacedStudents,
            icon: <Briefcase size={24} className="text-purple-600" />,
            color: 'bg-purple-100',
            nav: '/admin/placed-students'
        },
        {
            title: 'Problems Uploaded',
            value: stats.totalProblems,
            icon: <FileQuestion size={24} className="text-orange-600" />,
            color: 'bg-orange-100',
            nav: '/admin/problems'
        },
    ];

    const barData = [
        { name: 'Students', count: stats.totalStudents },
        { name: 'Placed', count: stats.totalPlacedStudents },
        { name: 'Problems', count: stats.totalProblems },
    ];

    const pieData = [
        { name: 'Placed', value: stats.totalPlacedStudents },
        { name: 'Unplaced', value: stats.totalStudents - stats.totalPlacedStudents },
    ];

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

    if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(card.nav)}
                        className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{card.title}</p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${card.color}`}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Platform Activity</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Placement Status</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
