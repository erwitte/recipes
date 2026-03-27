import { useState, useEffect } from 'react';
import axios from 'axios';

type Collection = {
    name: string,
    image_url: string,
    link: string
}


function Home(){
    const [collections, setCollections] = useState<Collection[]>([])

    useEffect(() => {
        axios.get<Collection[]>("localhost:8000/collection")
        .then(response => setCollections(response.data))
        .catch(error => console.error(error));
    }, []);
    

    return (
        <ul>
            {collections.map(collection => (
                <li key={collection.link}>{collection.name}</li>
            ))}
        </ul>
    )
}

export default Home