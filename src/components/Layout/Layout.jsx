import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChartBarIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navigationSections = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', href: '/', icon: ChartBarIcon },
      ]
    },
    {
      title: 'Management',
      items: [
        { name: 'User Management', href: '/users', icon: UsersIcon },
        { name: 'Chat Management', href: '/chats', icon: ChatBubbleLeftRightIcon },
        { name: 'Subscriptions', href: '/subscriptions', icon: CreditCardIcon },
      ]
    },
    {
      title: 'Administration',
      items: [
        { name: 'Support Email', href: '/support-email', icon: EnvelopeIcon },
        { name: 'Activity Logs', href: '/activity-logs', icon: ClipboardDocumentListIcon },
      ]
    }
  ]

  const handleLogout = () => {
    // Add logout logic here
    navigate('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900">LockerAI Admin</h1>
            </div>
            <nav className="mt-5 px-2">
              {navigationSections.map((section, sectionIndex) => (
                <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                  <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            location.pathname === item.href
                              ? 'bg-blue-100 text-blue-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <IconComponent className="mr-3 h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <h1 className="text-xl font-bold text-gray-900"><i>LockerAI Admin</i></h1>
            </div>
            <nav className="mt-5 flex-1 px-2">
              {navigationSections.map((section, sectionIndex) => (
                <div key={section.title} className={sectionIndex > 0 ? 'mt-6' : ''}>
                  <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            location.pathname === item.href
                              ? 'bg-blue-100 text-blue-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <IconComponent className="mr-3 h-5 w-5" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" />
            </button>
            
            <div className="flex-1"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin User</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="ml-4 text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout