import React, { useContext, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, onlyHomeItems = false }) => {

  const { food_list, searchTerm } = useContext(StoreContext)
  const [sortBy, setSortBy] = useState('popular')

  // Filter logic
  const filteredFoodList = food_list.filter((item) => {
    const matchCategory = category === "All" || category === item.category;
    const searchLower = searchTerm.toLowerCase().trim();
    const matchSearch = !searchLower ||
      (item.name && item.name.toLowerCase().includes(searchLower)) ||
      (item.description && item.description.toLowerCase().includes(searchLower));

    // If onlyHomeItems is true, only show items marked for home page
    const matchHome = !onlyHomeItems || item.showOnHome === true;

    return matchCategory && matchSearch && matchHome;
  });

  // Sorting logic
  const sortedList = [...filteredFoodList].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      // popular (default)
      return 0;
    }
  });

  const displayList = onlyHomeItems ? sortedList.slice(0, 8) : sortedList;

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-header">
        <h2>Top dishes near you</h2>
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="popular">Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      <div className="food-display-list">
        {displayList.length > 0 ? (
          displayList.map((item, index) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              Image={item.Image}
            />
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#999' }}>
            <p>No dishes found matching your search.</p>
          </div>
        )}
      </div>
      {onlyHomeItems && filteredFoodList.length > 8 && (
        <div className="view-all-container">
          <a href="/menu" className="view-all-btn">View All Dishes →</a>
        </div>
      )}
    </div>
  )
}

export default FoodDisplay
