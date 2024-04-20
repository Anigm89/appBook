import { Link } from "react-router-dom";
import {  signOut } from "firebase/auth";
import {auth} from './fb.js';
import { useNavigate } from 'react-router-dom';

const Home = ({data}) => {

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

  return (
    <>
    <button onClick={handleLogout}> Logout</button>
      <h2>Lista de datos</h2>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <Link to={`/${item._id} `}>{item.titulo} </Link>
          </li>
        ))}
      </ul>
    </>
  )
};

export default Home;
