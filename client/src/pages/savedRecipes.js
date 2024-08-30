import axios from "axios";
import { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js";
import ClockLoader from "react-spinners/ClockLoader";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const userID = useGetUserID();

  useEffect(() => {

    setIsLoading(true)
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    };

    fetchSavedRecipe();
  }, []);

  return ( 
  <div>
    {isLoading? <ClockLoader />:<>
    <br/><br/><br/>
      <h1 className="title">Saved Recipes</h1>
      <ul className="recipes-list">
        {savedRecipes.map((recipe) => {
          
          const Ingredients=recipe.ingredients
          return(
          <li key={recipe._id} className="recipe-list-item">
            <div>
              <h2 className="recipe-name">{recipe.name}</h2><hr/>
            </div>
            <h3 className="recipe-ingredients-title">You'll need</h3>
            <div className="recipe-ingredients">
            {Ingredients.map((ing)=>(<><p className="recipe-ingredients-item">{ing}</p></>))}
          </div>
          <h3 className="recipe-instructions-title">Inctructions:</h3>
            <div className="recipe-instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="recipe-image"
            />
            <p className="recipe-cook-time">
              Cooking Time: {recipe.cookingTime} (minutes)
            </p>
          </li>
        )})}
      </ul>
      </>} 
    </div>
  );
};

export default SavedRecipes;
