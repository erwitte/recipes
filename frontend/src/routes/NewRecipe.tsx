import ActionButton from "../components/ActionButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface newRecipe {
    title: string,
    ingredients: string[],
    steps: string[],
}

function NewRecipe(){
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const navigate = useNavigate();

    function handleSubmit(){
        const newRecipe: newRecipe = {
            title,
            ingredients,
            steps,
        }
        axios.post("http://localhost:8000/recipe", newRecipe)
        .then(res => console.log(res))
        .catch(e => console.log(e));
        navigate("/dashboard");
    }

    return (
    <>
        <div className="flex flex-col gap-4 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Neues Rezept</h2>
            <label className="flex flex-col gap-1">
            <span>Titel: </span>
            <input placeholder="Title eingeben..." type="text" onChange={(e) => setTitle(e.target.value)}
            className="border border-black rounded-l"/>
            </label>
            
            <label className="flex flex-col gap-1">
            <span>1. Zutat: </span>
            <input placeholder="1. Zutat eingeben..." type="text" onChange={(e) => setIngredients([...ingredients, e.target.value])}
            className="border border-black rounded-l"/>
            </label>

            <label className="flex flex-col gap-1">
            <span>2. Zutat: </span>
            <input placeholder="2. Zutat eingeben..." type="text" onChange={(e) => setIngredients([...ingredients, e.target.value])}
            className="border border-black rounded-l"/>
            </label>

            <label className="flex flex-col gap-1">
            <span>Step wiederholen: </span>
            <input placeholder="Step wiederholen..." type="text" onChange={(e) => setSteps([...steps, e.target.value])}
            className="border border-black rounded-l"/>
            </label>
            

            <div className="flex gap-6 justify-center">
                <ActionButton onClick={() => navigate("/")}>Zurück</ActionButton>
                {/* 6. Fixed function invocation execution bug */}
                <ActionButton onClick={() => handleSubmit()}>Speichern</ActionButton>
            </div>
        </div>
    </>
    )
}

export default NewRecipe;