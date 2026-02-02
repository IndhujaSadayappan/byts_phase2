import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import ProfileSetupPage from './pages/ProfileSetupPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ShareExperienceLanding from './pages/ShareExperienceLanding.jsx'
import ExperienceMetadataForm from './pages/ExperienceMetadataForm.jsx'
import ExperienceRoundsForm from './pages/ExperienceRoundsForm.jsx'
import ExperienceMaterialsForm from './pages/ExperienceMaterialsForm.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import useIdleTimeout from './hooks/useIdleTimeout.js'

// Admin Imports
import AdminLogin from './pages/AdminLogin.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import DashboardHome from './pages/admin/DashboardHome.jsx'
import StudentsList from './pages/admin/StudentsList.jsx'
import PlacedStudentsList from './pages/admin/PlacedStudentsList.jsx'
import StudentDetail from './pages/admin/StudentDetail.jsx'
import ProblemList from './pages/admin/ProblemList.jsx'
import ProblemDetail from './pages/admin/ProblemDetail.jsx'

function AppContent() {
  // Auto-logout after 2 minutes of inactivity
  useIdleTimeout(2 * 60 * 1000);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route
        path="/profile-setup"
        element={<ProtectedRoute><ProfileSetupPage /></ProtectedRoute>}
      />
      <Route
        path="/home"
        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}
      />
      <Route
        path="/share-experience"
        element={<ProtectedRoute><ShareExperienceLanding /></ProtectedRoute>}
      />
      <Route
        path="/share-experience/metadata"
        element={<ProtectedRoute><ExperienceMetadataForm /></ProtectedRoute>}
      />
      <Route
        path="/share-experience/rounds"
        element={<ProtectedRoute><ExperienceRoundsForm /></ProtectedRoute>}
      />
      <Route
        path="/share-experience/materials"
        element={<ProtectedRoute><ExperienceMaterialsForm /></ProtectedRoute>}
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardHome />} />
        <Route path="students" element={<StudentsList />} />
        <Route path="students/:id" element={<StudentDetail />} />
        <Route path="placed-students" element={<PlacedStudentsList />} />
        <Route path="placed-students/:id" element={<StudentDetail />} />
        <Route path="problems" element={<ProblemList />} />
        <Route path="problems/:id" element={<ProblemDetail />} />
      </Route>

      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
