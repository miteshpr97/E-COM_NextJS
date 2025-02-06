/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const gateway = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2025-01-27.acacia", // Ensure correct API version
// });

// interface Product {
//   productId: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface Order {
//   user: string;
//   products: Product[];
//   totalAmount: number;
//   shippingAddress: string;
// }

// export const POST = async (request: NextRequest) => {
//   try {
//     const data: Order = await request.json();
//     console.log("Order Data:", data);

//     // Create a Stripe Customer (Use dynamic details if available)
//     const consumer = await gateway.customers.create({
//       name: data.user, // Assuming user ID or name is passed
//       address: {
//         line1: data.shippingAddress.split(",")[0], // Extract street address
//         postal_code: data.shippingAddress.split(",")[3]?.trim() || "", // Extract postal code
//         city: data.shippingAddress.split(",")[1]?.trim() || "",
//         state: data.shippingAddress.split(",")[2]?.trim() || "",
//         country: "IN", // Set default country
//       },
//     });

//     // Prepare line items for multiple products
//     const line_items = data.products.map((product) => ({
//       price_data: {
//         currency: "inr",
//         unit_amount: product.price * 100, // Convert INR to paise
//         product_data: {
//           name: product.name,
//         },
//       },
//       quantity: product.quantity,
//     }));

    

//     // Create a Stripe Checkout session
//     const checkoutSession = await gateway.checkout.sessions.create({
//       payment_method_types: ["card"],
//       customer: consumer.id,
//       line_items,
//       mode: "payment",
//       success_url: "https://your-app.com/success",
//       cancel_url: "https://your-app.com/cancel",
//     });

//     // Return Checkout URL
//     if (checkoutSession.url) {
//       return NextResponse.json({ msg: "Payment session created", url: checkoutSession.url });
//     }

//     return NextResponse.json({ msg: "Error creating session" });

//   } catch (error: any) {
//     console.error("Stripe Error:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// };









import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import { OrderStatus } from "@/models/Order";
import mongoose from "mongoose";

const gateway = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

interface Product {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  user: string;
  products: Product[];
  totalAmount: number;
  shippingAddress: string;
}

export const POST = async (request: NextRequest) => {
  await connect();

  const { user, products, totalAmount, shippingAddress }:Order = await request.json();

  if (!user || !Array.isArray(products) || products.length === 0 || !totalAmount || !shippingAddress) {
    return NextResponse.json(
      { message: "Missing required fields: user, products, totalAmount, or shippingAddress" },
      { status: 400 }
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const consumer = await gateway.customers.create({
      name: user,
      address: {
        line1: shippingAddress.split(",")[0],
        postal_code: shippingAddress.split(",")[3]?.trim() || "",
        city: shippingAddress.split(",")[1]?.trim() || "",
        state: shippingAddress.split(",")[2]?.trim() || "",
        country: "IN",
      },
    });

    const line_items = products.map((product) => ({
      price_data: {
        currency: "inr",
        unit_amount: product.price * 100,
        product_data: {
          name: product.name,
        },
      },
      quantity: product.quantity,
    }));

    const formattedProducts = [];

    for (const p of products) { 
      if (!p.productId || !p.quantity || !p.price) {       
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { message: "Each product must have a valid 'productId', 'quantity', and 'price'." },
          { status: 400 }
        );
      }

      console.log(p.productId, "product id show");
      const product = await ProductModel.findById(p.productId).session(session);


      console.log(product, "here is filter show");
      

      if (!product) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json({ message: `Product not found: ${p.productId}` }, { status: 404 });
      }

      if (product.stock < p.quantity) {
        await session.abortTransaction();
        session.endSession();
        return NextResponse.json(
          { message: `Not enough stock for product: ${product.name}` },
          { status: 400 }
        );
      }

      product.stock -= p.quantity;
      await product.save({ session });

      formattedProducts.push({
        productId: new mongoose.Types.ObjectId(p.productId),
        name: p.name,
        quantity: p.quantity,
        price: p.price,
      });
    }

    const newOrder = new OrderModel({
      user: new mongoose.Types.ObjectId(user),
      products: formattedProducts,
      totalAmount,
      shippingAddress,
      status: OrderStatus.PENDING,
    });

    await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    const checkoutSession = await gateway.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: consumer.id,
      line_items,
      mode: "payment",
      success_url: "https://your-app.com/success",
      cancel_url: "https://your-app.com/cancel",
    });

    if (checkoutSession.url) {
      return NextResponse.json({ msg: "Payment session created", url: checkoutSession.url });
    }

    return NextResponse.json({ msg: "Error creating session" });

  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error:", error);
    return NextResponse.json({ message: "Failed to create order", error: error.message }, { status: 500 });
  }
};





