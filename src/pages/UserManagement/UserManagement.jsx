import { useState, useEffect } from 'react'
import {
  UserIcon,
  BuildingOfficeIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  KeyIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('create') // create, delete, changePassword
  const [selectedUser, setSelectedUser] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropdown])

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

  const handleDeleteUser = (user) => {
    setModalType('delete')
    setSelectedUser(user)
    setOpenDropdown(null)
    setShowModal(true)
  }

  const handleChangePassword = (user) => {
    setModalType('changePassword')
    setSelectedUser(user)
    setFormData({ ...user, password: '', confirmPassword: '' })
    setOpenDropdown(null)
    setShowModal(true)
  }

  const toggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId)
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
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
          Active
        </span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5"></div>
          Inactive
        </span>
  }

  const getTypeBadge = (type) => {
    return type === 'athlete'
      ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <UserIcon className="w-3 h-3 mr-1" />
          Athlete
        </span>
      : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <BuildingOfficeIcon className="w-3 h-3 mr-1" />
          Brand
        </span>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage athletes and brands on your platform
              </p>
            </div>
            <button
              onClick={handleCreateUser}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add New User
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users by name or email..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-sm text-gray-600">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTypeBadge(user.type)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.joinDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{user.lastLogin}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                         <div className="relative inline-block text-left dropdown-container">
                           <button
                             onClick={() => toggleDropdown(user.id)}
                             className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                           >
                             <EllipsisVerticalIcon className="w-5 h-5" />
                           </button>
                           
                           {openDropdown === user.id && (
                             <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                               <button
                                 onClick={() => handleChangePassword(user)}
                                 className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                               >
                                 <KeyIcon className="w-4 h-4 mr-3 text-gray-400" />
                                 Change Password
                               </button>
                               <button
                                 onClick={() => handleDeleteUser(user)}
                                 className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                               >
                                 <TrashIcon className="w-4 h-4 mr-3 text-red-400" />
                                 Delete User
                               </button>
                             </div>
                           )}
                         </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-2">
                    <UserIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500 text-sm">No users found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(8px)'}}>
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {modalType === 'create' && 'Create New User'}
                    {modalType === 'delete' && 'Delete User'}
                    {modalType === 'changePassword' && 'Change Password'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {modalType === 'delete' ? (
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                      <TrashIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-center text-gray-600 mb-6">
                      Are you sure you want to delete <span className="font-medium">{selectedUser?.name}</span>? This action cannot be undone.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSubmit}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                      >
                        Delete User
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
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
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                          <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                          >
                            <option value="athlete">Athlete</option>
                            <option value="brand">Brand</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {modalType === 'create' ? 'Password' : 'New Password'}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {modalType === 'changePassword' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            value={formData.confirmPassword || ''}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            ) : (
                              <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                      <button 
                        type="submit" 
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                      >
                        {modalType === 'create' && 'Create User'}
                        {modalType === 'changePassword' && 'Change Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
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
    </div>
  )
}

export default UserManagement