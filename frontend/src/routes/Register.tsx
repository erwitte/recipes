import { useState } from "react";
import clsx from "clsx";
import ActionButton from "../components/ActionButton";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";

function Register(){
    const [firstName, setFirstName] = useState(""); // Fixed typo
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")
    
    // 1. Added missing states for Clerk's OTP step and error messages
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [clerkError, setClerkError] = useState("");

    const { isLoaded, signUp, setActive } = useSignUp();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!isLoaded || passwordError || !password) return;

        try {
            await signUp.create({ firstName, emailAddress, password });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true); 
            setClerkError("");
        } catch (err: any) {
            setClerkError(err.errors[0].message);
        }
    };

    // 3. Added the verification submission handler
    const handleVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                navigate("/"); 
            }
        } catch (err: any) {
            setClerkError(err.errors[0].message);
        }
    };

    function checkPasswords(repeatedPassword: string){
        if (password !== repeatedPassword){
            setPasswordError("Passwörter nicht gleich");
        } else {
            setPasswordError("");
        }
    }

    // 4. Render Verification UI if pending verification
    if (pendingVerification) {
        return (
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Code Verifizieren</h2>
                <p className="text-sm text-gray-600 text-center">Bitte gib den Code ein, den wir dir per E-Mail geschickt haben.</p>
                
                <label className="flex flex-col gap-1">
                    <span>Bestätigungscode:</span>
                    <input placeholder="Code eingeben..." value={code} autoComplete="one-time-code" onChange={(e) => setCode(e.target.value)}
                    className="border border-black rounded-l p-2"/>
                </label>

                {clerkError && <p className="text-red-500 text-sm mt-1">{clerkError}</p>}

                <div className="flex gap-6 justify-center">
                    <ActionButton onClick={() => setPendingVerification(false)}>Zurück</ActionButton>
                    <ActionButton onClick={() => handleVerify()}>Verifizieren</ActionButton>
                </div>
            </div>
        );
    }

    // Standard Form UI
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
            <input placeholder="E-Mail eingeben..." type="text" onChange={(e) => setEmailAddress(e.target.value)}
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
            
            {/* 5. Combined display for custom and Clerk errors */}
            <p className={clsx(
                "text-red-500 text-sm mt-1 transition-opacity",
                (passwordError || clerkError) ? "opacity-100" : "opacity-0"
            )}>
                {passwordError || clerkError || "Fehler"}
            </p>
                
            <div className="flex gap-6 justify-center">
                <ActionButton onClick={() => navigate("/")}>Zurück</ActionButton>
                {/* 6. Fixed function invocation execution bug */}
                <ActionButton onClick={() => handleSubmit()}>Registrieren</ActionButton>
            </div>
        </div>
    )
}

export default Register