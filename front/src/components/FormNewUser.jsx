import { useState } from "react";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../fb';
import { NavLink, useNavigate } from 'react-router-dom';



function FormNewUser(){

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();


    //const urlApi= 'http://localhost:3000/registro';

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password)
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


    return(
        <>
        <form onSubmit={handleSubmit}>
            <h3> Crea tu usuario y contraseña:</h3>
            <label>Email :</label>
            <input type="email"  placeholder="Correo Electronico" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="password">Contraseña :</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
         
            <button type="submit" id="btnLogin">Acceder</button>
            <p>{email} , {password} </p>
            {email ? 
            <p>Usuario {email} creado con éxito </p>
            : <p>Inténtalo de nuevo</p>
            }
        </form>
        </>
    )
}

export default FormNewUser;