/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const gateway = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia", // Ensure correct API version
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
  try {
    const data: Order = await request.json();
    console.log("Order Data:", data);

    // Create a Stripe Customer (Use dynamic details if available)
    const consumer = await gateway.customers.create({
      name: data.user, // Assuming user ID or name is passed
      address: {
        line1: data.shippingAddress.split(",")[0], // Extract street address
        postal_code: data.shippingAddress.split(",")[3]?.trim() || "", // Extract postal code
        city: data.shippingAddress.split(",")[1]?.trim() || "",
        state: data.shippingAddress.split(",")[2]?.trim() || "",
        country: "IN", // Set default country
      },
    });

    // Prepare line items for multiple products
    const line_items = data.products.map((product) => ({
      price_data: {
        currency: "inr",
        unit_amount: product.price * 100, // Convert INR to paise
        product_data: {
          name: product.name,
        },
      },
      quantity: product.quantity,
    }));

    // Create a Stripe Checkout session
    const checkoutSession = await gateway.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: consumer.id,
      line_items,
      mode: "payment",
      success_url: "https://your-app.com/success",
      cancel_url: "https://your-app.com/cancel",
    });

    // Return Checkout URL
    if (checkoutSession.url) {
      return NextResponse.json({ msg: "Payment session created", url: checkoutSession.url });
    }

    return NextResponse.json({ msg: "Error creating session" });

  } catch (error: any) {
    console.error("Stripe Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};










// export const POST = async(request:NextRequest)=>{
//     try {
//       const data: product = await request.json();
//       console.log({ data });


//         const consumer = await gatway.customers.create({
//           //   description: data.name,
//           name: "Jenny Rosen",
//           address: {
//             line1: "510 Townsend St",
//             postal_code: "98140",
//             city: "San Francisco",
//             state: "CA",
//             country: "US",
//           },
//         });
//       const checkoutSession = await gatway.checkout.sessions.create({
//         payment_method_types: ["card"],
//         customer: consumer.id,
//         line_items: [
//           {
//             price_data: {
//               currency: "inr",
//               unit_amount:data.price*100,
//               product_data:{
//                 name:data.name
//               }
//             },
//             // price: data.price as unknown as string, // Replace with the actual price ID from your Stripe Dashboard
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         success_url: "https://your-app.com/success",
//         cancel_url: "https://your-app.com/cancel",
//       });
//       // console.log({invoice});

//       if(checkoutSession.url){
//           return NextResponse.json({msg:"done",url:checkoutSession.url});
//       }
//       console.log({ checkoutSession });
      
//       return NextResponse.json({msg:"error"});

//     } catch (error:any) {
//         return NextResponse.json({error:error.message},{
//             status:500
//         })
//     }
// }


