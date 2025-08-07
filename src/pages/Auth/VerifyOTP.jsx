import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ShieldCheckIcon,
  ClockIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline'

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length !== 6) return

    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      navigate('/auth/change-password')
    }, 1000)
  }

  const handleResend = async () => {
    setResendLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setResendLoading(false)
      setTimer(60)
    }, 1000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
          <ShieldCheckIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify your email</h2>
        <p className="text-gray-600">
          Enter the 6-digit code we sent to your email
        </p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* OTP Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
            Verification Code
          </label>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              <div className="flex items-center">
                <CheckIcon className="h-5 w-5 mr-2" />
                Verify Code
              </div>
            )}
          </button>
        </div>

        {/* Resend Section */}
        <div className="text-center">
          {timer > 0 ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                <ClockIcon className="h-4 w-4 mr-1" />
                Resend code in {formatTime(timer)}
              </div>
              <p className="text-xs text-gray-500">
                Didn't receive the code? Check your spam folder
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-3">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {resendLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                    Resend code
                  </div>
                )}
              </button>
            </div>
          )}
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
          Having trouble? 
          <Link to="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 ml-1">
            Try again
          </Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyOTP