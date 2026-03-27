import { useState, useEffect } from 'react';
import axios from 'axios';

type Album = {
    id: number,
    title: string,
    image_url: string,
}


function Home(){
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        axios.get<Album[]>("http://localhost:8000/album")
        .then(response => setAlbums(response.data))
        .catch(error => console.error(error));
    }, []);
    

    return (
        <ul>
            {albums.map(album => (
                <li key={album.id}>{album.title}</li>
            ))}
        </ul>
    )
}

export default Home