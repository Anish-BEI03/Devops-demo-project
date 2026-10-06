import React, { useState, useEffect } from 'react'
import './StarRating.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const StarRating = ({ foodId, url, token, onRatingUpdate }) => {
  const [averageRating, setAverageRating] = useState(0)
  const [totalRatings, setTotalRatings] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch ratings on mount and when foodId changes
  useEffect(() => {
    fetchRatings()
  }, [foodId])

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`${url}/api/rating/list/${foodId}`)
      if (response.data.success) {
        setAverageRating(response.data.averageRating)
        setTotalRatings(response.data.totalRatings)
      }
    } catch (error) {
      console.error("Error fetching ratings:", error)
    }
  }

  const handleStarClick = async (rating) => {
    if (!token) {
      toast.error("Please sign in to rate")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post(`${url}/api/rating/add`, {
        foodId,
        userId: token, // Using token as userId identifier
        rating
      })

      if (response.data.success) {
        setUserRating(rating)
        await fetchRatings()
        if (onRatingUpdate) {
          onRatingUpdate(response.data.data)
        }
        toast.success("Rating submitted successfully!")
      } else {
        toast.error(response.data.message || "Failed to submit rating")
      }
    } catch (error) {
      console.error("Error submitting rating:", error)
      toast.error("Error submitting rating")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="star-rating-container">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || averageRating) ? 'filled' : 'empty'}`}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleStarClick(star)}
            style={{
              cursor: token ? 'pointer' : 'not-allowed',
              opacity: isSubmitting ? 0.6 : 1
            }}
          >
            ★
          </span>
        ))}
      </div>
      <div className="rating-info">
        <span className="average-rating">{averageRating.toFixed(1)}</span>
        <span className="total-ratings">({totalRatings})</span>
      </div>
    </div>
  )
}

export default StarRating
