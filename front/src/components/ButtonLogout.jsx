//import { Auth } from '../hooks/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom';
import { auth } from '../fb.js';
import { signOut } from "firebase/auth";
import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext } from 'react';




const ButtonLogout = () => {

  const { usuario } = useContext(AuthContext);


    const navigate = useNavigate();

  const handleLogout = () => { 
  
    signOut(auth).then(() => {
        navigate("/");
        console.log("Signed out successfully")
    })
    .catch((error) => {
        console.log('error al cerrar sesion', error)
    });
  }

  return(
    <>
    <p>{usuario.email} </p>
    <button onClick={handleLogout}> Logout</button>
    
    </>
  )
}
export default ButtonLogout