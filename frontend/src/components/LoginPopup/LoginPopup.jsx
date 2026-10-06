import React, { useState, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-hot-toast'

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Login")
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetStep, setResetStep] = useState(1) // 1: email, 2: code, 3: new password
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [resetData, setResetData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onResetChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setResetData(prev => ({ ...prev, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }

  const handleRequestCode = async (e) => {
    e.preventDefault()

    if (!resetData.email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(url + "/api/user/request-forgot-password-code", { email: resetData.email })

      if (response.data.success) {
        toast.success('Verification code sent to your email')
        setResetStep(2)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error sending verification code')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()

    if (!resetData.verificationCode) {
      toast.error('Please enter the verification code')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(url + "/api/user/verify-forgot-password-code",
        {
          email: resetData.email,
          verificationCode: resetData.verificationCode
        }
      )

      if (response.data.success) {
        toast.success('Code verified')
        setResetStep(3)
      } else {
        toast.error(response.data.message || 'Invalid verification code')
      }
    } catch (error) {
      toast.error('Error verifying code')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()

    if (!resetData.newPassword || !resetData.confirmPassword) {
      toast.error('Please fill all password fields')
      return
    }

    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (resetData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(url + "/api/user/reset-password-with-code",
        {
          email: resetData.email,
          verificationCode: resetData.verificationCode,
          newPassword: resetData.newPassword
        }
      )

      if (response.data.success) {
        toast.success('Password reset successfully')
        setShowResetPassword(false)
        setResetStep(1)
        setResetData({
          email: '',
          verificationCode: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Error resetting password')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={!showResetPassword ? onLogin : (resetStep === 1 ? handleRequestCode : (resetStep === 2 ? handleVerifyCode : handleResetPassword))} className="login-popup-container">
        <div className="login-popup-title">
          <h2>
            {!showResetPassword
              ? currState
              : resetStep === 1
                ? 'Reset Password'
                : resetStep === 2
                  ? 'Verify Code'
                  : 'New Password'
            }
          </h2>
          <img onClick={() => {
            if (showResetPassword) {
              setShowResetPassword(false)
              setResetStep(1)
              setResetData({
                email: '',
                verificationCode: '',
                newPassword: '',
                confirmPassword: ''
              })
            } else {
              setShowLogin(false)
            }
          }} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {!showResetPassword ? (
            <>
              <div className="login-popup-inputs">
                {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
              </div>
              <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
              <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By cotinuing, I agree to the terms of use&privacy policy.</p>
              </div>
              {currState === "Login"
                ? <>
                  <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                  <p>Forgot password? <span onClick={() => setShowResetPassword(true)}>Reset here</span></p>
                </>
                : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
              }
            </>
          ) : (
            <>
              {resetStep === 1 && (
                <div className="reset-form">
                  <p className="reset-info">Enter your email to receive a verification code</p>
                  <input
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={resetData.email}
                    onChange={onResetChangeHandler}
                    required
                  />
                  <button type='submit' disabled={loading}>
                    {loading ? 'Sending...' : 'Send Code'}
                  </button>
                </div>
              )}

              {resetStep === 2 && (
                <div className="reset-form">
                  <p className="reset-info">Enter the 6-digit code sent to your email</p>
                  <input
                    type='text'
                    name='verificationCode'
                    placeholder='Enter 6-digit code'
                    value={resetData.verificationCode}
                    onChange={(e) => setResetData(prev => ({ ...prev, verificationCode: e.target.value.slice(0, 6) }))}
                    maxLength='6'
                    required
                  />
                  <button type='submit' disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>
              )}

              {resetStep === 3 && (
                <div className="reset-form">
                  <p className="reset-info">Enter your new password</p>
                  <input
                    type='password'
                    name='newPassword'
                    placeholder='New password (min 8 characters)'
                    value={resetData.newPassword}
                    onChange={onResetChangeHandler}
                    required
                  />
                  <input
                    type='password'
                    name='confirmPassword'
                    placeholder='Confirm password'
                    value={resetData.confirmPassword}
                    onChange={onResetChangeHandler}
                    required
                  />
                  <button type='submit' disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  )
}

export default LoginPopup