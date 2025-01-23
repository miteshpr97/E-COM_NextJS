'use client';

import ProductCard from "../components/ProductCard";
import React, { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Product() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        const data = res.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Products</h1>
      <ProductCard products={products} />
    </div>
  );
}
