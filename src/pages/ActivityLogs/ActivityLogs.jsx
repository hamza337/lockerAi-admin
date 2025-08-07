import { useState, useEffect } from 'react'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(20)

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    filterLogs()
  }, [logs, searchTerm, typeFilter, dateFilter])

  const fetchLogs = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockLogs = [
        {
          id: 1,
          type: 'contract_signed',
          title: 'Contract Signed',
          description: 'Nike signed a new contract with John Doe',
          user: 'John Doe',
          userType: 'athlete',
          relatedEntity: 'Nike Inc',
          timestamp: '2024-01-20T14:30:00Z',
          ipAddress: '192.168.1.100',
          severity: 'info'
        },
        {
          id: 2,
          type: 'user_joined',
          title: 'New User Registration',
          description: 'New athlete Sarah Wilson joined the platform',
          user: 'Sarah Wilson',
          userType: 'athlete',
          relatedEntity: null,
          timestamp: '2024-01-20T12:15:00Z',
          ipAddress: '192.168.1.101',
          severity: 'info'
        },
        {
          id: 3,
          type: 'contract_ending',
          title: 'Contract Expiring Soon',
          description: 'Contract between Adidas and Mike Johnson will expire in 3 days',
          user: 'Mike Johnson',
          userType: 'athlete',
          relatedEntity: 'Adidas',
          timestamp: '2024-01-20T10:00:00Z',
          ipAddress: 'system',
          severity: 'warning'
        },
        {
          id: 4,
          type: 'brand_joined',
          title: 'New Brand Registration',
          description: 'Under Armour registered as a new brand',
          user: 'Under Armour',
          userType: 'brand',
          relatedEntity: null,
          timestamp: '2024-01-19T16:45:00Z',
          ipAddress: '192.168.1.102',
          severity: 'info'
        },
        {
          id: 5,
          type: 'contract_ended',
          title: 'Contract Terminated',
          description: 'Contract between Puma and Lisa Brown has ended',
          user: 'Lisa Brown',
          userType: 'athlete',
          relatedEntity: 'Puma',
          timestamp: '2024-01-19T14:20:00Z',
          ipAddress: 'system',
          severity: 'info'
        },
        {
          id: 6,
          type: 'login_failed',
          title: 'Failed Login Attempt',
          description: 'Multiple failed login attempts detected for user account',
          user: 'john@example.com',
          userType: 'athlete',
          relatedEntity: null,
          timestamp: '2024-01-19T11:30:00Z',
          ipAddress: '192.168.1.103',
          severity: 'error'
        },
        {
          id: 7,
          type: 'password_changed',
          title: 'Password Changed',
          description: 'User successfully changed their password',
          user: 'Sarah Wilson',
          userType: 'athlete',
          relatedEntity: null,
          timestamp: '2024-01-19T09:15:00Z',
          ipAddress: '192.168.1.104',
          severity: 'info'
        },
        {
          id: 8,
          type: 'email_sent',
          title: 'Support Email Sent',
          description: 'Support email sent to all athletes regarding platform updates',
          user: 'Admin',
          userType: 'admin',
          relatedEntity: 'All Athletes',
          timestamp: '2024-01-18T15:00:00Z',
          ipAddress: '192.168.1.1',
          severity: 'info'
        },
        {
          id: 9,
          type: 'contract_modified',
          title: 'Contract Modified',
          description: 'Contract terms updated for Nike and John Doe partnership',
          user: 'Admin',
          userType: 'admin',
          relatedEntity: 'Nike Inc',
          timestamp: '2024-01-18T13:45:00Z',
          ipAddress: '192.168.1.1',
          severity: 'info'
        },
        {
          id: 10,
          type: 'user_suspended',
          title: 'User Account Suspended',
          description: 'User account temporarily suspended due to policy violation',
          user: 'Admin',
          userType: 'admin',
          relatedEntity: 'test@example.com',
          timestamp: '2024-01-18T11:20:00Z',
          ipAddress: '192.168.1.1',
          severity: 'warning'
        }
      ]
      setLogs(mockLogs)
      setLoading(false)
    }, 1000)
  }

  const filterLogs = () => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(log => log.type === typeFilter)
    }

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
          filterDate.setMonth(now.getMonth() - 1)
          break
        default:
          filterDate = null
      }

      if (filterDate) {
        filtered = filtered.filter(log => new Date(log.timestamp) >= filterDate)
      }
    }

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }

  const getLogIcon = (type) => {
    const icons = {
      contract_signed: '✅',
      user_joined: '👋',
      contract_ending: '⚠️',
      brand_joined: '🏢',
      contract_ended: '❌',
      login_failed: '🚫',
      password_changed: '🔑',
      email_sent: '📧',
      contract_modified: '📝',
      user_suspended: '⛔',
      default: '📝'
    }
    return icons[type] || icons.default
  }

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      info: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Info' },
      warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Warning' },
      error: { bg: 'bg-red-100', text: 'text-red-800', label: 'Error' },
      success: { bg: 'bg-green-100', text: 'text-green-800', label: 'Success' }
    }
    
    const config = severityConfig[severity] || severityConfig.info
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getUserTypeBadge = (userType) => {
    const typeConfig = {
      athlete: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🏃‍♂️' },
      brand: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🏢' },
      admin: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '👨‍💼' }
    }
    
    const config = typeConfig[userType] || typeConfig.admin
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.icon} {userType}
      </span>
    )
  }

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

  const logTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'contract_signed', label: 'Contract Signed' },
    { value: 'contract_ended', label: 'Contract Ended' },
    { value: 'contract_ending', label: 'Contract Expiring' },
    { value: 'contract_modified', label: 'Contract Modified' },
    { value: 'user_joined', label: 'User Joined' },
    { value: 'brand_joined', label: 'Brand Joined' },
    { value: 'login_failed', label: 'Login Failed' },
    { value: 'password_changed', label: 'Password Changed' },
    { value: 'email_sent', label: 'Email Sent' },
    { value: 'user_suspended', label: 'User Suspended' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
        <p className="mt-1 text-sm text-gray-600">
          Monitor all activities and events on your platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📊</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Logs</dt>
                <dd className="text-lg font-semibold text-gray-900">{logs.length}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">ℹ️</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Info</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {logs.filter(log => log.severity === 'info').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Warnings</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {logs.filter(log => log.severity === 'warning').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">❌</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Errors</dt>
                <dd className="text-lg font-semibold text-gray-900">
                  {logs.filter(log => log.severity === 'error').length}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search logs..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="input-field"
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
          <div>
            <select
              className="input-field"
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
              className="btn-secondary w-full"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="card p-0">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading activity logs...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">Activity</th>
                    <th className="table-header">User</th>
                    <th className="table-header">Type</th>
                    <th className="table-header">Severity</th>
                    <th className="table-header">Timestamp</th>
                    <th className="table-header">IP Address</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLogs.map((log) => {
                    const { date, time } = formatTimestamp(log.timestamp)
                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="table-cell">
                          <div className="flex items-start space-x-3">
                            <span className="text-lg">{getLogIcon(log.type)}</span>
                            <div>
                              <div className="font-medium text-gray-900">{log.title}</div>
                              <div className="text-sm text-gray-600">{log.description}</div>
                              {log.relatedEntity && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Related: {log.relatedEntity}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <div>
                            <div className="font-medium text-gray-900">{log.user}</div>
                            <div className="mt-1">{getUserTypeBadge(log.userType)}</div>
                          </div>
                        </td>
                        <td className="table-cell">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {log.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="table-cell">{getSeverityBadge(log.severity)}</td>
                        <td className="table-cell">
                          <div>
                            <div className="text-sm text-gray-900">{date}</div>
                            <div className="text-xs text-gray-500">{time}</div>
                          </div>
                        </td>
                        <td className="table-cell text-gray-600 font-mono text-sm">
                          {log.ipAddress}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {currentLogs.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No activity logs found matching your criteria.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastLog, filteredLogs.length)}
                      </span>{' '}
                      of <span className="font-medium">{filteredLogs.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
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
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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