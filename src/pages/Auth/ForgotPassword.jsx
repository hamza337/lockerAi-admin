import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  EnvelopeIcon, 
  PaperAirplaneIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  KeyIcon
} from '@heroicons/react/24/outline'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setTimeout(() => {
        navigate('/auth/verify-otp')
      }, 2000)
    }, 1000)
  }

  if (sent) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-gray-600 mb-4">
            We've sent a verification code to
          </p>
          <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg inline-block">
            {email}
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the email? Check your spam folder or
          </p>
          <button 
            onClick={() => setSent(false)}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            try again
          </button>
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Redirecting to verification page...
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mb-4">
          <KeyIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h2>
        <p className="text-gray-600">
          No worries, we'll send you reset instructions
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center">
                <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                Send reset email
              </div>
            )}
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/auth/login"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to sign in
          </Link>
        </div>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Remember your password? 
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword