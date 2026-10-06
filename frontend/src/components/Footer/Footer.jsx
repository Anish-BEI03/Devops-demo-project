import React, { useContext, useState } from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Footer = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const { token, url } = useContext(StoreContext);
  const [feedbackData, setFeedbackData] = useState({
    email: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleMyOrders = () => {
    if (!token) {
      setShowLogin(true);
      window.scrollTo(0, 0);
      return;
    }
    navigate('/myorders');
  }

  const handleHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  }

  const handleAbout = () => {
    navigate('/about');
    window.scrollTo(0, 0);
  }

  const handlePrivacyPolicy = () => {
    navigate('/privacy-policy');
    window.scrollTo(0, 0);
  }

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackData.email.trim() || !feedbackData.feedback.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(url + "/api/feedback/add", {
        email: feedbackData.email,
        feedback: feedbackData.feedback
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFeedbackData({ email: '', feedback: '' });
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 3000); // Hide after 3 seconds
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error submitting feedback");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" className="footer-logo" />
          <p>CityBites connects you to delicious food around the city with a fast, simple, and user-friendly online ordering experience. 🍕🚀</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li onClick={handleHome} style={{ cursor: 'pointer' }}>Home</li>
            <li onClick={handleAbout} style={{ cursor: 'pointer' }}>About</li>
            <li onClick={handleMyOrders} style={{ cursor: 'pointer' }}>My Orders</li>
            <li onClick={handlePrivacyPolicy} style={{ cursor: 'pointer' }}>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+94 72 202 6105</li>
            <li>contactCityBites@gmail.com</li>
          </ul>
          <div className="footer-feedback-section">
            <h3>Give Your Feedbacks</h3>
            <form onSubmit={handleFeedbackSubmit} className="footer-feedback-form">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={feedbackData.email}
                onChange={handleFeedbackChange}
                required
                disabled={isSubmitting}
              />
              <textarea
                name="feedback"
                placeholder="Suggestions? Complains? Anything, Let us know!"
                value={feedbackData.feedback}
                onChange={handleFeedbackChange}
                required
                disabled={isSubmitting}
              ></textarea>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2026 © CityBites.com - All Right Reserved.</p>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="feedback-success-popup">
          <div className="popup-content">
            <div className="popup-icon">✓</div>
            <h2>Feedback Sent!</h2>
            <p>Thank you for your valuable feedback</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Footer
