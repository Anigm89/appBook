//import { useEffect, useContext ,useState} from "react";
//import { AuthContext } from "../hooks/AuthContext.jsx";
//import { LibrosContext } from '../hooks/LibrosContext';

function LibrosPendientes(){
/*
    const { usuario } = useContext(AuthContext);
    const { libros } = useContext(LibrosContext);
    const [ pendientes, setPendientes] = useState([]);

    useEffect(() =>{
        const librosPendientes = async () => {
            const urlPendientes= 'http://localhost:3000/pendientes';
            try{
                const response = await fetch(urlPendientes);
                const resData = await response.json();
                setPendientes(resData)
                console.log('pendientes', pendientes)
            }
            catch(error){
                console.log(error)
            }
        }
        librosPendientes();
    }, [])

    return(
        <>
        <div>
        {pendientes.length > 0 ?
            (<ul>
                {pendientes.map(pendiente =>(
                    <li>
                        <h3> {pendiente.titulo} </h3>
                        <h4>{pendiente.subtitulo} </h4>
                        <p>{pendiente.autor} </p>
                        <img src={pendiente.imagen} alt={pendiente.titulo} />
                    </li>
                    ))}
            </ul>)
            :
            (<p>No tienes ningún libro pendiente para leer</p>) }   
        </div>
        </>
    )
*/
return(
    <p>no</p>
)
}

export default LibrosPendientes;