import React, { useState, useEffect } from 'react'
import { 
  DocumentTextIcon,
  UserPlusIcon,
  ExclamationTriangleIcon,
  UserIcon,
  XMarkIcon,
  ShieldCheckIcon,
  KeyIcon,
  EnvelopeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  EyeIcon,
  LockClosedIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 10

  // Mock data for activity logs
  const mockLogs = [
    {
      id: 1,
      type: 'contract_signed',
      title: 'Contract Signed',
      description: 'Mike signed a new contract with John Doe',
      user: 'John Doe',
      userType: 'admin',
      severity: 'info',
      timestamp: '2024-01-15T10:30:00Z',
      ipAddress: '192.168.1.100',
      relatedEntity: 'Contract #12345'
    },
    {
      id: 2,
      type: 'user_joined',
      title: 'New User Registration',
      description: 'New user Sarah Wilson joined the platform',
      user: 'Sarah Wilson',
      userType: 'user',
      severity: 'info',
      timestamp: '2024-01-15T09:15:00Z',
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      type: 'contract_expiring',
      title: 'Contract Expiring Soon',
      description: 'Contract between Mike and John Doe will expire in 3 days',
      user: 'Mike Johnson',
      userType: 'admin',
      severity: 'warning',
      timestamp: '2024-01-15T08:45:00Z',
      ipAddress: 'system'
    },
    {
      id: 4,
      type: 'brand_joined',
      title: 'New Brand Registration',
      description: 'Under Armour registered as a new brand',
      user: 'Under Armour',
      userType: 'brand',
      severity: 'info',
      timestamp: '2024-01-14T16:20:00Z',
      ipAddress: '192.168.1.102'
    },
    {
      id: 5,
      type: 'contract_ended',
      title: 'Contract Terminated',
      description: 'Contract between Lisa and Under Armour has ended',
      user: 'Lisa Brown',
      userType: 'user',
      severity: 'info',
      timestamp: '2024-01-14T14:30:00Z',
      ipAddress: 'system'
    },
    {
      id: 6,
      type: 'login_failed',
      title: 'Failed Login Attempt',
      description: 'Multiple failed login attempts detected for user account',
      user: 'john@example.com',
      userType: 'user',
      severity: 'error',
      timestamp: '2024-01-14T12:15:00Z',
      ipAddress: '192.168.1.103'
    },
    {
      id: 7,
      type: 'password_changed',
      title: 'Password Changed',
      description: 'User successfully changed their password',
      user: 'Sarah Wilson',
      userType: 'user',
      severity: 'info',
      timestamp: '2024-01-14T11:00:00Z',
      ipAddress: '192.168.1.104'
    },
    {
      id: 8,
      type: 'email_sent',
      title: 'Support Email Sent',
      description: 'Support email sent to address regarding platform updates',
      user: 'Admin',
      userType: 'admin',
      severity: 'info',
      timestamp: '2024-01-14T10:30:00Z',
      ipAddress: '192.168.1.1'
    },
    {
      id: 9,
      type: 'contract_modified',
      title: 'Contract Modified',
      description: 'Contract terms updated for Mike and John Doe partnership',
      user: 'Admin',
      userType: 'admin',
      severity: 'info',
      timestamp: '2024-01-14T09:45:00Z',
      ipAddress: '192.168.1.1'
    },
    {
      id: 10,
      type: 'user_suspended',
      title: 'User Account Suspended',
      description: 'User account temporarily suspended due to policy violation',
      user: 'Admin',
      userType: 'admin',
      severity: 'warning',
      timestamp: '2024-01-13T15:20:00Z',
      ipAddress: '192.168.1.1'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLogs(mockLogs)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = logs

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(log => log.type === typeFilter)
    }

    // Filter by date
    if (dateFilter !== 'all') {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          filterDate.setDate(now.getDate() - 7)
          break
        case 'month':
          filterDate.setDate(now.getDate() - 30)
          break
        default:
          break
      }
      
      if (dateFilter !== 'all') {
        filtered = filtered.filter(log => new Date(log.timestamp) >= filterDate)
      }
    }

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }, [logs, searchTerm, typeFilter, dateFilter])

  // Get icon for log type
  const getLogIcon = (type) => {
    const iconClass = "w-5 h-5"
    switch (type) {
      case 'contract_signed':
        return <DocumentTextIcon className={`${iconClass} text-green-600`} />
      case 'user_joined':
        return <UserPlusIcon className={`${iconClass} text-blue-600`} />
      case 'contract_expiring':
        return <ExclamationTriangleIcon className={`${iconClass} text-yellow-600`} />
      case 'brand_joined':
        return <ChartBarIcon className={`${iconClass} text-purple-600`} />
      case 'contract_ended':
        return <XMarkIcon className={`${iconClass} text-red-600`} />
      case 'login_failed':
        return <LockClosedIcon className={`${iconClass} text-red-600`} />
      case 'password_changed':
        return <KeyIcon className={`${iconClass} text-blue-600`} />
      case 'email_sent':
        return <EnvelopeIcon className={`${iconClass} text-indigo-600`} />
      case 'contract_modified':
        return <PencilIcon className={`${iconClass} text-orange-600`} />
      case 'user_suspended':
        return <ShieldCheckIcon className={`${iconClass} text-red-600`} />
      default:
        return <BellIcon className={`${iconClass} text-gray-600`} />
    }
  }

  // Get severity badge
  const getSeverityBadge = (severity) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full"
    switch (severity) {
      case 'info':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Info</span>
      case 'warning':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Warning</span>
      case 'error':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Error</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unknown</span>
    }
  }

  // Get user type badge
  const getUserTypeBadge = (userType) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-md"
    switch (userType) {
      case 'admin':
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Admin</span>
      case 'user':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>User</span>
      case 'brand':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Brand</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unknown</span>
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    }
  }

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Log type options for filter
  const logTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'contract_signed', label: 'Contract Signed' },
    { value: 'user_joined', label: 'User Joined' },
    { value: 'contract_expiring', label: 'Contract Expiring' },
    { value: 'brand_joined', label: 'Brand Joined' },
    { value: 'contract_ended', label: 'Contract Ended' },
    { value: 'login_failed', label: 'Login Failed' },
    { value: 'password_changed', label: 'Password Changed' },
    { value: 'email_sent', label: 'Email Sent' },
    { value: 'contract_modified', label: 'Contract Modified' },
    { value: 'user_suspended', label: 'User Suspended' }
  ]

  // Calculate stats
  const totalLogs = logs.length
  const infoLogs = logs.filter(log => log.severity === 'info').length
  const warningLogs = logs.filter(log => log.severity === 'warning').length
  const errorLogs = logs.filter(log => log.severity === 'error').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-blue-600" />
              </div>
              Activity Logs
            </h1>
            <p className="text-gray-600 mt-1">Monitor all activities and events on your platform</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowPathIcon className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalLogs}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BellIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Info</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{infoLogs}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{warningLogs}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{errorLogs}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <XMarkIcon className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FunnelIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <CogIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {logTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => {
                setSearchTerm('')
                setTypeFilter('all')
                setDateFilter('all')
              }}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <XMarkIcon className="w-4 h-4" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading activity logs...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">IP Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLogs.map((log) => {
                    const { date, time } = formatTimestamp(log.timestamp)
                    return (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                              {getLogIcon(log.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-gray-900">{log.title}</div>
                              <div className="text-sm text-gray-600 mt-1">{log.description}</div>
                              {log.relatedEntity && (
                                <div className="text-xs text-gray-500 mt-2 bg-gray-100 px-2 py-1 rounded-md inline-block">
                                  Related: {log.relatedEntity}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">{log.user}</div>
                            <div className="mt-2">{getUserTypeBadge(log.userType)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {log.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getSeverityBadge(log.severity)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{date}</div>
                            <div className="text-xs text-gray-500 mt-1">{time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 font-mono text-sm">
                          {log.ipAddress}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {currentLogs.length === 0 && (
                <div className="p-12 text-center">
                  <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No activity logs found matching your criteria.</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-semibold">{indexOfFirstLog + 1}</span> to{' '}
                      <span className="font-semibold">
                        {Math.min(indexOfLastLog, filteredLogs.length)}
                      </span>{' '}
                      of <span className="font-semibold">{filteredLogs.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors ${
                            currentPage === index + 1
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ActivityLogs