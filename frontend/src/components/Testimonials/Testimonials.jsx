import React, { useState, useEffect, useContext } from 'react'
import './Testimonials.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Testimonials = () => {
  const { url } = useContext(StoreContext)
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fetch feedback from database
  const fetchFeedback = async () => {
    try {
      setLoading(true)
      const response = await axios.get(url + "/api/feedback/list")
      if (response.data.success && response.data.data) {
        // Transform feedback data to testimonial format
        const transformedData = response.data.data.map((item, index) => ({
          name: item.email.split('@')[0], // Extract name from email
          rating: 5, // Default 5 stars
          review: item.feedback,
          avatar: ['👩‍💼', '👨‍💻', '👩‍🎓', '👨‍🍳', '👩‍🏫', '👨‍⚕️'][index % 6]
        }))
        setTestimonials(transformedData)
      }
    } catch (error) {
      console.error("Error fetching feedback:", error)
      // Fallback to empty array or default testimonials
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFeedback()
  }, [url])

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials.length])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length])
    }
    return visible
  }

  return (
    <div className='testimonials-section' id='testimonials'>
      <hr />
      <div className="testimonials-header">
        <h2>What Our Customers Say</h2>
        <p className="testimonials-subtitle">Join thousands of satisfied customers enjoying CityBites</p>
      </div>

      {loading ? (
        <div className="loading-container">
          <p>Loading customer reviews...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="no-testimonials">
          <p>No customer reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <>
          <div className="testimonials-container">
            <button className="testimonial-nav-btn prev-btn" onClick={handlePrev}>❮</button>

            <div className="testimonials-grid">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-header-card">
                    <div className="avatar">{testimonial.avatar}</div>
                    <div className="testimonial-info">
                      <h4>{testimonial.name}</h4>
                      <div className="stars">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i}>⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="testimonial-text">"{testimonial.review}"</p>
                </div>
              ))}
            </div>

            <button className="testimonial-nav-btn next-btn" onClick={handleNext}>❯</button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </>
      )}
      <hr />
    </div>
  )
}

export default Testimonials
