import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which order is being updated

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error in fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.error(error);
    }
  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    setLoadingId(orderId);

    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: newStatus
      })
      if (response.data.success) {
        // Update the local state immediately for better UX
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success("Order status updated successfully");
        // Optionally fetch all orders to ensure sync with backend
        await fetchAllOrders();
      } else {
        toast.error("Failed to update order status");
        // Revert the change if update fails
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error(error);
      // Revert the change on error
      await fetchAllOrders();
    } finally {
      setLoadingId(null);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='orders add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + " | "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p className='order-item-amount'>Rs. {order.amount}.00</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              disabled={loadingId === order._id}
              style={{ opacity: loadingId === order._id ? 0.6 : 1 }}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
