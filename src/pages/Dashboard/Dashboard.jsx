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
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  PlusIcon,
  BellIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  StarIcon,
  FireIcon,
  LightBulbIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import {
  UsersIcon as UsersSolidIcon,
  UserIcon as UserSolidIcon,
  BuildingOfficeIcon as BuildingSolidIcon,
  DocumentTextIcon as DocumentSolidIcon,
  EnvelopeIcon as EnvelopeSolidIcon,
  CheckCircleIcon as CheckSolidIcon,
  ClockIcon as ClockSolidIcon,
  PencilSquareIcon as PencilSolidIcon,
  StarIcon as StarSolidIcon
} from '@heroicons/react/24/solid'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAthletes: 0,
    totalBrands: 0,
    activeContracts: 0,
    pendingEmails: 0,
    recentActivities: [],
    loading: true
  })

  const [timeRange, setTimeRange] = useState('today')

  useEffect(() => {
    // Simulate API call to fetch dashboard data
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalAthletes: 823,
        totalBrands: 424,
        activeContracts: 156,
        pendingEmails: 23,
        loading: false,
        recentActivities: [
          { 
            id: 1, 
            type: 'contract_signed', 
            message: 'Nike signed contract with John Doe', 
            time: '2 hours ago',
            user: 'John Doe',
            amount: '$125,000',
            priority: 'high'
          },
          { 
            id: 2, 
            type: 'user_joined', 
            message: 'New athlete Sarah Wilson joined', 
            time: '4 hours ago',
            user: 'Sarah Wilson',
            priority: 'medium'
          },
          { 
            id: 3, 
            type: 'contract_ending', 
            message: 'Contract between Adidas and Mike Johnson ending in 2 days', 
            time: '6 hours ago',
            user: 'Mike Johnson',
            amount: '$89,500',
            priority: 'high'
          },
          { 
            id: 4, 
            type: 'brand_joined', 
            message: 'New brand Under Armour registered', 
            time: '1 day ago',
            user: 'Under Armour',
            priority: 'medium'
          },
          { 
            id: 5, 
            type: 'contract_ended', 
            message: 'Contract between Puma and Lisa Brown ended', 
            time: '2 days ago',
            user: 'Lisa Brown',
            amount: '$67,200',
            priority: 'low'
          }
        ]
      })
    }, 1500)
  }, [timeRange])

  const statCards = [
    { 
      title: 'Total Users', 
      value: stats.totalUsers, 
      icon: UsersSolidIcon, 
      outlineIcon: UsersIcon,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+12.5%',
      changeType: 'increase',
      description: 'vs last month'
    },
    { 
      title: 'Athletes', 
      value: stats.totalAthletes, 
      icon: UserSolidIcon, 
      outlineIcon: UserIcon,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      change: '+8.2%',
      changeType: 'increase',
      description: 'vs last month'
    },
    { 
      title: 'Brands', 
      value: stats.totalBrands, 
      icon: BuildingSolidIcon, 
      outlineIcon: BuildingOfficeIcon,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+15.3%',
      changeType: 'increase',
      description: 'vs last month'
    },
    { 
      title: 'Active Contracts', 
      value: stats.activeContracts, 
      icon: DocumentSolidIcon, 
      outlineIcon: DocumentTextIcon,
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      change: '+5.7%',
      changeType: 'increase',
      description: 'vs last month'
    },
    { 
      title: 'Pending Emails', 
      value: stats.pendingEmails, 
      icon: EnvelopeSolidIcon, 
      outlineIcon: EnvelopeIcon,
      gradient: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      change: '-3.1%',
      changeType: 'decrease',
      description: 'vs last month'
    }
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
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                   <ChartBarIcon className="h-8 w-8 text-white" />
                 </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Dashboard</h1>
                  <p className="text-blue-100 text-lg">
                    Welcome back! Here's your platform overview
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-white/90">
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Global Platform</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200">
                <BellIcon className="h-6 w-6 text-white" />
              </button>
              <button className="p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200">
                <CogIcon className="h-6 w-6 text-white" />
              </button>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/20 backdrop-blur-sm text-white border-0 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-white/50"
              >
                <option value="today" className="text-gray-900">Today</option>
                <option value="week" className="text-gray-900">This Week</option>
                <option value="month" className="text-gray-900">This Month</option>
                <option value="year" className="text-gray-900">This Year</option>
              </select>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/5 rounded-full"></div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon
          const OutlineIconComponent = stat.outlineIcon
          const TrendIcon = stat.changeType === 'increase' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon
          
          return (
            <div 
              key={index} 
              className={`relative overflow-hidden ${stat.bgColor} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer`}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className={`p-2 ${stat.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                    <OutlineIconComponent className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    {stats.loading ? (
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value.toLocaleString()}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <TrendIcon className={`h-4 w-4 ${
                        stat.changeType === 'increase' ? 'text-emerald-500' : 'text-rose-500'
                      }`} />
                      <span className={`text-sm font-semibold ${
                        stat.changeType === 'increase' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{stat.description}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Quick Actions - Enhanced */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <RocketLaunchIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-xl p-4 transition-all duration-200 border border-blue-100 hover:border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <PlusIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">Add New User</div>
                    <div className="text-sm text-gray-600">Create athlete or brand account</div>
                  </div>
                  <ArrowUpIcon className="h-4 w-4 text-blue-500 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              <button className="w-full group relative overflow-hidden bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 rounded-xl p-4 transition-all duration-200 border border-emerald-100 hover:border-emerald-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <EnvelopeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">Send Support Email</div>
                    <div className="text-sm text-gray-600">Contact users directly</div>
                  </div>
                  <ArrowUpIcon className="h-4 w-4 text-emerald-500 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              <button className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 rounded-xl p-4 transition-all duration-200 border border-purple-100 hover:border-purple-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">View Reports</div>
                    <div className="text-sm text-gray-600">Platform analytics and insights</div>
                  </div>
                  <ArrowUpIcon className="h-4 w-4 text-purple-500 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>

              <button className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl p-4 transition-all duration-200 border border-amber-100 hover:border-amber-200">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <EyeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900 group-hover:text-amber-700 transition-colors">Activity Logs</div>
                    <div className="text-sm text-gray-600">Monitor system activities</div>
                  </div>
                  <ArrowUpIcon className="h-4 w-4 text-amber-500 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <FireIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                </div>
                <button className="text-white/80 hover:text-white text-sm font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <ArrowUpIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {stats.loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentActivities.map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.type)
                    const priorityColors = {
                      high: 'border-red-200 bg-red-50',
                      medium: 'border-yellow-200 bg-yellow-50',
                      low: 'border-green-200 bg-green-50'
                    }
                    
                    return (
                      <div 
                        key={activity.id} 
                        className={`relative p-4 rounded-xl border-2 ${priorityColors[activity.priority]} hover:shadow-md transition-all duration-200 group cursor-pointer`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl shadow-lg ${getActivityColor(activity.type)} bg-white`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                                  {activity.message}
                                </p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs font-medium text-gray-600">
                                    {activity.user}
                                  </span>
                                  {activity.amount && (
                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                                      {activity.amount}
                                    </span>
                                  )}
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {activity.priority}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contract Status Overview - Enhanced */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Contract Status Overview</h3>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <CurrencyDollarIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Total Value: $2.4M</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Active Contracts */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                    <CheckSolidIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-emerald-600">
                      <ArrowTrendingUpIcon className="h-4 w-4" />
                      <span className="text-sm font-semibold">+8.2%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-emerald-800">Active Contracts</p>
                  <p className="text-3xl font-bold text-emerald-900">156</p>
                  <p className="text-xs text-emerald-600 font-medium">$1.8M total value</p>
                </div>
              </div>
            </div>

            {/* Expiring Soon */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-100 hover:border-amber-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                    <ClockSolidIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-amber-600">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      <span className="text-sm font-semibold">Urgent</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-amber-800">Expiring Soon</p>
                  <p className="text-3xl font-bold text-amber-900">12</p>
                  <p className="text-xs text-amber-600 font-medium">Next 30 days</p>
                </div>
              </div>
            </div>

            {/* Pending Approval */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <PencilSolidIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-blue-600">
                      <ClockIcon className="h-4 w-4" />
                      <span className="text-sm font-semibold">Review</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-blue-800">Pending Approval</p>
                  <p className="text-3xl font-bold text-blue-900">8</p>
                  <p className="text-xs text-blue-600 font-medium">Awaiting review</p>
                </div>
              </div>
            </div>

            {/* New Contracts */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border-2 border-purple-100 hover:border-purple-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg">
                    <StarSolidIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-purple-600">
                      <ArrowTrendingUpIcon className="h-4 w-4" />
                      <span className="text-sm font-semibold">+15%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-purple-800">New This Month</p>
                  <p className="text-3xl font-bold text-purple-900">24</p>
                  <p className="text-xs text-purple-600 font-medium">$580K value</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-3">
                  <LightBulbIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Success Rate</h4>
                <p className="text-2xl font-bold text-blue-600">94.2%</p>
                <p className="text-xs text-gray-500">Contract completion</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-3">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Avg. Value</h4>
                <p className="text-2xl font-bold text-emerald-600">$15.4K</p>
                <p className="text-xs text-gray-500">Per contract</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-3">
                  <ClockIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Avg. Duration</h4>
                <p className="text-2xl font-bold text-purple-600">18</p>
                <p className="text-xs text-gray-500">Months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard