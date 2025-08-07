import { useState, useEffect } from 'react'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('create') // create, edit, delete, changePassword
  const [selectedUser, setSelectedUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'athlete',
    status: 'active',
    password: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm, filterType])

  const fetchUsers = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', type: 'athlete', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-01-20' },
        { id: 2, name: 'Nike Inc', email: 'contact@nike.com', type: 'brand', status: 'active', joinDate: '2024-01-10', lastLogin: '2024-01-19' },
        { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com', type: 'athlete', status: 'inactive', joinDate: '2024-01-12', lastLogin: '2024-01-18' },
        { id: 4, name: 'Adidas', email: 'info@adidas.com', type: 'brand', status: 'active', joinDate: '2024-01-08', lastLogin: '2024-01-20' },
        { id: 5, name: 'Mike Johnson', email: 'mike@example.com', type: 'athlete', status: 'active', joinDate: '2024-01-14', lastLogin: '2024-01-17' }
      ]
      setUsers(mockUsers)
      setLoading(false)
    }, 1000)
  }

  const filterUsers = () => {
    let filtered = users

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(user => user.type === filterType)
    }

    setFilteredUsers(filtered)
  }

  const handleCreateUser = () => {
    setModalType('create')
    setFormData({ name: '', email: '', type: 'athlete', status: 'active', password: '' })
    setShowModal(true)
  }

  const handleEditUser = (user) => {
    setModalType('edit')
    setSelectedUser(user)
    setFormData({ ...user, password: '' })
    setShowModal(true)
  }

  const handleDeleteUser = (user) => {
    setModalType('delete')
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleChangePassword = (user) => {
    setModalType('changePassword')
    setSelectedUser(user)
    setFormData({ ...user, password: '', confirmPassword: '' })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (modalType === 'create') {
      const newUser = {
        id: users.length + 1,
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: 'Never'
      }
      setUsers([...users, newUser])
    } else if (modalType === 'edit') {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      ))
    } else if (modalType === 'delete') {
      setUsers(users.filter(user => user.id !== selectedUser.id))
    } else if (modalType === 'changePassword') {
      // Password change logic would go here
      alert('Password changed successfully!')
    }

    setShowModal(false)
    setSelectedUser(null)
  }

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
      : <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Inactive</span>
  }

  const getTypeBadge = (type) => {
    return type === 'athlete'
      ? <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">🏃‍♂️ Athlete</span>
      : <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">🏢 Brand</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage athletes and brands on your platform
          </p>
        </div>
        <button
          onClick={handleCreateUser}
          className="btn-primary"
        >
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users by name or email..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="input-field"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Users</option>
              <option value="athlete">Athletes Only</option>
              <option value="brand">Brands Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card p-0">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading users...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Join Date</th>
                  <th className="table-header">Last Login</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="table-cell font-medium">{user.name}</td>
                    <td className="table-cell text-gray-600">{user.email}</td>
                    <td className="table-cell">{getTypeBadge(user.type)}</td>
                    <td className="table-cell">{getStatusBadge(user.status)}</td>
                    <td className="table-cell text-gray-600">{user.joinDate}</td>
                    <td className="table-cell text-gray-600">{user.lastLogin}</td>
                    <td className="table-cell">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleChangePassword(user)}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Password
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No users found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {modalType === 'create' && 'Create New User'}
                {modalType === 'edit' && 'Edit User'}
                {modalType === 'delete' && 'Delete User'}
                {modalType === 'changePassword' && 'Change Password'}
              </h3>

              {modalType === 'delete' ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSubmit}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {modalType !== 'changePassword' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          required
                          className="input-field mt-1"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          required
                          className="input-field mt-1"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                          className="input-field mt-1"
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                        >
                          <option value="athlete">Athlete</option>
                          <option value="brand">Brand</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          className="input-field mt-1"
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </>
                  )}

                  {(modalType === 'create' || modalType === 'changePassword') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {modalType === 'create' ? 'Password' : 'New Password'}
                      </label>
                      <input
                        type="password"
                        required
                        className="input-field mt-1"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                    </div>
                  )}

                  {modalType === 'changePassword' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <input
                        type="password"
                        required
                        className="input-field mt-1"
                        value={formData.confirmPassword || ''}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary">
                      {modalType === 'create' && 'Create User'}
                      {modalType === 'edit' && 'Update User'}
                      {modalType === 'changePassword' && 'Change Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement