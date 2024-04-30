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
import { LibrosContext } from "../hooks/LibrosContext.jsx";
import { isLoggedIn } from "../components/AuhtService.js";
import EditarLibro from "../components/EditarLibro.jsx";

function RoutesApp () {

    const { usuario } = useContext(AuthContext);
    const { libros } = useContext(LibrosContext);
    console.log('lr',libros)

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
        {!libros 
        ? (<div>cargando...</div>) 
        : 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<FormLogIn />} />
            <Route path="/registro" element={<FormNewUser />} />
           
            {libros.map(item => (
              <Route key={item.id} path={`/${item.id}`} element={<ItemDetailPage item={item} />} />
            ))
          }
        
            {isLoggedIn() ? (
                <>
                    <Route path="/create" element={<InputCreate token={usuario.accessToken} />} />
                    <Route path="/editBook/:id" element={<EditarLibro token={usuario.accessToken} />} />
                    <Route path="/profile" element={<Profileuser uid={usuario.uid} token={usuario.accessToken} />} />
                </>
            ) : (
                <>
                    <Route path="/create" element={<Navigate to="/login" />} />
                    <Route path="/editBook/:id" element={<Navigate to="/login" />} />
                    <Route path="/profile" element={<Navigate to="/login" />} />

                </>

            )}

           
          </Routes>
        }
        
      </div>
    </Router>
  )
}

export default RoutesApp
