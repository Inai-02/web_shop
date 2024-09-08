import React, { useContext, useEffect, useState } from 'react'
import './PlaceOder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url} = useContext(StoreContext)

  const [data, setData] = useState({
    fullName:"",
    email:"",
    street:"",
    district:"",
    city:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]:value}))
  }

  const placeOder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+30000,
    }
    let response = await axios.post(url+"/api/order/place/", orderData, {headers:{token}})
    if (response.data.success) {
      const { payUrl } = response.data;
      window.location.replace(payUrl);
    }
    else {
      alert("ERROR")
    }
  }

  const navigate = useNavigate()

  useEffect(()=> {
    if (!token) {
      navigate('/cart')
      alert('Bạn cần đăng nhập để thực hiện chức năng này');
    }
    else if (getTotalCartAmount()===0)
    {
      navigate('/cart')
      alert('Vui lòng thêm sản phẩm vào giỏ hàng');
    }
  }, [token])

  return (
    <form onSubmit={placeOder} className='place-oder'>
      <div className="place-oder-left">
        <p className='title'>Thông tin đơn hàng</p>
        <div className="multi-fields">
          <input required name='fullName' onChange={onChangeHandler} value={data.fullName} type="text" placeholder='Họ Tên' />
        </div>
        <input required name='email' onChange={onChangeHandler} data={data.email} type="text" placeholder='Email' />
        <input required name='street' onChange={onChangeHandler} data={data.street} type="text" placeholder='Địa chỉ' />
        <div className="multi-fields">
          <input required name='district' onChange={onChangeHandler} data={data.district} type="text" placeholder='Xã/Phường' />
          <input required name='city' onChange={onChangeHandler} data={data.city} type="text" placeholder='Tỉnh/Thành Phố' />
        </div>
        <input required name='phone' onChange={onChangeHandler} data={data.phone} type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-oder-right">
      <div className="cart-total">
          <h2>Tổng Tiền</h2>
          <div>
            <div className="cart-total-details">
              <p>Giá tiền</p>
              <p>{parseInt(getTotalCartAmount()).toLocaleString('vi-VN')}đ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>{parseInt(30000).toLocaleString('vi-VN')}đ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng Tiền</p>
              <p>{parseInt(getTotalCartAmount()+30000).toLocaleString('vi-VN')}đ</p>
            </div>
          </div>
          <button type='submit'>THANH TOÁN</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOder