import React, { useContext, useEffect } from 'react';
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultCode = searchParams.get("resultCode");  // Lấy resultCode từ URL
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { resultCode, orderId });
    if (response.data.success) {
      navigate("/myorders");  // Nếu thanh toán thành công, điều hướng tới trang đơn hàng
    } else {
      navigate("/");  // Nếu thất bại, điều hướng về trang chủ
    }
  };

  // useEffect(() => {
  //   verifyPayment();
  // }, []);  // Gọi hàm xác minh khi component được mount

  useEffect(() => {
    console.log("Order ID:", orderId);  // Kiểm tra giá trị orderId
    verifyPayment();
}, []);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;


// import React, { useContext, useEffect } from 'react'
// import "./Verify.css"
// import { useNavigate, useSearchParams } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';

// const Verify = () => {

//   const [searchParams, setSearchParams] = useSearchParams();
//   const success = searchParams.get("success")
//   const orderId = searchParams.get("orderId")
//   const {url} = useContext(StoreContext)
//   const navigate = useNavigate()

//   const verifyPayment = async() => {
//     const response = await axios.post(url+"/api/order/verify", {success, orderId})
//     if (response.data.success) {
//       navigate("/myorders")
//     }
//     else {
//       navigate("/")
//     }
//   }

//   useEffect(() => {
//     verifyPayment()
//   }, [])

//   return (
//     <div className='verify'>
//         <div className="spinner"></div>
//     </div>
//   )
// }

// export default Verify


