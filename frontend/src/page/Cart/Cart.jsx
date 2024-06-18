import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)

  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p></p>
          <p>Tên món</p>
          <p>Giá tiền</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <br />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}VNĐ</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}VNĐ</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Tổng Tiền</h2>
          <div>
            <div className="cart-total-details">
              <p>Giá tiền</p>
              <p>{getTotalCartAmount()}VNĐ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>{30000}VNĐ</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Tổng tiền</p>
              <p>{getTotalCartAmount()+30000}VNĐ</p>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>THANH TOÁN NGAY</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Nếu bạn có mã giảm giá, Bấm vào đây</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promocode' />
              <button>Đồng ý</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart