interface RecipeProps {
    title: String,
    ingredients: String[],
    steps: String[],
}

const Recipe = ({title, ingredients, steps}: RecipeProps) => {
    return (
        <>
            <p>{title}</p>
            <p>{ingredients}</p>
            <p>{steps}</p>
        </>
    )
}

export default Recipe