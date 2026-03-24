import { useState } from "react";

function Register(){
    const [firsNname, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    return(
        <>
        <span>Vorname: </span>
        <input placeholder="Vorname eingeben..." type="text" onChange={(e) => setFirstName(e.target.value)}/>
        <span>E-Mail: </span>
        <input placeholder="E-Mail eingeben..." type="text" onChange={(e) => setEmail(e.target.value)}/>

        <button onClick={() => console.log(firsNname, email)}></button>
        </>
    )
}

export default Register