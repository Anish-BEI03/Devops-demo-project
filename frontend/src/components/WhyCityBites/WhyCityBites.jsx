import React from 'react'
import './WhyCityBites.css'

const WhyCityBites = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description: 'Get your meals delivered in under 30 minutes'
    },
    {
      icon: '🍽️',
      title: 'Fresh Meals',
      description: 'Prepared fresh daily with premium ingredients'
    },
    {
      icon: '💬',
      title: 'Live Chat Support',
      description: 'Real-time assistance whenever you need it'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Multiple payment options with full security'
    }
  ]

  return (
    <div className='why-citybites' id='why-citybites'>
      <h2>Why Choose CityBites?</h2>
      <p className='why-subtitle'>Experience excellence in every delivery</p>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className='feature-card'>
            <div className='feature-icon'>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyCityBites
