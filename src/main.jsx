import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// Layout Components
import Layout from './components/Layout/Layout'
import AuthLayout from './components/Layout/AuthLayout'

// Auth Pages
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import VerifyOTP from './pages/Auth/VerifyOTP'
import ChangePassword from './pages/Auth/ChangePassword'

// Admin Pages
import Dashboard from './pages/Dashboard/Dashboard'
import UserManagement from './pages/UserManagement/UserManagement'
import SupportEmail from './pages/SupportEmail/SupportEmail'
import SubscriptionManagement from './pages/SubscriptionManagement/SubscriptionManagement'
import ActivityLogs from './pages/ActivityLogs/ActivityLogs'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="support-email" element={<SupportEmail />} />
          <Route path="subscriptions" element={<SubscriptionManagement />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
