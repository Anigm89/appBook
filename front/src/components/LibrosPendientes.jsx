import { useEffect, useContext ,useState} from "react";
import { LibrosContext } from '../hooks/LibrosContext';



function LibrosPendientes({uid}){
  
    const [ pendientes, setPendientes] = useState([]);
    const { MarcarLeido } = useContext(LibrosContext);
    const { EliminarPendiente } = useContext(LibrosContext);

    useEffect(() =>{
        const librosPendientes = async () => {
            const urlPendientes= `http://localhost:3000/pendientes/${uid}`;
            try{
                const response = await fetch(urlPendientes);
                const resData = await response.json();
                setPendientes(resData)
            }
            catch(error){
                console.log(error)
            }
        }
        librosPendientes();

    }, []);

    console.log('pendientes', pendientes)


        const handleUpdate = async (id) => {
            try {
                await MarcarLeido(id, uid);
                await EliminarPendiente(id, uid);
            } catch (error) {
                throw new Error ('No se ha podido añadir el libro a leídos');
            }
        }

       
    return(
        <>
        <div>
        {pendientes.length > 0 ?
            (<ul>
                {pendientes.map((pendiente, index) =>(
                    <li key={index}>
                        <h3> {pendiente.titulo} </h3>
                        <h4>{pendiente.subtitulo} </h4>
                        <p>{pendiente.autor} </p>
                        <img src={pendiente.imagen} alt={pendiente.titulo} />
                        <button onClick={() => handleUpdate(pendiente.id_libro)}>Marcar como leído</button>
                    </li>
                    ))}
            </ul>)
            :
            (<p>No tienes ningún libro pendiente para leer</p>) }   
        </div>
        </>
    )

}

export default LibrosPendientes;