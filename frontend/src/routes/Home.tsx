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
        <div className="w-full h-full flex flex-wrap gap-4 self-start">
            {albums.map(album => (
                <div key={album.id}>
                    <span>{album.title}</span>
            </div>))}
        </div>
    )
}

export default Home