import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileQuestion,
    LogOut,
    Menu,
    X
} from 'lucide-react';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/students', name: 'Students', icon: <Users size={20} /> },
        { path: '/admin/placed-students', name: 'Placed Students', icon: <Briefcase size={20} /> },
        { path: '/admin/problems', name: 'Problems', icon: <FileQuestion size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar - Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <span className="text-xl font-bold text-gray-800">PlaceHub Admin</span>
                    <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) => `
                flex items-center px-4 py-3 text-gray-600 rounded-lg transition-colors
                ${isActive ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50 hover:text-gray-900'}
              `}
                        >
                            {item.icon}
                            <span className="ml-3 font-medium">{item.name}</span>
                        </NavLink>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 mt-8 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="ml-3 font-medium">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar for Mobile */}
                <header className="flex items-center justify-between h-16 px-6 bg-white shadow-sm lg:hidden">
                    <button onClick={toggleSidebar} className="text-gray-500">
                        <Menu size={24} />
                    </button>
                    <span className="text-lg font-semibold text-gray-800">Admin Dashboard</span>
                    <div className="w-6"></div> {/* Spacer for centering */}
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
