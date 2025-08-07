import { useState, useEffect } from 'react'

const SubscriptionManagement = () => {
  const [contracts, setContracts] = useState([])
  const [filteredContracts, setFilteredContracts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('view') // view, create, edit, terminate
  const [selectedContract, setSelectedContract] = useState(null)
  const [formData, setFormData] = useState({
    athleteId: '',
    brandId: '',
    startDate: '',
    endDate: '',
    amount: '',
    currency: 'USD',
    terms: '',
    status: 'active'
  })

  useEffect(() => {
    fetchContracts()
  }, [])

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage contracts between athletes and brands
          </p>
        </div>
        <button
          onClick={handleCreateContract}
          className="btn-primary"
        >
          Create New Contract
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📋</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Contracts</dt>
                <dd className="text-lg font-semibold text-gray-900">{contractStats.total}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">✅</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                <dd className="text-lg font-semibold text-gray-900">{contractStats.active}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">⏳</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd className="text-lg font-semibold text-gray-900">{contractStats.pending}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">⚠️</span>
              </div>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
                <dd className="text-lg font-semibold text-gray-900">{contractStats.expiring}</dd>
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
                <dt className="text-sm font-medium text-gray-500 truncate">Expired</dt>
                <dd className="text-lg font-semibold text-gray-900">{contractStats.expired}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by athlete or brand name..."
              className="input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="input-field"
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
      <div className="card p-0">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-600">Loading contracts...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Athlete</th>
                  <th className="table-header">Brand</th>
                  <th className="table-header">Amount</th>
                  <th className="table-header">Start Date</th>
                  <th className="table-header">End Date</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Days Until Expiry</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="table-cell">
                      <div>
                        <div className="font-medium text-gray-900">{contract.athlete.name}</div>
                        <div className="text-sm text-gray-500">{contract.athlete.email}</div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div>
                        <div className="font-medium text-gray-900">{contract.brand.name}</div>
                        <div className="text-sm text-gray-500">{contract.brand.email}</div>
                      </div>
                    </td>
                    <td className="table-cell font-medium">
                      {contract.currency} {contract.amount.toLocaleString()}
                    </td>
                    <td className="table-cell text-gray-600">{contract.startDate}</td>
                    <td className="table-cell text-gray-600">{contract.endDate}</td>
                    <td className="table-cell">{getStatusBadge(contract.status)}</td>
                    <td className="table-cell">{getDaysUntilExpiryBadge(contract.daysUntilExpiry)}</td>
                    <td className="table-cell">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewContract(contract)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditContract(contract)}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Edit
                        </button>
                        {contract.status === 'active' && (
                          <button
                            onClick={() => handleTerminateContract(contract)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Terminate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredContracts.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No contracts found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
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