import { useState, useEffect } from 'react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAthletes: 0,
    totalBrands: 0,
    activeContracts: 0,
    pendingEmails: 0,
    recentActivities: []
  })

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalAthletes: 823,
        totalBrands: 424,
        activeContracts: 156,
        pendingEmails: 23,
        recentActivities: [
          { id: 1, type: 'contract_signed', message: 'Nike signed contract with John Doe', time: '2 hours ago' },
          { id: 2, type: 'user_joined', message: 'New athlete Sarah Wilson joined', time: '4 hours ago' },
          { id: 3, type: 'contract_ending', message: 'Contract between Adidas and Mike Johnson ending in 2 days', time: '6 hours ago' },
          { id: 4, type: 'brand_joined', message: 'New brand Under Armour registered', time: '1 day ago' },
          { id: 5, type: 'contract_ended', message: 'Contract between Puma and Lisa Brown ended', time: '2 days ago' }
        ]
      })
    }, 1000)
  }, [])

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'bg-blue-500' },
    { title: 'Athletes', value: stats.totalAthletes, icon: '🏃‍♂️', color: 'bg-green-500' },
    { title: 'Brands', value: stats.totalBrands, icon: '🏢', color: 'bg-purple-500' },
    { title: 'Active Contracts', value: stats.activeContracts, icon: '📋', color: 'bg-orange-500' },
    { title: 'Pending Emails', value: stats.pendingEmails, icon: '📧', color: 'bg-red-500' }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'contract_signed': return '✅'
      case 'user_joined': return '👋'
      case 'contract_ending': return '⚠️'
      case 'brand_joined': return '🏢'
      case 'contract_ended': return '❌'
      default: return '📝'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'contract_signed': return 'text-green-600'
      case 'user_joined': return 'text-blue-600'
      case 'contract_ending': return 'text-yellow-600'
      case 'brand_joined': return 'text-purple-600'
      case 'contract_ended': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back! Here's what's happening on your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-lg">{stat.icon}</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {stat.value.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-lg mr-3">👤</span>
                <div>
                  <div className="font-medium text-gray-900">Add New User</div>
                  <div className="text-sm text-gray-500">Create athlete or brand account</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-lg mr-3">📧</span>
                <div>
                  <div className="font-medium text-gray-900">Send Support Email</div>
                  <div className="text-sm text-gray-500">Contact users directly</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <span className="text-lg mr-3">📊</span>
                <div>
                  <div className="font-medium text-gray-900">View Reports</div>
                  <div className="text-sm text-gray-500">Platform analytics and insights</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {stats.recentActivities.map((activity, index) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {index !== stats.recentActivities.length - 1 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-900">{activity.message}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contract Status Overview */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contract Status Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-green-600 text-2xl">✅</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Active Contracts</p>
                <p className="text-2xl font-bold text-green-900">156</p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 text-2xl">⏰</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-900">12</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-blue-600 text-2xl">📝</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">Pending Approval</p>
                <p className="text-2xl font-bold text-blue-900">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard