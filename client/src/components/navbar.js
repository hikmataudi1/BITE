import {Link, useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"
const Navbar = () => {

  const [cookies,setCookies]=useCookies("access_token")
  
  const navigate=useNavigate()
  const logout = ()=>{
    setCookies("access_token","",{path:"/"})
    window.localStorage.removeItem("userID")
    navigate("/auth")
    window.location.reload()
  }
  return (
    <div className='navbar'>
        <h2 className="navbar-title">BITE</h2>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        
        {!cookies.access_token ? 
        <Link to="/auth">Log in / Register</Link> : (
          <>
        <Link to="/save-recipe">Saved Recipes</Link>
        <button onClick={logout}>Log Out</button>
        </>
        )}
    </div>
  )
}

export default Navbar