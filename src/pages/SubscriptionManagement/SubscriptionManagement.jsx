import React, { useState, useEffect } from 'react'
import { 
  DocumentTextIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const SubscriptionManagement = () => {
  const [contracts, setContracts] = useState([])
  const [filteredContracts, setFilteredContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'view', 'create', 'edit', 'terminate'
  const [selectedContract, setSelectedContract] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [formData, setFormData] = useState({
    athleteId: '',
    brandId: '',
    startDate: '',
    endDate: '',
    amount: '',
    currency: 'USD',
    status: 'pending',
    terms: ''
  })

  useEffect(() => {
    fetchContracts()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.relative')) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  useEffect(() => {
    filterContracts()
  }, [contracts, searchTerm, statusFilter])

  const fetchContracts = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockContracts = [
        {
          id: 1,
          athlete: { id: 1, name: 'John Doe', email: 'john@example.com' },
          brand: { id: 2, name: 'Nike Inc', email: 'contact@nike.com' },
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          amount: 50000,
          currency: 'USD',
          status: 'active',
          terms: 'Exclusive sponsorship deal with performance bonuses',
          createdDate: '2023-12-15',
          daysUntilExpiry: 345
        },
        {
          id: 2,
          athlete: { id: 3, name: 'Sarah Wilson', email: 'sarah@example.com' },
          brand: { id: 4, name: 'Adidas', email: 'info@adidas.com' },
          startDate: '2024-01-15',
          endDate: '2024-06-15',
          amount: 25000,
          currency: 'USD',
          status: 'expiring_soon',
          terms: 'Social media promotion and event appearances',
          createdDate: '2024-01-10',
          daysUntilExpiry: 3
        },
        {
          id: 3,
          athlete: { id: 5, name: 'Mike Johnson', email: 'mike@example.com' },
          brand: { id: 6, name: 'Under Armour', email: 'contact@underarmour.com' },
          startDate: '2023-06-01',
          endDate: '2023-12-01',
          amount: 30000,
          currency: 'USD',
          status: 'expired',
          terms: 'Product endorsement and training gear',
          createdDate: '2023-05-20',
          daysUntilExpiry: -50
        },
        {
          id: 4,
          athlete: { id: 7, name: 'Lisa Brown', email: 'lisa@example.com' },
          brand: { id: 8, name: 'Puma', email: 'info@puma.com' },
          startDate: '2024-02-01',
          endDate: '2025-02-01',
          amount: 75000,
          currency: 'USD',
          status: 'pending',
          terms: 'Multi-year partnership with renewal options',
          createdDate: '2024-01-25',
          daysUntilExpiry: 365
        }
      ]
      setContracts(mockContracts)
      setLoading(false)
    }, 1000)
  }

  const filterContracts = () => {
    let filtered = contracts

    if (searchTerm) {
      filtered = filtered.filter(contract =>
        contract.athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(contract => contract.status === statusFilter)
    }

    setFilteredContracts(filtered)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      expired: { bg: 'bg-red-100', text: 'text-red-800', label: 'Expired' },
      expiring_soon: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Expiring Soon' },
      terminated: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Terminated' }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getDaysUntilExpiryBadge = (days) => {
    if (days < 0) return <span className="text-red-600 text-sm">Expired</span>
    if (days <= 7) return <span className="text-red-600 text-sm font-medium">{days} days</span>
    if (days <= 30) return <span className="text-orange-600 text-sm">{days} days</span>
    return <span className="text-gray-600 text-sm">{days} days</span>
  }

  const handleViewContract = (contract) => {
    setModalType('view')
    setSelectedContract(contract)
    setShowModal(true)
  }

  const handleCreateContract = () => {
    setModalType('create')
    setFormData({
      athleteId: '',
      brandId: '',
      startDate: '',
      endDate: '',
      amount: '',
      currency: 'USD',
      terms: '',
      status: 'pending'
    })
    setShowModal(true)
  }

  const handleEditContract = (contract) => {
    setModalType('edit')
    setSelectedContract(contract)
    setFormData({
      athleteId: contract.athlete.id,
      brandId: contract.brand.id,
      startDate: contract.startDate,
      endDate: contract.endDate,
      amount: contract.amount,
      currency: contract.currency,
      terms: contract.terms,
      status: contract.status
    })
    setShowModal(true)
  }

  const handleTerminateContract = (contract) => {
    setModalType('terminate')
    setSelectedContract(contract)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (modalType === 'create') {
      const newContract = {
        id: contracts.length + 1,
        athlete: { id: formData.athleteId, name: 'New Athlete', email: 'athlete@example.com' },
        brand: { id: formData.brandId, name: 'New Brand', email: 'brand@example.com' },
        ...formData,
        createdDate: new Date().toISOString().split('T')[0],
        daysUntilExpiry: Math.ceil((new Date(formData.endDate) - new Date()) / (1000 * 60 * 60 * 24))
      }
      setContracts([...contracts, newContract])
    } else if (modalType === 'edit') {
      setContracts(contracts.map(contract => 
        contract.id === selectedContract.id 
          ? { ...contract, ...formData, daysUntilExpiry: Math.ceil((new Date(formData.endDate) - new Date()) / (1000 * 60 * 60 * 24)) }
          : contract
      ))
    } else if (modalType === 'terminate') {
      setContracts(contracts.map(contract => 
        contract.id === selectedContract.id 
          ? { ...contract, status: 'terminated' }
          : contract
      ))
    }

    setShowModal(false)
    setSelectedContract(null)
  }

  const contractStats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    pending: contracts.filter(c => c.status === 'pending').length,
    expiring: contracts.filter(c => c.status === 'expiring_soon').length,
    expired: contracts.filter(c => c.status === 'expired').length
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage contracts between athletes and brands
              </p>
            </div>
            <button
              onClick={handleCreateContract}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Create New Contract
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Contracts</dt>
                  <dd className="text-2xl font-bold text-gray-900">{contractStats.total}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                  <dd className="text-2xl font-bold text-gray-900">{contractStats.active}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-2xl font-bold text-gray-900">{contractStats.pending}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
                  <dd className="text-2xl font-bold text-gray-900">{contractStats.expiring}</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <XCircleIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Expired</dt>
                  <dd className="text-2xl font-bold text-gray-900">{contractStats.expired}</dd>
                </dl>
              </div>
            </div>
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
                placeholder="Search by athlete or brand name..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expiring_soon">Expiring Soon</option>
                <option value="expired">Expired</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contracts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-sm text-gray-600">Loading contracts...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Athlete</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until Expiry</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contract.athlete.name}</div>
                          <div className="text-sm text-gray-500">{contract.athlete.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{contract.brand.name}</div>
                          <div className="text-sm text-gray-500">{contract.brand.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {contract.currency} {contract.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{contract.startDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{contract.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(contract.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getDaysUntilExpiryBadge(contract.daysUntilExpiry)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === contract.id ? null : contract.id)}
                            className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <EllipsisVerticalIcon className="w-5 h-5" />
                          </button>
                          {dropdownOpen === contract.id && (
                            <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                              <button
                                onClick={() => {
                                  handleViewContract(contract)
                                  setDropdownOpen(null)
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <EyeIcon className="w-4 h-4 mr-3 text-gray-400" />
                                View Details
                              </button>
                              <button
                                onClick={() => {
                                  handleEditContract(contract)
                                  setDropdownOpen(null)
                                }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <PencilIcon className="w-4 h-4 mr-3 text-gray-400" />
                                Edit Contract
                              </button>
                              {contract.status === 'active' && (
                                <button
                                  onClick={() => {
                                    handleTerminateContract(contract)
                                    setDropdownOpen(null)
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <TrashIcon className="w-4 h-4 mr-3 text-red-400" />
                                  Terminate
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredContracts.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-gray-400 mb-2">
                    <DocumentTextIcon className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500 text-sm">No contracts found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 overflow-y-auto h-full w-full z-50"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="relative top-20 mx-auto p-5 border border-gray-200 w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {modalType === 'view' && 'Contract Details'}
                {modalType === 'create' && 'Create New Contract'}
                {modalType === 'edit' && 'Edit Contract'}
                {modalType === 'terminate' && 'Terminate Contract'}
              </h3>

              {modalType === 'view' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Athlete</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract?.athlete.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Brand</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract?.brand.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedContract?.currency} {selectedContract?.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedContract?.status)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract?.startDate}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedContract?.endDate}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Terms</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContract?.terms}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="btn-secondary"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : modalType === 'terminate' ? (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to terminate the contract between {selectedContract?.athlete.name} and {selectedContract?.brand.name}? This action cannot be undone.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSubmit}
                      className="btn-danger"
                    >
                      Terminate Contract
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Athlete ID</label>
                      <input
                        type="text"
                        required
                        className="input-field mt-1"
                        value={formData.athleteId}
                        onChange={(e) => setFormData({...formData, athleteId: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Brand ID</label>
                      <input
                        type="text"
                        required
                        className="input-field mt-1"
                        value={formData.brandId}
                        onChange={(e) => setFormData({...formData, brandId: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        required
                        className="input-field mt-1"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        required
                        className="input-field mt-1"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <input
                        type="number"
                        required
                        className="input-field mt-1"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Currency</label>
                      <select
                        className="input-field mt-1"
                        value={formData.currency}
                        onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      className="input-field mt-1"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="terminated">Terminated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Terms</label>
                    <textarea
                      rows={4}
                      className="input-field mt-1"
                      value={formData.terms}
                      onChange={(e) => setFormData({...formData, terms: e.target.value})}
                      placeholder="Enter contract terms and conditions..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button type="submit" className="btn-primary">
                      {modalType === 'create' ? 'Create Contract' : 'Update Contract'}
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

export default SubscriptionManagement