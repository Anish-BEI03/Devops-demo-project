import React, { useState, useEffect } from 'react'
import './ImageSlider.css'
import { assets } from '../../assets/assets'

const ImageSlider = () => {
  const slides = [
    assets.slide1,
    assets.slide2,
    assets.slide3,
    assets.slide4,
    assets.slide5
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className='image-slider'>
      <hr /> <br />
      <div className="slider-header">
        <h2>Dine-in Experiences</h2>
        <p className="slider-subtitle">Explore restaurant partnerships and premium dining options</p>
      </div>
      <div className='slider-container'>
        <button className='slider-button prev-button' onClick={goToPrevSlide}>
          ❮
        </button>

        <div className='slides-wrapper'>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        <button className='slider-button next-button' onClick={goToNextSlide}>
          ❯
        </button>
      </div>

      <div className='dots-container'>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
