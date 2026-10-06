import React, { useState } from 'react'
import './Menu.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import FixedButtons from '../../components/FixedButtons/FixedButtons'

const Menu = () => {

  const [category, setCategory] = useState("All");

  return (
    <div className='menu-page'>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <FixedButtons />
    </div>
  )
}

export default Menu
