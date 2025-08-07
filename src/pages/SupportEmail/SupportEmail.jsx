import { useState, useEffect } from 'react'

const SupportEmail = () => {
  const [users, setUsers] = useState([])
  const [emailData, setEmailData] = useState({
    recipients: [],
    recipientType: 'specific', // specific, all_athletes, all_brands, all_users
    subject: '',
    message: '',
    priority: 'normal'
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
        message: '',
        priority: 'normal'
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Email</h1>
        <p className="mt-1 text-sm text-gray-600">
          Send support emails to users on your platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Compose Email</h3>
            
            <form onSubmit={handleSendEmail} className="space-y-4">
              {/* Recipient Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send To
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleRecipientTypeChange('specific')}
                    className={`p-3 text-sm rounded-lg border ${
                      emailData.recipientType === 'specific'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Specific Users
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRecipientTypeChange('all_users')}
                    className={`p-3 text-sm rounded-lg border ${
                      emailData.recipientType === 'all_users'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Users
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRecipientTypeChange('all_athletes')}
                    className={`p-3 text-sm rounded-lg border ${
                      emailData.recipientType === 'all_athletes'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Athletes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRecipientTypeChange('all_brands')}
                    className={`p-3 text-sm rounded-lg border ${
                      emailData.recipientType === 'all_brands'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    All Brands
                  </button>
                </div>
              </div>

              {/* User Selection */}
              {emailData.recipientType === 'specific' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Recipients
                  </label>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="input-field mb-3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          selectedUsers.find(u => u.id === user.id) ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleUserSelect(user)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.type === 'athlete' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {user.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedUsers.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Selected: {selectedUsers.map(u => u.name).join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Recipients Summary */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Recipients:</span> {getRecipientsList()}
                </p>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  className="input-field"
                  value={emailData.priority}
                  onChange={(e) => setEmailData({...emailData, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter email subject"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={8}
                  className="input-field"
                  placeholder="Enter your message here..."
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                />
              </div>

              {/* Send Button */}
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading || (emailData.recipientType === 'specific' && selectedUsers.length === 0)}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Email'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmailData({
                      recipients: [],
                      recipientType: 'specific',
                      subject: '',
                      message: '',
                      priority: 'normal'
                    })
                    setSelectedUsers([])
                  }}
                  className="btn-secondary"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Email Templates */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h3>
            <div className="space-y-2">
              {emailTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => loadTemplate(template)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <p className="font-medium text-gray-900">{template.name}</p>
                  <p className="text-sm text-gray-600 truncate">{template.subject}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Email History */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Emails</h3>
            <div className="space-y-3">
              {emailHistory.slice(0, 5).map((email) => (
                <div key={email.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <p className="font-medium text-gray-900 text-sm">{email.subject}</p>
                  <p className="text-xs text-gray-600">{email.recipients}</p>
                  <p className="text-xs text-gray-500">{email.sentDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportEmail