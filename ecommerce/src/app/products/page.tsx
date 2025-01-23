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




'use client';

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice"; 
import ProductCard from "../components/ProductCard"; // Import the ProductCard component
import { RootState, AppDispatch } from "../../store";


const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
       <ProductCard products={products} /> 
    </div>
  );
};

export default ProductPage;
