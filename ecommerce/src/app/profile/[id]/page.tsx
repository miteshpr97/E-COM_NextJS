interface Params {
    id: number;
}

export default function Profile({ params }: { params: Params }) {
    
    if (!params || !params.id) {
        return <p>Invalid Profile Data</p>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>User ID: {params.id}</p>
        </div>
    );
}
