import React, { useContext, useState, useEffect } from 'react'
import './UserProfile.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import FixedButtons from '../../components/FixedButtons/FixedButtons'

const UserProfile = () => {

  const { url, token } = useContext(StoreContext);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeExpiry, setCodeExpiry] = useState(null);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(url + "/api/user/profile", {}, { headers: { token } });
        if (response.data.success) {
          setUserId(response.data.user._id);
          setUserInfo({
            name: response.data.user.name,
            email: response.data.user.email
          });
        }
      } catch (error) {
        toast.error('Error fetching profile');
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, url]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Request password change code
  const requestPasswordChangeCode = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('❌ New passwords do not match! Please enter the same password in both fields.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(url + "/api/user/request-password-change-code",
        { currentPassword: passwordData.currentPassword },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Verification code sent to your email');
        setVerificationSent(true);
        setCodeExpiry(new Date(Date.now() + 10 * 60 * 1000)); // 10 minutes expiry
      } else {
        toast.error('❌ ' + (response.data.message || 'Wrong current password'));
      }
    } catch (error) {
      toast.error('❌ Wrong current password! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify the code
  const verifyCode = async () => {
    if (!verificationCode) {
      toast.error('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(url + "/api/user/verify-password-change-code",
        { verificationCode },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Code verified');
        setCodeVerified(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  // Change password with verified code
  const changePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(url + "/api/user/change-password-with-code",
        {
          verificationCode,
          newPassword: passwordData.newPassword
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('✅ Password changed successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setVerificationCode('');
        setChangePasswordMode(false);
        setVerificationSent(false);
        setCodeVerified(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error changing password');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!userInfo.name || !userInfo.email) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(url + "/api/user/update-profile",
        { name: userInfo.name, email: userInfo.email },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success('Profile updated successfully');
        setEditMode(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='user-profile'>
      <div className='profile-container'>
        <div className='profile-header'>
          <h1>My Profile</h1>
        </div>

        <div className='profile-content'>
          {/* User Information Section */}
          <div className='profile-section'>
            <h2>Personal Information</h2>

            {!editMode ? (
              <div className='profile-info-display'>
                <div className='info-item'>
                  <label>Name</label>
                  <p>{userInfo.name}</p>
                </div>
                <div className='info-item'>
                  <label>Email</label>
                  <p>{userInfo.email}</p>
                </div>
                <button className='edit-btn' onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            ) : (
              <div className='profile-form'>
                <div className='form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    name='name'
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                    placeholder='Enter your name'
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    placeholder='Enter your email'
                  />
                </div>
                <div className='form-buttons'>
                  <button className='save-btn' onClick={updateProfile} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button className='cancel-btn' onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {/* Change Password Section */}
          <div className='profile-section'>
            <h2>Security</h2>

            {!changePasswordMode ? (
              <button className='edit-btn' onClick={() => setChangePasswordMode(true)}>Change Password</button>
            ) : (
              <div className='profile-form'>
                {!verificationSent ? (
                  <>
                    <div className='form-group'>
                      <label>Current Password</label>
                      <input
                        type='password'
                        name='currentPassword'
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder='Enter current password'
                      />
                    </div>
                    <div className='form-group'>
                      <label>New Password</label>
                      <input
                        type='password'
                        name='newPassword'
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder='Enter new password (min 8 characters)'
                      />
                    </div>
                    <div className='form-group'>
                      <label>Confirm New Password</label>
                      <input
                        type='password'
                        name='confirmPassword'
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder='Confirm new password'
                      />
                    </div>
                    <div className='form-buttons'>
                      <button className='save-btn' onClick={requestPasswordChangeCode} disabled={loading}>
                        {loading ? 'Sending...' : 'Send Verification Code'}
                      </button>
                      <button className='cancel-btn' onClick={() => setChangePasswordMode(false)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className='verification-text'>A verification code has been sent to your email. Enter it below:</p>
                    <div className='form-group'>
                      <label>Verification Code</label>
                      <input
                        type='text'
                        placeholder='Enter 6-digit code'
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                        maxLength='6'
                      />
                      {codeExpiry && (
                        <p className='code-expiry'>Code expires in {Math.max(0, Math.ceil((codeExpiry - new Date()) / 1000))} seconds</p>
                      )}
                    </div>

                    {!codeVerified ? (
                      <div className='form-buttons'>
                        <button className='save-btn' onClick={verifyCode} disabled={loading || !verificationCode}>
                          {loading ? 'Verifying...' : 'Verify Code'}
                        </button>
                        <button className='cancel-btn' onClick={() => {
                          setVerificationSent(false);
                          setVerificationCode('');
                        }}>Back</button>
                      </div>
                    ) : (
                      <>
                        <p className='success-text'>✓ Code verified successfully!</p>
                        <div className='form-buttons'>
                          <button className='save-btn' onClick={changePassword} disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                          </button>
                          <button className='cancel-btn' onClick={() => {
                            setChangePasswordMode(false);
                            setVerificationSent(false);
                            setCodeVerified(false);
                            setVerificationCode('');
                          }}>Cancel</button>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <FixedButtons />
    </div>
  )
}

export default UserProfile
