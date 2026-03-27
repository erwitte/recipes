import { useState, useEffect } from 'react';
import axios from 'axios';

type Collection = {
    id: number,
    name: string,
    image_url: string,
}


function Home(){
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        axios.get<Collection[]>("http://localhost:8000/collection")
        .then(response => setCollections(response.data))
        .catch(error => console.error(error));
    }, []);
    

    return (
        <ul>
            {collections.map(collection => (
                <li key={collection.id}>{collection.name}</li>
            ))}
        </ul>
    )
}

export default Home