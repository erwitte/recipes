import { useState, useEffect } from 'react';
import axios from 'axios';

type Collection = {
    id: number,
    name: string,
    image_url: string,
    link: string
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
                <li key={collection.id}><a href={collection.link}>{collection.name}</a></li>
            ))}
        </ul>
    )
}

export default Home