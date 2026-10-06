import React, { useState } from 'react'
import './ForgotPassword.css'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword = ({ url, onBack, onPasswordReset }) => {
  const [email, setEmail] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [step, setStep] = useState(1) // 1: email, 2: code, 3: new password
  const [loading, setLoading] = useState(false)

  const handleRequestCode = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(url + "/api/user/request-forgot-password-code", { email })

      if (response.data.success) {
        toast.success('Verification code sent to your email')
        setStep(2)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error sending verification code')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()

    if (!verificationCode) {
      toast.error('Please enter the verification code')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(url + "/api/user/verify-password-change-code",
        { verificationCode },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.data.success) {
        toast.success('Code verified')
        setStep(3)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error verifying code')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!newPassword || !confirmPassword) {
      toast.error('Please fill all password fields')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(url + "/api/user/reset-password-with-code",
        {
          email,
          verificationCode,
          newPassword
        }
      )

      if (response.data.success) {
        toast.success('Password reset successfully')
        onPasswordReset()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error resetting password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='forgot-password-form'>
      <p className='forgot-title'>Forgot Password</p>

      {step === 1 && (
        <form onSubmit={handleRequestCode}>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? 'Sending...' : 'Send Code'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode}>
          <input
            type='text'
            placeholder='Enter 6-digit code'
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
            maxLength='6'
          />
          <button disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <input
            type='password'
            placeholder='New password (min 8 characters)'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}

      <button className='forgot-back-btn' onClick={onBack} disabled={loading}>
        Back to Login
      </button>
    </div>
  )
}

export default ForgotPassword
