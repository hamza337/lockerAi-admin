import { useState, useEffect } from 'react'
import { 
  PaperAirplaneIcon, 
  UserGroupIcon, 
  UsersIcon, 
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const SupportEmail = () => {
  const [users, setUsers] = useState([])
  const [emailData, setEmailData] = useState({
    recipients: [],
    recipientType: 'specific', // specific, all_athletes, all_brands, all_users
    subject: '',
    message: ''
  })
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailHistory, setEmailHistory] = useState([])

  useEffect(() => {
    fetchUsers()
    fetchEmailHistory()
  }, [])

  const fetchUsers = async () => {
    // Simulate API call
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', type: 'athlete' },
      { id: 2, name: 'Nike Inc', email: 'contact@nike.com', type: 'brand' },
      { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', type: 'athlete' },
      { id: 4, name: 'Adidas', email: 'info@adidas.com', type: 'brand' },
      { id: 5, name: 'Mike Johnson', email: 'mike@example.com', type: 'athlete' }
    ]
    setUsers(mockUsers)
  }

  const fetchEmailHistory = async () => {
    // Simulate API call
    const mockHistory = [
      {
        id: 1,
        subject: 'Platform Update Notification',
        recipients: 'All Users',
        sentDate: '2024-01-20',
        status: 'sent'
      },
      {
        id: 2,
        subject: 'Contract Renewal Reminder',
        recipients: 'John Doe, Sarah Wilson',
        sentDate: '2024-01-19',
        status: 'sent'
      },
      {
        id: 3,
        subject: 'Welcome to LockerAI',
        recipients: 'Nike Inc',
        sentDate: '2024-01-18',
        status: 'sent'
      }
    ]
    setEmailHistory(mockHistory)
  }

  const handleRecipientTypeChange = (type) => {
    setEmailData({ ...emailData, recipientType: type, recipients: [] })
    setSelectedUsers([])
  }

  const handleUserSelect = (user) => {
    const isSelected = selectedUsers.find(u => u.id === user.id)
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const getRecipientsList = () => {
    switch (emailData.recipientType) {
      case 'all_users':
        return 'All Users'
      case 'all_athletes':
        return 'All Athletes'
      case 'all_brands':
        return 'All Brands'
      case 'specific':
        return selectedUsers.length > 0 
          ? selectedUsers.map(u => u.name).join(', ')
          : 'No users selected'
      default:
        return ''
    }
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newEmail = {
        id: emailHistory.length + 1,
        subject: emailData.subject,
        recipients: getRecipientsList(),
        sentDate: new Date().toISOString().split('T')[0],
        status: 'sent'
      }
      
      setEmailHistory([newEmail, ...emailHistory])
      setEmailData({
        recipients: [],
        recipientType: 'specific',
        subject: '',
        message: ''
      })
      setSelectedUsers([])
      setLoading(false)
      alert('Email sent successfully!')
    }, 2000)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const emailTemplates = [
    {
      name: 'Welcome Message',
      subject: 'Welcome to LockerAI Platform',
      message: 'Welcome to LockerAI! We\'re excited to have you on our platform. Here\'s everything you need to know to get started...'
    },
    {
      name: 'Contract Reminder',
      subject: 'Contract Renewal Reminder',
      message: 'This is a friendly reminder that your contract is approaching its renewal date. Please review the terms and contact us if you have any questions...'
    },
    {
      name: 'Platform Update',
      subject: 'Important Platform Updates',
      message: 'We\'ve made some exciting updates to the platform that will enhance your experience. Here\'s what\'s new...'
    }
  ]

  const loadTemplate = (template) => {
    setEmailData({
      ...emailData,
      subject: template.subject,
      message: template.message
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <PaperAirplaneIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Support Email</h1>
              <p className="text-sm text-gray-600">
                Send support emails to users on your platform
              </p>
            </div>
          </div>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email Composer */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Compose Email</h3>
              
              <form onSubmit={handleSendEmail} className="space-y-6">
                {/* Recipient Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Send To
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleRecipientTypeChange('specific')}
                      className={`flex items-center justify-center p-4 text-sm font-medium rounded-lg border transition-all ${
                        emailData.recipientType === 'specific'
                          ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      Specific Users
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRecipientTypeChange('all_users')}
                      className={`flex items-center justify-center p-4 text-sm font-medium rounded-lg border transition-all ${
                        emailData.recipientType === 'all_users'
                          ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <UsersIcon className="w-5 h-5 mr-2" />
                      All Users
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRecipientTypeChange('all_athletes')}
                      className={`flex items-center justify-center p-4 text-sm font-medium rounded-lg border transition-all ${
                        emailData.recipientType === 'all_athletes'
                          ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <UserGroupIcon className="w-5 h-5 mr-2" />
                      All Athletes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRecipientTypeChange('all_brands')}
                      className={`flex items-center justify-center p-4 text-sm font-medium rounded-lg border transition-all ${
                        emailData.recipientType === 'all_brands'
                          ? 'bg-blue-50 border-blue-200 text-blue-700 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                      All Brands
                    </button>
                  </div>
                </div>

                {/* User Selection */}
                {emailData.recipientType === 'specific' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Recipients
                    </label>
                    <div className="relative mb-4">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <div
                            key={user.id}
                            className={`p-4 border-b border-gray-200 last:border-b-0 cursor-pointer transition-colors ${
                              selectedUsers.find(u => u.id === user.id) 
                                ? 'bg-blue-50 border-blue-200' 
                                : 'bg-white hover:bg-gray-50'
                            }`}
                            onClick={() => handleUserSelect(user)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                  user.type === 'athlete' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-purple-100 text-purple-800'
                                }`}>
                                  {user.type}
                                </span>
                                {selectedUsers.find(u => u.id === user.id) && (
                                  <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No users found</p>
                        </div>
                      )}
                    </div>
                    {selectedUsers.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-blue-900">
                            {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                          </p>
                          <button
                            type="button"
                            onClick={() => setSelectedUsers([])}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Clear all
                          </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedUsers.map(user => (
                            <span
                              key={user.id}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {user.name}
                              <button
                                type="button"
                                onClick={() => handleUserSelect(user)}
                                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                              >
                                <XMarkIcon className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Recipients Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <UsersIcon className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-medium text-blue-900">
                      Recipients: <span className="font-normal">{getRecipientsList()}</span>
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Enter email subject"
                    value={emailData.subject}
                    onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={10}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                    placeholder="Enter your message here..."
                    value={emailData.message}
                    onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  />
                </div>

                {/* Send Button */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading || (emailData.recipientType === 'specific' && selectedUsers.length === 0)}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                        Send Email
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailData({
                        recipients: [],
                        recipientType: 'specific',
                        subject: '',
                        message: ''
                      })
                      setSelectedUsers([])
                    }}
                    className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Email Templates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <DocumentTextIcon className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
              </div>
              <div className="space-y-2">
                {emailTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => loadTemplate(template)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                  >
                    <p className="font-medium text-gray-900 group-hover:text-blue-700">{template.name}</p>
                    <p className="text-sm text-gray-600 truncate mt-1">{template.subject}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Email History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ClockIcon className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Emails</h3>
              </div>
              <div className="space-y-4">
                {emailHistory.slice(0, 5).map((email) => (
                  <div key={email.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <p className="font-medium text-gray-900 text-sm mb-1">{email.subject}</p>
                    <p className="text-xs text-gray-600 mb-1">{email.recipients}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{email.sentDate}</p>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                        Sent
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportEmail