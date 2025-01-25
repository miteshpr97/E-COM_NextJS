// interface Params {
//     id: number;
// }

// export default function Profile({ params }: { params: Params }) {

//     if (!params || !params.id) {
//         return <p>Invalid Profile Data</p>;
//     }

//     return (
//         <div>
//             <h1>Profile</h1>
//             <p>User ID: {params.id}</p>
//         </div>
//     );
// 


'use client'

import { useParams } from 'next/navigation';

const Profile: React.FC = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Profile</h1>
            <p>User ID: {id}</p>
        </div>
    );
    
}

export default Profile