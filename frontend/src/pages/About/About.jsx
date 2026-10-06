import React from 'react'
import './About.css'
import FixedButtons from '../../components/FixedButtons/FixedButtons'

const About = () => {
  return (
    <div className='about-container'>
      <div className='about-header'>
        <h1>About CityBites</h1>
        <p className='about-subtitle'>Bringing Delicious Food to Your Doorstep</p>
      </div>

      <div className='about-content'>
        <section className='about-section'>
          <h2>Our Story</h2>
          <p>
            CityBites was founded in 2023 with a simple mission: to connect food lovers with their favorite restaurants
            and cuisines from across the city. We believe that good food brings people together, and our platform makes
            it easier than ever to discover, order, and enjoy delicious meals from the comfort of your home.
          </p>
        </section>

        <section className='about-section'>
          <h2>Our Mission</h2>
          <p>
            To revolutionize the way people order food by providing a seamless, user-friendly platform that connects
            customers with a diverse range of restaurants and cuisines. We are committed to delivering exceptional
            service, competitive prices, and the fastest delivery times in the city.
          </p>
        </section>

        <section className='about-section'>
          <h2>Why Choose CityBites?</h2>
          <ul className='features-list'>
            <li><strong>Wide Selection:</strong> Access hundreds of restaurants and cuisines all in one place</li>
            <li><strong>Fast Delivery:</strong> Average delivery time of 30 minutes or less</li>
            <li><strong>Secure Payments:</strong> Multiple payment options with encrypted transactions</li>
            <li><strong>Real-time Tracking:</strong> Track your order from restaurant to your door</li>
            <li><strong>Customer Support:</strong> 24/7 support team ready to help</li>
            <li><strong>Loyalty Rewards:</strong> Earn points on every order and redeem for discounts</li>
          </ul>
        </section>

        <section className='about-section'>
          <h2>Our Values</h2>
          <div className='values-grid'>
            <div className='value-card'>
              <h3>Quality</h3>
              <p>We partner only with restaurants that meet our highest quality standards</p>
            </div>
            <div className='value-card'>
              <h3>Reliability</h3>
              <p>You can count on us to deliver your food fresh and on time, every time</p>
            </div>
            <div className='value-card'>
              <h3>Innovation</h3>
              <p>We continuously improve our platform to enhance your experience</p>
            </div>
            <div className='value-card'>
              <h3>Community</h3>
              <p>We support local restaurants and help grow the food industry in our city</p>
            </div>
          </div>
        </section>

        <section className='about-section'>
          <h2>Meet Our Team</h2>
          <p>
            CityBites is powered by a passionate team of food enthusiasts, software engineers, and customer service
            professionals. We work tirelessly every day to make sure you have the best food delivery experience possible.
          </p>
          <div className='team-stats'>
            <div className='stat'>
              <h3>500+</h3>
              <p>Partner Restaurants</p>
            </div>
            <div className='stat'>
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className='stat'>
              <h3>100K+</h3>
              <p>Orders Delivered</p>
            </div>
            <div className='stat'>
              <h3>98%</h3>
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </section>

        <section className='about-section'>
          <h2>Contact Us</h2>
          <p>Have questions? We'd love to hear from you!</p>
          <div className='contact-info'>
            <p><strong>Email:</strong> contactCityBites@gmail.com</p>
            <p><strong>Phone:</strong> +94 72 202 6105</p>
            <p><strong>Address:</strong> 123 Food Street, City Center, Your City, YC 12345</p>
          </div>
        </section>
      </div>
      <FixedButtons />
    </div>
  )
}

export default About
