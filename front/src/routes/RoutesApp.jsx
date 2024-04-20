import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from '../pages/Home.jsx'
import ItemDetailPage from "../components/ItemDetailPage.jsx";
import InputCreate from "../components/InputCreate.jsx";
import FormLogIn from "../components/FormLogIn.jsx";
import FormNewUser from '../components/FormNewUser.jsx';
import { useState, useEffect } from "react";
import ButtonLogout from "../components/ButtonLogout.jsx";


function RoutesApp () {


    const [data, setData] = useState(null)
    const urlApi = 'http://localhost:3000'
  
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
            <Link to="/create">Add task</Link>
            <Link to="/login">LogIn</Link>
            <Link to="/registro">Registrarse</Link>
            <ButtonLogout />
            </nav>
        </header>
        {data === null 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/create" element={<InputCreate /> } />
            <Route path="/login" element={<FormLogIn />} />
            <Route path="/registro" element={<FormNewUser />} />

            {data.map(item => (
              <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
            ))
            }
          </Routes>
        }
        
      </div>
    </Router>
  )
}

export default RoutesApp
