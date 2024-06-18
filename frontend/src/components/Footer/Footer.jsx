import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className='logo' src={assets.logo} alt="" />
                <p>Từ nguồn nguyên liệu tốt nhất, chúng tôi đem đến cho bạn những món ăn ngon nhất mà bạn từng thưởng thức. Không chỉ đơn thuần là những món ăn, chúng tôi sẽ làm thỏa mãn tất cả các vị giác của bạn. </p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Trang chủ</li>
                    <li>Liên hệ</li>
                    <li>Giao hàng</li>
                    <li>Chính sách bảo mật</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>LIÊN HỆ</h2>
                <ul>
                    <li>+84-326-643-462</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer