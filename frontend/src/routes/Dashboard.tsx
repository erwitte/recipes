import ActionButton from "../components/ActionButton";
import Recipe from "../components/Recipe";
import { useNavigate } from 'react-router-dom';

import { SignOutButton } from "@clerk/clerk-react";

const DUMMY_RECIPES = [
    { title: "Spaghetti", ingredients: ["afsa", "wafdaf", "afdaf"], steps: ["mokfc", "mafaok", "onaf"] },
    { title: "Lasagne" , ingredients: ["afsa", "wafdaf", "afdaf"], steps: ["mokfc", "mafaok", "onaf"]},
    { title: "Pizza", ingredients: ["afsa", "wafdaf", "afdaf"], steps: ["mokfc", "mafaok", "onaf"]}
];

function Dashboard(){
    const navigate = useNavigate();

    return(
        <>
            <SignOutButton>
                <ActionButton onClick={() => navigate("/")}>Log Out</ActionButton>
            </SignOutButton>
            <ActionButton onClick={() => {}}>New Recipe</ActionButton>

            <div className="flex flex-col gap-4 mt-4 w-full">
                {DUMMY_RECIPES.map((recipe) => (
                    <Recipe title={recipe.title} ingredients={recipe.ingredients} steps={recipe.steps} />
                ))}
            </div>
        </>
    )
}

export default Dashboard
