import { useState, useEffect } from 'react'
import {
  UsersIcon,
  UserIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  HandRaisedIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  ClockIcon,
  PencilSquareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

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
    { title: 'Total Users', value: stats.totalUsers, icon: UsersIcon, color: 'bg-blue-500' },
    { title: 'Athletes', value: stats.totalAthletes, icon: UserIcon, color: 'bg-green-500' },
    { title: 'Brands', value: stats.totalBrands, icon: BuildingOfficeIcon, color: 'bg-purple-500' },
    { title: 'Active Contracts', value: stats.activeContracts, icon: DocumentTextIcon, color: 'bg-orange-500' },
    { title: 'Pending Emails', value: stats.pendingEmails, icon: EnvelopeIcon, color: 'bg-red-500' }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'contract_signed': return CheckCircleIcon
      case 'user_joined': return HandRaisedIcon
      case 'contract_ending': return ExclamationTriangleIcon
      case 'brand_joined': return BuildingOfficeIcon
      case 'contract_ended': return XCircleIcon
      default: return PencilSquareIcon
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
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <div key={index} className="card">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-5 w-5 text-white" />
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
          )
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Add New User</div>
                  <div className="text-sm text-gray-500">Create athlete or brand account</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Send Support Email</div>
                  <div className="text-sm text-gray-500">Contact users directly</div>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 text-gray-600 mr-3" />
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
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-white ${getActivityColor(activity.type)}`}>
                          {(() => {
                            const IconComponent = getActivityIcon(activity.type)
                            return <IconComponent className="h-4 w-4" />
                          })()}
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
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
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
                <ClockIcon className="h-8 w-8 text-yellow-600" />
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
                <PencilSquareIcon className="h-8 w-8 text-blue-600" />
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