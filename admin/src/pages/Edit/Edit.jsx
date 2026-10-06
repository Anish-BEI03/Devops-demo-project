import React, { useEffect, useState } from 'react'
import './Edit.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({ url }) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    showOnHome: false
  })

  const fetchFoodItem = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const foodItem = response.data.data.find(item => item._id === id);
        if (foodItem) {
          setData({
            name: foodItem.name,
            description: foodItem.description,
            price: foodItem.price,
            category: foodItem.category,
            showOnHome: foodItem.showOnHome || false
          })
          setPreviewImage(`${url}/images/${foodItem.Image}`)
        } else {
          toast.error("Food item not found")
          navigate("/list")
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Error fetching food item")
      navigate("/list")
    }
  }

  useEffect(() => {
    fetchFoodItem();
  }, [id])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", id)
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("showOnHome", data.showOnHome)
    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, formData);
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/list")
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Error updating food")
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : previewImage || assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='Rs.200' required />
          </div>
        </div>
        <div className="add-show-home flex-col">
          <p>Show on Home Page</p>
          <input
            onChange={(e) => setData(data => ({ ...data, showOnHome: e.target.checked }))}
            type="checkbox"
            name='showOnHome'
            checked={data.showOnHome}
            title="Check to display this product on the home page"
          />
        </div>
        <button type='submit' className='add-btn'>UPDATE</button>
      </form>
    </div>
  )
}

export default Edit
