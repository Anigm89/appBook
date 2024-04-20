//import { Auth } from '../hooks/AuthContext.jsx'; 
import { useNavigate } from 'react-router-dom';
import { auth } from '../fb.js';
import { signOut } from "firebase/auth";


const ButtonLogout = () => {

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
    <button onClick={handleLogout}> Logout</button>
    
    </>
  )
}
export default ButtonLogout