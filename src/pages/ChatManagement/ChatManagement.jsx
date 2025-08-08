import { useState, useEffect } from 'react'
import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  UserIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  PhotoIcon,
  PaperClipIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import {
  ChatBubbleLeftRightIcon as ChatSolidIcon,
  UserIcon as UserSolidIcon,
  BuildingOfficeIcon as BuildingSolidIcon
} from '@heroicons/react/24/solid'

const ChatManagement = () => {
  const [conversations, setConversations] = useState([])
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showChatModal, setShowChatModal] = useState(false)

  // Mock data for conversations
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        brand: { name: 'Nike Sports', avatar: 'NS', email: 'partnerships@nike.com' },
        athlete: { name: 'Marcus Johnson', avatar: 'MJ', email: 'marcus.j@email.com', sport: 'Basketball' },
        lastMessage: 'Looking forward to discussing the partnership details...',
        lastMessageTime: '2 hours ago',
        status: 'active',
        unreadCount: 3,
        totalMessages: 47,
        startDate: '2024-01-15',
        contractValue: '$125,000',
        priority: 'high'
      },
      {
        id: 2,
        brand: { name: 'Adidas Performance', avatar: 'AP', email: 'talent@adidas.com' },
        athlete: { name: 'Sarah Williams', avatar: 'SW', email: 'sarah.w@email.com', sport: 'Tennis' },
        lastMessage: 'The campaign timeline looks perfect for our schedule.',
        lastMessageTime: '5 hours ago',
        status: 'pending',
        unreadCount: 0,
        totalMessages: 23,
        startDate: '2024-01-20',
        contractValue: '$85,000',
        priority: 'medium'
      },
      {
        id: 3,
        brand: { name: 'Under Armour', avatar: 'UA', email: 'partnerships@underarmour.com' },
        athlete: { name: 'David Chen', avatar: 'DC', email: 'david.c@email.com', sport: 'Swimming' },
        lastMessage: 'Thank you for the revised contract terms.',
        lastMessageTime: '1 day ago',
        status: 'completed',
        unreadCount: 0,
        totalMessages: 156,
        startDate: '2023-12-01',
        contractValue: '$200,000',
        priority: 'high'
      },
      {
        id: 4,
        brand: { name: 'Puma Elite', avatar: 'PE', email: 'elite@puma.com' },
        athlete: { name: 'Emma Rodriguez', avatar: 'ER', email: 'emma.r@email.com', sport: 'Soccer' },
        lastMessage: 'Can we schedule a call to discuss the photo shoot?',
        lastMessageTime: '3 days ago',
        status: 'active',
        unreadCount: 1,
        totalMessages: 34,
        startDate: '2024-01-10',
        contractValue: '$95,000',
        priority: 'medium'
      },
      {
        id: 5,
        brand: { name: 'New Balance', avatar: 'NB', email: 'athletes@newbalance.com' },
        athlete: { name: 'Alex Thompson', avatar: 'AT', email: 'alex.t@email.com', sport: 'Running' },
        lastMessage: 'The product samples have been shipped to your address.',
        lastMessageTime: '1 week ago',
        status: 'inactive',
        unreadCount: 0,
        totalMessages: 89,
        startDate: '2023-11-15',
        contractValue: '$150,000',
        priority: 'low'
      }
    ]

    setTimeout(() => {
      setConversations(mockConversations)
      setLoading(false)
    }, 1000)
  }, [])

  // Mock chat messages for selected conversation
  const mockChatMessages = [
    {
      id: 1,
      sender: 'brand',
      message: 'Hi Marcus! We\'re excited about the possibility of working together.',
      timestamp: '2024-01-15 10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'athlete',
      message: 'Thank you for reaching out! I\'m definitely interested in learning more.',
      timestamp: '2024-01-15 11:15 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'brand',
      message: 'Great! We have a campaign coming up that would be perfect for your profile.',
      timestamp: '2024-01-15 11:45 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'brand',
      message: 'Here\'s the initial contract draft for your review.',
      timestamp: '2024-01-15 02:30 PM',
      type: 'file',
      fileName: 'Nike_Partnership_Contract_Draft.pdf'
    },
    {
      id: 5,
      sender: 'athlete',
      message: 'I\'ve reviewed the contract. The terms look good overall, but I have a few questions about the exclusivity clause.',
      timestamp: '2024-01-16 09:20 AM',
      type: 'text'
    },
    {
      id: 6,
      sender: 'brand',
      message: 'Of course! Let\'s schedule a call to discuss any concerns you have.',
      timestamp: '2024-01-16 10:45 AM',
      type: 'text'
    },
    {
      id: 7,
      sender: 'athlete',
      message: 'Perfect! I\'m available tomorrow afternoon or Thursday morning.',
      timestamp: '2024-01-16 11:30 AM',
      type: 'text'
    },
    {
      id: 8,
      sender: 'brand',
      message: 'Thursday morning works great. I\'ll send you a calendar invite.',
      timestamp: '2024-01-16 12:15 PM',
      type: 'text'
    }
  ]

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const openChatModal = (conversation) => {
    setSelectedConversation(conversation)
    setShowChatModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <ChatSolidIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Chat Management</h1>
              <p className="text-indigo-100 mt-1">Monitor brand-athlete communications</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{conversations.length}</div>
              <div className="text-sm">Total Chats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {conversations.filter(c => c.status === 'active').length}
              </div>
              <div className="text-sm">Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by brand or athlete name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              onClick={() => setLoading(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredConversations.length} conversation(s) found
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading conversations...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-6 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(conversation.priority)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Brand Info */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{conversation.brand.avatar}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{conversation.brand.name}</p>
                        <p className="text-xs text-gray-500">{conversation.brand.email}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-400" />
                    </div>

                    {/* Athlete Info */}
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{conversation.athlete.avatar}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{conversation.athlete.name}</p>
                        <p className="text-xs text-gray-500">{conversation.athlete.sport} • {conversation.athlete.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Conversation Details */}
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-900 font-medium">{conversation.contractValue}</p>
                      <p className="text-xs text-gray-500">{conversation.totalMessages} messages</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                        {conversation.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{conversation.lastMessageTime}</p>
                    </div>
                    <button
                      onClick={() => openChatModal(conversation)}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Chat</span>
                    </button>
                  </div>
                </div>

                {/* Last Message Preview */}
                <div className="mt-4 pl-16">
                  <p className="text-sm text-gray-600 italic">"{conversation.lastMessage}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {showChatModal && selectedConversation && (
        <div 
          className="fixed inset-0 overflow-y-auto h-full w-full z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)'
          }}
          onClick={() => setShowChatModal(false)}
        >
          {/* Modal Container */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="relative bg-white rounded-lg shadow-2xl ring-1 ring-black ring-opacity-5 max-w-4xl w-full max-h-[90vh] overflow-hidden z-50 transform transition-all duration-300 scale-100 opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{selectedConversation.brand.avatar}</span>
                      </div>
                      <span className="text-white font-medium">{selectedConversation.brand.name}</span>
                    </div>
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-white/70" />
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{selectedConversation.athlete.avatar}</span>
                      </div>
                      <span className="text-white font-medium">{selectedConversation.athlete.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-gray-50 px-6 py-4 h-96 overflow-y-auto">
                <div className="space-y-4">
                  {mockChatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'brand' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'brand'
                          ? 'bg-white border border-gray-200'
                          : 'bg-indigo-600 text-white'
                      }`}>
                        {message.type === 'file' ? (
                          <div className="flex items-center space-x-2">
                            <PaperClipIcon className="h-4 w-4" />
                            <span className="text-sm font-medium">{message.fileName}</span>
                          </div>
                        ) : (
                          <p className="text-sm">{message.message}</p>
                        )}
                        <p className={`text-xs mt-1 ${
                          message.sender === 'brand' ? 'text-gray-500' : 'text-indigo-200'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Read-only mode:</span> This conversation is view-only for administrative purposes.
                  </div>
                  <button
                    onClick={() => setShowChatModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatManagement