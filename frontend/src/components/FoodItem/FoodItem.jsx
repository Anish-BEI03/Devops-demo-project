import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import StarRating from '../StarRating/StarRating'

const FoodItem = ({ id, name, price, description, Image }) => {

  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + Image} alt="" />
        {!cartItems[id]
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
          : <div className='food-item-counter'>
            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-bottom">
          <p className="food-item-price">Rs.{price}</p>
          <StarRating foodId={id} url={url} token={token} />
        </div>
      </div>
    </div>
  )
}

export default FoodItem
