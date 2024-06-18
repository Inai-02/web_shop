import React, { useContext } from 'react'
import './PlaceOder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)
  
  return (
    <form className='place-oder'>
      <div className="place-oder-left">
        <p className='title'>Thông tin đơn hàng</p>
        <div className="multi-fields">
          <input type="text" placeholder='Họ Tên' />
        </div>
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='Địa chỉ' />
        <div className="multi-fields">
          <input type="text" placeholder='Xã/Phường' />
          <input type="text" placeholder='Tỉnh/Thành Phố' />
        </div>
        <input type="text" placeholder='Số điện thoại' />
      </div>
      <div className="place-oder-right">
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
              <p>Tổng Tiền</p>
              <p>{getTotalCartAmount()+30000}VNĐ</p>
            </div>
          </div>
          <button>THANH TOÁN</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOder