// src/pages/profile.tsx

// 'use client';

import { useRouter } from 'next/router';

export default function Profile() {
    const router = useRouter();
    const { id } = router.query;
    console.log(id, "show the id");

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">THIS IS THE Profile <span>{id}</span></h1>
            <p className="text-xl text-gray-600">Welcome to your profile page.</p>
        </div>
    );
}

