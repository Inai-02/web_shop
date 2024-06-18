import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://quan011101:0326643462@cluster0.4ndy7w0.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}