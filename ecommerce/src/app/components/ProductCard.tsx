/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/navigation";


// Define the type for the product data
type Product = {
    _id: number;
    name: string;
    description: string;
    price: number;
    image: string;
};

type ProductCardProps = {
    products: Product[];
};

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
    const router = useRouter();

    console.log(products);
    

    return (
        <div className="max-w-full rounded overflow-hidden shadow-lg bg-gray-200 p-4 flex flex-wrap gap-6">
            {products.map((product) => (
                // Ensure each product has a unique key, using `product.id`
                <div key={product._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
                    <img
                        className="w-full h-48 object-cover"
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                    />
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-lg font-semibold text-gray-900">₹{product.price.toFixed(2)}</span>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                                Add to Cart
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                onClick={() => { router.push(`/productDetails/${product._id}`) }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;