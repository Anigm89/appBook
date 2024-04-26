import { useEffect, useContext ,useState} from "react";
import { LibrosContext } from '../hooks/LibrosContext';



function LibrosPendientes({uid}){
  
    const [ pendientes, setPendientes] = useState([]);
    const { MarcarPendiente } = useContext(LibrosContext);

    useEffect(() =>{
        const librosPendientes = async () => {
            const urlPendientes= `http://localhost:3000/pendientes/${uid}`;
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
    }, []);



    const handleUpdate = async (id) => {
        try{
          await MarcarPendiente(id, uid, 'leido');
          navigate('/profile');
        }
        catch (error) {
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