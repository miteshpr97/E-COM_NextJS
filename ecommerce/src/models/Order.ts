import mongoose, { Document, Schema } from "mongoose";

export enum OrderStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    SHIPPED = 'shipped',
    CANCELLED = 'cancelled',
}

export interface Product {
    product: string; // Product ID
    quantity: number; // Quantity of the product
    price: number; // Price of the product
}

export interface Order extends Document {
    user: string;
    products: Product[];
    totalAmount: number; // Total amount of the order (calculated from products)
    shippingAddress: string; // Shipping address for the order
    status: OrderStatus; // Order status (pending, completed, etc.)
    createdAt: Date; // Order creation date
    updatedAt: Date; // Order update date
}

const ProductSchema: Schema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: [ProductSchema], required: true },
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: false },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


export default mongoose.model<Order>('Order', OrderSchema);