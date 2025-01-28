'use client'; // Add this at the top to mark this file as a client component

import Link from "next/link";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from "@/store/slices/cartSlice";
import Navbar from "../components/Navbar";
import { useUser } from "../../context/UserContext";


const ViewCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const { carts } = useSelector((state: RootState) => state.cart);
  // Calculate Total Price
  const totalAmount = carts.reduce((total, item) => total + item.price * item.qnty, 0);

  const handleRemove = (_id: string) => {
    dispatch(removeFromCart(_id));
  };

  console.log(user, "datatat");
  

  const handleQuantityChange = (_id: string, increment: boolean) => {
    const cartItem = carts.find((item) => item._id === _id);

    if (cartItem) {
      const newQuantity = increment ? cartItem.qnty + 1 : cartItem.qnty - 1;

      console.log(newQuantity);

      if (newQuantity > 0) {
        dispatch(incrementQuantity({ _id, qnty: newQuantity }));
      } else {
        dispatch(decrementQuantity(_id));
      }
    }
  };


  const orderPlace = async () => {
    if (carts.length === 0) {
      alert("Your cart is empty. Please add some items before checking out.");
      return;
    }
  
    // Gather order details
    const orderDetails = {
      products: carts.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.qnty,
      })),
      totalAmount,
      user: user?.id || null,
    };
  
    console.log("Order Details:", orderDetails);
  
    // try {
    //   // Replace with your backend API endpoint
    //   const response = await fetch("/api/orders", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(orderDetails),
    //   });
  
    //   if (response.ok) {
    //     const data = await response.json();
    //     alert("Order placed successfully!");
    //     console.log("Server Response:", data);
  
    //     // Clear the cart
    //     dispatch(clearCart());
    //   } else {
    //     const error = await response.json();
    //     alert(`Error placing order: ${error.message}`);
    //   }
    // } catch (err) {
    //   console.error("Error placing order:", err);
    //   alert("An error occurred while placing your order. Please try again.");
    // }


    
  };
  


  return (
    <>
      <Navbar />
      <div className="bg-gray-200 min-h-screen p-6 w-full">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md min-h-full mt-5">
          <div className="grid grid-cols-3 gap-6">
            {/* Shopping Cart Section */}
            <div className="col-span-2 p-6">
              <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
              <div className="space-y-6">
                {carts?.map((cart) => (
                  <div className="flex items-center justify-between" key={cart._id}>
                    <div className="flex items-center space-x-4">
                      <img
                        src={cart.image}
                        alt={cart.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-bold">{cart.name}</h3>
                        <p className="text-gray-600 text-sm">{cart.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => handleQuantityChange(cart._id, false)}
                      >
                        -
                      </button>
                      <span>{cart.qnty}</span>
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => handleQuantityChange(cart._id, true)}
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold">₹{cart.price * cart.qnty}</p>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleRemove(cart._id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <Link href={"/"}>
                <span className="text-blue-600 hover:underline mt-4 block">
                  ← Back to shop
                </span>
              </Link>
            </div>

            {/* Summary Section */}
            <div className="p-6 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p>ITEMS {carts?.length}</p>
                  <p>₹{totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <label htmlFor="shipping" className="block text-sm font-bold mb-1">
                    SHIPPING
                  </label>
                  <select id="shipping" className="w-full px-2 py-1 border rounded">
                    <option value="5">Standard-Delivery - ₹5.00</option>
                    <option value="10">Express-Delivery - ₹10.00</option>
                  </select>
                </div>
                <div className="flex justify-between font-bold">
                  <p>TOTAL PRICE</p>
                  <p>₹{(totalAmount + 5).toFixed(2)}</p> {/* Default ₹5 shipping */}
                </div>



                <div>
                  Shipment Adress: -
                </div>








                <button className="w-full bg-black text-white py-2 rounded"
                onClick={orderPlace}
                
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ViewCart;
