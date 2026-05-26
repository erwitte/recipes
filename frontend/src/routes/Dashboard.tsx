import ActionButton from "../components/ActionButton";
import Recipe from "../components/Recipe";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SignOutButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

interface RecipeProps {
  title: string,
  ingredients: string[],
  steps: string[],
}

function Dashboard() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);

  useEffect(() => {
    axios.get<RecipeProps[]>("http://localhost:8000/recipe")
      .then(res => setRecipes(res.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <>
      <SignOutButton>
        <ActionButton onClick={() => navigate("/")}>Log Out</ActionButton>
      </SignOutButton>
      <ActionButton onClick={() => {navigate("/newRecipe")}}>New Recipe</ActionButton>
      <div className="flex flex-col gap-4 mt-4 w-full">
        {recipes.map((r, i) => (
          <div key={i} className="w-full border-b pb-2 last:border-0">
            <Recipe title={r.title} ingredients={r.ingredients} steps={r.steps} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;