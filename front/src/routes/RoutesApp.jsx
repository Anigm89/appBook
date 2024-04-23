import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Home from '../pages/Home.jsx'
import ItemDetailPage from "../components/ItemDetailPage.jsx";
import InputCreate from "../components/InputCreate.jsx";
import FormLogIn from "../components/FormLogIn.jsx";
import FormNewUser from '../components/FormNewUser.jsx';
import { useState, useEffect, useContext } from "react";
import ButtonLogout from "../components/ButtonLogout.jsx";
import Profileuser from "../pages/ProfileUser.jsx";
import { AuthContext } from "../hooks/AuthContext.jsx";
import { isLoggedIn } from "../components/AuhtService.js";

function RoutesApp () {

    const { usuario } = useContext(AuthContext);

    const [data, setData] = useState(null)
    const urlApi = 'http://localhost:3000';
  
    const fetchData = async () => {
        try {
        const response = await fetch(urlApi)
        const resData = await response.json()
        setData(resData)
console.log('libros', resData)
        } catch (error) {
        console.log(error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
    <Router>
      <div className="content">
        <header>
            <nav>
              <Link to="/">Inicio</Link>
              {!usuario ?
              <>
                <Link to="/login">LogIn</Link>
                <Link to="/registro">Registrarse</Link>
              </>
              :
              <>
                <Link to="/create">Añadir libro</Link>
                <ButtonLogout />
              </>
              }            
            </nav>
        </header>
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/login" element={<FormLogIn />} />
            <Route path="/registro" element={<FormNewUser />} />
        
            {isLoggedIn() ? (
                <>
                    <Route path="/create" element={<InputCreate />} />
                    <Route path="/profile" element={<Profileuser />} />
                </>
            ) : (
                <>
                    <Route path="/create" element={<Navigate to="/login" />} />
                    <Route path="/profile" element={<Navigate to="/login" />} />

                </>

            )}

            {data.map(item => (
              <Route key={item.id} path={`/${item.id}`} element={<ItemDetailPage item={item}/>} />
            ))
            }
          </Routes>
        }
        
      </div>
    </Router>
  )
}

export default RoutesApp
