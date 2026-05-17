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
            <p>dlousfdsif</p>
            {albums.map(album => (
                <div key={album.id}
                className="p-4 bg-white/20 rounded-md border border-white/10">
                    <span>{album.title}</span>
            </div>))}
        </div>
    )
}

export default Home