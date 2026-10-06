import React from 'react'
import './DeliverySection.css'
import { assets } from '../../assets/assets'

const DeliverySection = () => {
  const deliveryFeatures = [
    {
      icon: '🚪',
      title: 'Doorstep Delivery',
      description: 'Fresh meals delivered right to your doorstep'
    },
    {
      icon: '📦',
      title: 'Hygienic Packaging',
      description: 'Safe, sealed, and temperature-controlled packages'
    },
    {
      icon: '📍',
      title: 'Real-time Tracking',
      description: 'Track your order from restaurant to your home'
    }
  ]

  return (
    <div className='delivery-section' id='delivery-section'>
      <hr />
      <div className='delivery-content'>
        <div className='delivery-text'>
          <h1>We Deliver</h1>
          <p className='delivery-description'>Experience the best delivery service with our dedicated customer care team. We ensure your meals arrive fresh, hot, and on time with every order.</p>
          <div className="delivery-features">
            {deliveryFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">{feature.icon}</span>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='delivery-image'>
          <img src={assets.deliver} alt="We Deliver" />
        </div>
      </div>
      <hr />
    </div>
  )
}

export default DeliverySection
