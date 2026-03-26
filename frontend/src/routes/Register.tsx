import { useState } from "react";

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
        <>
        <span>Vorname: </span>
        <input placeholder="Vorname eingeben..." type="text" onChange={(e) => setFirstName(e.target.value)}
        className="border border-black rounded-l"/>
        <span>E-Mail: </span>
        <input placeholder="E-Mail eingeben..." type="text" onChange={(e) => setEmail(e.target.value)}
        className="border border-black rounded-l"/>
        <span>Passwort: </span>
        <input placeholder="Passwort eingeben..." type="password" onChange={(e) => setPassword(e.target.value)}
        className="border border-black rounded-l"/>
        <span>Passwort wiederholen: </span>
        <input placeholder="Passwort wiederholen..." type="password" onChange={(e) => {
            const repeatedPassword: string = e.target.value
            checkPasswords(repeatedPassword)
        }}
        className="border border-black rounded-l"/>
        <p className={`text-red-500 text-sm mt-1 transition-opacity duration-300 ${passwordError ? "opacity-100" : "opacity-0"}`}>Passwörter nicht gleich</p>

        <button onClick={() => console.log(firsNname, email, password)}></button>
        </>
    )
}

export default Register