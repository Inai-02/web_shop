import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from 'axios';
import crypto from 'crypto';

const momoEndpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
const partnerCode = process.env.partnerCode;
const accessKey = process.env.accessKey;
const secretKey = process.env.secretkey;
// const redirectUrl = "http://localhost:5173/verify?success=true";
const redirectUrl = "http://localhost:5173/myorders";
const ipnUrl = "http://localhost:5173/verify?success=false";

// placing user order for frontend
const placeOrder = async (req, res) => {
 
    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Tạo yêu cầu thanh toán cho MoMo
        const requestId = `${partnerCode}-${new Date().getTime()}`;
        const orderId = newOrder._id.toString();
        const orderInfo = `Payment for order ${orderId}`;
        const amount = req.body.amount;
        const requestType = "captureWallet";

        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const paymentRequest = {
            partnerCode: partnerCode,
            accessKey: accessKey,
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            extraData: "",
            requestType: requestType,
            signature: signature,
            lang: 'vi'
        };

        const response = await axios.post(momoEndpoint, paymentRequest);

        if (response.data && response.data.payUrl) {
            res.json({ success: true, payUrl: response.data.payUrl });
        } else {
            res.json({ success: false, message: "MoMo payment failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "hello" });
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success: true, message: "Paid"})
        }
        else {
            await orderModel.findByIdAndUpdate(orderId)
            res.json({success: false, message: "Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "ERROR"})
    }
}

// const verifyOrder = async (req, res) => {
//     const { orderId, resultCode } = req.body; 
//     try {
//         if (resultCode === 0) {  
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Paid" });
//         } else {
//             await orderModel.findByIdAndUpdate(orderId, { payment: false });
//             res.json({ success: false, message: "Not Paid" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "ERROR" });
//     }
// }



//đơn đặt hàng cho người dùng

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({
            userId: req.body.userId,
            
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "ERROR" });
    }
}


//Liệt kê đơn hàng cho quản trị viên
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success: true, data: orders})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "ERROR"})
    }
}

//Update trạng thái đơn hàng
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success: true, message: "Status Update"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "ERROR"})
    }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
