import { useState } from "react";
import clsx from "clsx";

function Register(){
    const [firsNname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    function checkPasswords(repeatedPassword: string){
        if (password !== repeatedPassword){
            setPasswordError("Passwörter nicht gleich");
        } else {
            setPasswordError("");
        }
    }

    return(
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Registrierung</h2>
            <label className="flex flex-col gap-1">
        <span>Vorname: </span>
        <input placeholder="Vorname eingeben..." type="text" onChange={(e) => setFirstName(e.target.value)}
        className="border border-black rounded-l"/>
        </label>

        <label className="flex flex-col gap-1">
        <span>E-Mail: </span>
        <input placeholder="E-Mail eingeben..." type="text" onChange={(e) => setEmail(e.target.value)}
        className="border border-black rounded-l"/>
        </label>

        <label className="flex flex-col gap-1">
        <span>Passwort: </span>
        <input placeholder="Passwort eingeben..." type="password" onChange={(e) => setPassword(e.target.value)}
        className="border border-black rounded-l"/>
        </label>

        <label className="flex flex-col gap-1">
        <span>Passwort wiederholen: </span>
        <input placeholder="Passwort wiederholen..." type="password" onChange={(e) => {
            const repeatedPassword: string = e.target.value
            checkPasswords(repeatedPassword)
        }}
        className="border border-black rounded-l"/>
        </label>
            <p className={clsx(
            "text-red-500 text-sm mt-1 transition-opacity",
            passwordError ? "opacity-100" : "opacity-0"
            )}>
                Passwörter nicht gleich
            </p>
        <button onClick={() => console.log(firsNname, email, password)}></button>
        </div>
    )
}

export default Register