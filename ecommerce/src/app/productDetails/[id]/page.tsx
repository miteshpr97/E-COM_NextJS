

// ProductDetails/[id]/pages.tx 
'use client';

import { useRouter } from 'next/router';

const ProductDetails: React.FC = () => {
    const router = useRouter();

    const { id } = router.query;


    console.log(id);
    
   
    return (
        <div>
          abc
        </div>
    );
};

export default ProductDetails;
