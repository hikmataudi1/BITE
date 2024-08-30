import axios from 'axios'
import React, { useState } from 'react'
import useGetUserID from '../hooks/useGetUserID.js'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import {useSnackbar} from "notistack"



const CreateRecipe = () => {
  const userID =useGetUserID()  
  const [cookies,_]=useCookies(["access_token"])
  const {enqueueSnackbar}=useSnackbar()
  const [recipe,setRecipe]=useState({ 
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID,
    })



  const handleChange=(e)=>{
    const {name,value}=e.target
    setRecipe({...recipe,[name]:value})
  }

  const handleIngredientChange= (e,idx)=>{
      const {value}=e.target
      const ingredients = recipe.ingredients
      ingredients[idx]=value
      setRecipe({...recipe,ingredients:ingredients})
  }

  const addIngredient = ()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]}) 
  }
  const onSubmit=async(e)=>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:3001/recipes",recipe,{headers:{Authorization:cookies.access_token}})
      navigate("/")
      enqueueSnackbar("Recipe Created successfully",{variant:"success"})
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Error",{variant:'error'})
      
    }
  }
  
  const navigate = useNavigate()

  return (
    
    <div className='create-recipe'>
      <br/><br/><br/>
      <h2 className='create-recipe-title'> Create Recipe</h2>
      <form className='add-recipe-form' onSubmit={onSubmit}>
        <label className='name-label' htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' className='name-input' onChange={handleChange}/>
        <label className='ingredients-label' htmlFor='ingredients'>Ingredients</label>
        {recipe.ingredients.map((ingredient,idx)=>( 
          <input key={idx} type='text' className='ingredient-item' name='ingredients' value={ingredient} onChange={(e)=>handleIngredientChange(e,idx)} />
        ))}
        <button onClick={addIngredient}type='button' className='add-ingredient-button'>Add Ingredient</button>
        <label className='instructions-label' htmlFor='instructions'>Instructions</label>
        <textarea className='instructions-input' id='instructions' name='instructions' onChange={handleChange}></textarea>
        <label className='image-label' htmlFor='imageUrl'>Image URL</label>
        <input className='image-link-input' type='text' id='imageUrl' name='imageUrl' onChange={handleChange} />
        <label className='cook-time-label' htmlFor='cookingTime'>Cooking TIme (minutes)</label>
        <input className='cook-time-input' type='number' id='cookingTime' name='cookingTime' onChange={handleChange} />
        <button className='add-recipe-button' type='submit'>Add Recipe</button>
      </form>
    </div>
  )
}

export default CreateRecipe
