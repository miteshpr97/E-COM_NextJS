// 'use client';

// import ProductCard from "../components/ProductCard";
// import React, { useEffect, useState } from "react";
// import axios from "axios";



// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// };

// export default function Product() {

//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProductsData = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/products");
//         const data = res.data;
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProductsData();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
//       <ProductCard products={products} />
//     </div>
//   );
// }




// 'use client';

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../store/slices/productSlice";
// import ProductCard from "../components/ProductCard"; // Import the ProductCard component
// import { RootState, AppDispatch } from "../../store";


// const ProductPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { products, loading, error } = useSelector((state: RootState) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className=" p-4 mt-0  bg-primary w-screen">

//       <div className="container  mx-auto bg-gray-100 p-3 flex justify-center ">
//         <ul className="flex flex-wrap gap-6 justify-center items-center text-lg font-semibold">
//           <li className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300">
//             📱 Tablet / Phone
//           </li>
//           <li className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300">
//             👗 Clothes
//           </li>
//           <li className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300">
//             📺 TV
//           </li>
//         </ul>
//       </div>


//       {/* Hero Section */}
//       <div className="flex flex-col md:flex-row items-center mt-8 bg-red-700 h-80">
//         <div className="text-center md:text-left md:w-1/2">
//           <h1 className="text-5xl font-bold">
//             ELECTRIFY <span className="text-yellow-500">YOUR DAY</span>
//           </h1>
//           <p className="mt-4 text-gray-600">
//             Shop for electronic products with us, guaranteed quality, fast delivery, and safe arrival.
//           </p>
//           <button className="bg-yellow-500 text-white px-6 py-3 mt-6 rounded-lg">
//             Shop Now
//           </button>
//         </div>

       
//         <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
//           <img
//             src="https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.landing-big_2x.jpg"
//             alt="Product"
//             className="w-full max-w-md"
//           />
//         </div>
//       </div>


//        {/* Features */}
//        <div className=" container mx-auto flex justify-center  mt-10 text-gray-700">
//         <div className="flex items-center gap-2">
//           <span>📦</span> 4K+ Products
//         </div>
//         <div className="flex items-center gap-2">
//           <span>⏳</span> 7D Guarantee
//         </div>
//         <div className="flex items-center gap-2">
//           <span>✅</span> 100% Original
//         </div>
//       </div>
  


//       <h1 className="text-4xl font-bold text-center mt-8 mb-8">Products</h1>
//       <ProductCard products={products} />


//     </div>
//   );
// };

// export default ProductPage;



'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import { RootState, AppDispatch } from "../../store";
import Image from 'next/image';

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600 text-lg">Error: {error}</div>;

  return (
    <div className="p-4 mt-0 bg-primary w-full overflow-x-hidden"> 
      {/* Category Navigation */}
      <div className="container mx-auto bg-gray-100 p-3 flex justify-center max-w-screen-xl">
        <ul className="flex flex-wrap gap-6 justify-center items-center text-lg font-semibold">
          <li className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300">
            📱 Tablet / Phone
          </li>
          <li className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300">
            👗 Clothes
          </li>
          <li className="cursor-pointer text-gray-700 hover:text-yellow-500 transition duration-300">
            📺 TV
          </li>
        </ul>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center mt-8 h-80 max-w-screen-xl mx-auto">
        <div className="text-center md:text-left md:w-1/2 px-6">
          <h1 className="text-5xl font-bold text-secondary">
            ELECTRIFY <span className="text-black">YOUR DAY</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Shop for electronic products with us, guaranteed quality, fast delivery, and safe arrival.
          </p>
          <button className="bg-yellow-500 text-white px-6 py-3 mt-6 rounded-lg shadow-lg hover:bg-yellow-600 transition">
            Shop Now
          </button>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <Image
            src=""
            alt="Product"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>


      {/* Features */}
      <div className="container mx-auto flex justify-center mt-10 text-gray-700 max-w-screen-xl">
        <div className="flex items-center gap-2 px-4">
          <span>📦</span> 4K+ Products
        </div>
        <div className="flex items-center gap-2 px-4">
          <span>⏳</span> 7D Guarantee
        </div>
        <div className="flex items-center gap-2 px-4">
          <span>✅</span> 100% Original
        </div>
      </div>

      {/* Products Section */}
      <h1 className="text-4xl font-bold text-center mt-8 mb-8">Products</h1>
      <div className="container mx-auto max-w-screen-xl">
        <ProductCard products={products} />
      </div>
    </div>
  );
};

export default ProductPage;
