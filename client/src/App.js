import "./App.css"
import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/home"
import Auth from "./pages/auth"
import CreateRecipe from "./pages/createRecipe"
import SavedRecipes from "./pages/savedRecipes"
import Navbar from "./components/navbar"

const App = () => {
  return (
    <div className='App'>
       <Router> 
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/save-recipe" element={<SavedRecipes/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App