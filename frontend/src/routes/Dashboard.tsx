import ActionButton from "../components/ActionButton"
import { useNavigate } from 'react-router-dom';

import { SignOutButton } from "@clerk/clerk-react";

function Dashboard(){
    const navigate = useNavigate();

    return(
        <>
            <SignOutButton>
                <ActionButton onClick={() => navigate("/")}>Log Out</ActionButton>
                <ActionButton onClick={() => {}}>New Recipe</ActionButton>
            </SignOutButton>

            <p>asmfposa</p>
        </>
    )
}

export default Dashboard
