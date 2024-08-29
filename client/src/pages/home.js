import axios from "axios"
import { useEffect, useState } from "react"
import useGetUserID from "../hooks/useGetUserID.js"
import { useCookies } from "react-cookie"
import {useSnackbar} from "notistack"
import ClockLoader from "react-spinners/ClockLoader";
import { useNavigate } from 'react-router-dom'


  const Home = () => {
  const [recipes,setRecipes]=useState([])
  const [savedRecipes ,setSavedRecipes]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  const userID=useGetUserID()
  const [cookies,_]=useCookies(["access_token"])
  const {enqueueSnackbar}=useSnackbar()
  const navigate = useNavigate()


  useEffect(()=>{  
    setIsLoading(true)
    const fetchRecipe= async ()=>{
    try{ 
      const response=await axios.get("http://localhost:3001/recipes")
      setRecipes(response.data)
      console.log(response.data);
      setIsLoading(false)
    } catch (err) {
        console.log(err);
        setIsLoading(false)
      }
    }
    
    const fetchSavedRecipe = async ()=>{
      try{ 
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        )
        setSavedRecipes(response.data.savedRecipes)

      } catch (err) {
          console.log(err);
        }
    }
    fetchRecipe()

    if(cookies.access_token) {fetchSavedRecipe()}

 },[])

const saveRecipe = async (recipeID)=>{
  try{ 
    const response= await axios.put("http://localhost:3001/recipes",
      {recipeID,
        userID},
      {headers:{Authorization:cookies.access_token}})
    setSavedRecipes(response.data.savedRecipes)
    enqueueSnackbar("Recipe Saved successfully",{variant:"success"})
    


  } catch (err) {
      console.log(err);
      enqueueSnackbar("Error",{variant:'error'})
    }
}

const isRecipeSaved =(id)=> savedRecipes?.includes(id)


  return (
    <div>
      <br/><br/><br/>
      
      {isLoading ? <ClockLoader  /> :(
        <>
        <h1 className="title">Recipes</h1>        
        <ul className="recipes-list">
        {recipes.map((recipe)=>{
          
          const Ingredients=recipe.ingredients
          
          
          return(
          <li key={recipe._id} className="recipe-list-item">
          
          <div>
            <h2 className="recipe-name">{recipe.name}</h2><hr/>
            {isRecipeSaved(recipe._id) && <h2 className="save-star">⭐</h2>}
            <button
             className="save-button"
             onClick={()=>saveRecipe(recipe._id)}
             disabled={isRecipeSaved(recipe._id)}
             >
              {isRecipeSaved(recipe._id) ? "Saved" :"Save"}
              </button>
          </div>
          <h3 className="recipe-ingredients-title">You'll need</h3>
          <div className="recipe-ingredients">
            {Ingredients.map((ing)=>(<><p className="recipe-ingredients-item">{ing}</p></>))}
          </div>
          <h3 className="recipe-instructions-title">Inctructions:</h3>
          <div className="recipe-instructions">
          <p>{recipe.instructions}</p>
          </div>
          
          <img src={recipe.imageUrl} alt={recipe.name} className="recipe-image" />
          <p className="recipe-cook-time">Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        )})}
        <li className="recipe-list-item">
          <div className="add-recipe-card" onClick={()=>{navigate("/create-recipe")}}>
            <div className="add-recipe-content">
              <h2 className="add-recipe-title">Add your own recipe!</h2>
              <p className="add-reciipe-text">Click here to create a new recipe.</p>
              <div className="add-recipe-icon">➕</div>
            </div>
          </div>
        </li>
      </ul>
      </>
    )}
    </div>
  )
}

export default Home
