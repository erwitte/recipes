import { useState } from "react";
import ActionButton from "./components/ActionButton";
import { useNavigate } from 'react-router-dom';

function Login(){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    return(
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Willkommen zurück</h2>
        <span>E-Mail: </span>
        <input placeholder="E-Mail eingeben..." type="text" onChange={(e) => setEmail(e.target.value)}
        className="border border-black rounded-l"/>
         <span>Passwort: </span>
        <input placeholder="Passwoort eingeben..." type="password" onChange={(e) => setPassword(e.target.value)}
        className="border border-black rounded-l"/>
        <div className="flex gap-6 justify-center">
            <ActionButton onClick={() => console.log(password, email)}>Login</ActionButton>
            <ActionButton onClick={() => navigate("/register")}>Register</ActionButton>
        </div>
        </div>
    )
}

export default Login