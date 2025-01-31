/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@/models/Order";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();
    // Parse the request body
    const { user, products, totalAmount, shippingAddress } = await req.json();

    // Validate required fields
    if (!user || !Array.isArray(products) || products.length === 0 || !totalAmount || !shippingAddress) {
      return NextResponse.json(
        { message: "Missing required fields: user, products, totalAmount, or shippingAddress" },
        { status: 400 }
      );
    }

    // Ensure each product has the necessary fields
    for (const product of products) {
      if (!product.name || !product.quantity || !product.price) {
        return NextResponse.json(
          { message: "Each product must have a 'product' ID, 'quantity', and 'price'." },
          { status: 400 }
        );
      }
    }
    // Convert product IDs to MongoDB ObjectId
    const formattedProducts = products.map((p) => ({
      productId: new mongoose.Types.ObjectId(p.productId),
      name: p.name,
      quantity: p.quantity,
      price: p.price,
    }));


    // Create a new order document
    const newOrder = new OrderModel({
      user: new mongoose.Types.ObjectId(user),
      products: formattedProducts,
      totalAmount,
      shippingAddress,
      status: OrderStatus.PENDING, // Default status
    });

    // Save the order to the database
    await newOrder.save();
    // Return a successful response
    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Failed to create order", error: error.message },
      { status: 500 }
    );
  }
}
