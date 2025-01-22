'use client';

export default function Product() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Product Details</h1>
      <div className="flex flex-col items-center">
      
        <div className="text-center">
          <h2 className="text-3xl font-semibold">Product Name</h2>
          <p className="text-xl text-gray-600 mb-4">$99.99</p>
          <p className="text-lg text-gray-700 mb-6">
            This is a detailed description of the product. It provides all the necessary information about the product features, specifications, and benefits.
          </p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
