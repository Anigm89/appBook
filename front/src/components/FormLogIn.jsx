import { useState, useContext } from "react";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../fb.js';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from "../hooks/AuthContext.jsx";
 

function FormLogIn(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();
    const { usuario } = useContext(AuthContext);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            console.log('user',user);

            const token = await user.getIdToken();
            console.log('userTok', token)

            const urlApi= 'http://localhost:3000/create';
            const response = await fetch(urlApi, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            if (response.ok) {
                navigate("/profile");
                setEmail('');
                setPassword('');
                setError(null);
            } else {
                setError('Error en la respuesta del servidor');
            }
       
        }
        catch(err){
            console.log(err);
            setError(err)
        }
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <h3> Inicia sesión:</h3>
            <label>Email :</label>
            <input type="email"  placeholder="Correo Electronico" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="password">Contraseña :</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
         
            <button type="submit" id="btnLogin">Acceder</button>
            <p>{email} , {password} </p>
        </form>
        </>
    )
}

export default FormLogIn;