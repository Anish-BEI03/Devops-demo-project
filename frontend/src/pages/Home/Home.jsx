import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import WhyCityBites from '../../components/WhyCityBites/WhyCityBites'
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import DeliverySection from '../../components/DeliverySection/DeliverySection'
import Testimonials from '../../components/Testimonials/Testimonials'
import AppDownload from '../../components/AppDownload/AppDownload'
import FixedButtons from '../../components/FixedButtons/FixedButtons'
import { Link } from 'react-router-dom'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <WhyCityBites />
      <FoodDisplay category={category} onlyHomeItems={true} />
      <ImageSlider />
      <DeliverySection />
      <Testimonials />
      <AppDownload />
      <FixedButtons />
    </div>
  )
}

export default Home
