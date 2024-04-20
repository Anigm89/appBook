import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './Home.jsx'
import ItemDetailPage from "./ItemDetailPage.jsx";
import InputCreate from "./components/InputCreate.jsx";
import FormLogIn from "./components/FormLogIn.jsx";
import FormNewUser from './components/FormNewUser.jsx'

const App = () => {
  const [data, setData] = useState(null)
  const urlApi = 'http://localhost:3000'

const fetchData = async () => {
  try {
    const response = await fetch(urlApi)
    const resData = await response.json()
    setData(resData)
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData()
}, [data])


  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/create">Add task</Link>
          <Link to="/login">LogIn</Link>
          <Link to="/registro">Registrarse</Link>

        </nav>
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
};

export default App;
