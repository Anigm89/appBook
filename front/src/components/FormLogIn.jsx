import { useState } from "react";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../fb.js';
import { NavLink, useNavigate } from 'react-router-dom';

 

function FormLogIn(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            console.log('user',user);
            navigate("/")
            setEmail('');
            setPassword('');
            setError(null);
        })
        }
        catch(err){
            console.log(err);
            setError(err)
        }
    }


/*
    const urlApi = 'http://localhost:3000/create'

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
           // .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('user', user);

            const token = await user.getIdToken();

            console.log('token', token);

            const response = await fetch(urlApi, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}` // Aquí se incluye el token en el encabezado de autorización
                }
            });
            if (response.ok) {
                console.log('respo', response)
                const data = await response.json();
                console.log('Respuesta del backend:', data);
                // Puedes hacer cualquier otra cosa con los datos recibidos del backend aquí
            } else {
                // Manejar errores de respuesta
                throw new Error('Error en la respuesta del servidor');
            }

            setEmail('');
            setPassword('');
            setError(null);
            navigate("/")
        //})
        }
        catch(err){
            console.log(err);
            setError(err)
        }
    }
*/

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