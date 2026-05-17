import { useState } from 'react';
import ActionButton from '../components/ActionButton';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from "@clerk/clerk-react";
import { translateClerkError } from '../utils/clerkTranslations';
import clsx from 'clsx';
//import axios from 'axios';

// type Album = {
//     id: number,
//     title: string,
//     image_url: string,
// }


function Home(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clerkError, setClerkError] = useState("");

    const { isLoaded, signIn, setActive } = useSignIn();
    const navigate = useNavigate();
    //const [albums, setAlbums] = useState<Album[]>([])

    // useEffect(() => {
    //     axios.get<Album[]>("http://localhost:8000/album")
    //     .then(response => setAlbums(response.data))
    //     .catch(error => console.error(error));
    // }, []);

    const navigateRegister = () => {
        navigate("/register");
    };

    const handleSubmit = async () => {
        // Prevent executing if Clerk hasn't finished loading yet
        if (!isLoaded) return;

        try {
            // 1. Pass credentials to Clerk's sign-in flow
            const result = await signIn.create({
                identifier: email, // Clerk uses 'identifier' for Email/Username
                password,
            });

            // 2. Check if the sign-in attempt is complete
            if (result.status === "complete") {
                // 3. Set the active session token and log the user into the frontend
                await setActive({ session: result.createdSessionId });
                navigate("/dashboard"); // Redirect to your protected dashboard
            } else {
                // This handles edge cases (like multi-factor authentication being required)
                console.log(result);
            }
        } catch (err: any) {
            // Capture API errors (e.g., "Invalid password" or "User not found")
            const errCode = err.errors[0].code;
            setClerkError(translateClerkError(errCode));
        }
    };
    

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <label className="flex flex-col gap-1">
            <span>e-Mail: </span>
            <input type="text" onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded-l"/>
            </label>

            <label className="flex flex-col gap-1">
            <span>Passwort: </span>
            <input type="password" onChange={(e) => setPassword(e.target.value)}
            className="border border-black rounded-l"/>
            </label>
            <p className={clsx(
                "text-red-500 text-sm mt-1 transition-opacity",
                clerkError ? "opacity-100" : "opacity-0"
            )}>
                {clerkError || "Fehler"}
            </p>
            <div className="flex gap-6 justify-center">
                    <ActionButton onClick={() => navigateRegister()}>Registrieren</ActionButton>
                    <ActionButton onClick={() => handleSubmit()}>Log In</ActionButton>
                </div>
            {/* {albums.map(album => (
                <div key={album.id}
                className="p-4 bg-white/20 rounded-md border border-white/10">
                    <span>{album.title}</span>
            </div>))} */}
        </div>
    )
}

export default Home