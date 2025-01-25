'use client';

import { useParams } from 'next/navigation';

const ProductDetails: React.FC = () => {
    const { id } = useParams(); 

    console.log(id);

    return (
        <div>
            Product ID: {id}
        </div>
    );
};

export default ProductDetails;