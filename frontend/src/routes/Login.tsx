import { useState } from "react";

function Login(){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    return(
        <>
        <span>E-Mail: </span>
        <input placeholder="E-Mail eingeben..." type="text" onChange={(e) => setEmail(e.target.value)}
        className="border border-black rounded-l"/>
         <span>Passwort: </span>
        <input placeholder="Passwoort eingeben..." type="password" onChange={(e) => setPassword(e.target.value)}
        className="border border-black rounded-l"/>

        <button onClick={() => console.log(password, email)}></button>
        </>
    )
}

export default Login