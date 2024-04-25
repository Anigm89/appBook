import { LibrosContext } from '../hooks/LibrosContext';
import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext, useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';


function DeleteBook(){

    const { libros } = useContext(LibrosContext);
    const { usuario } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [ error, setError] = useState(null);


    const libro = libros.find(libro => libro.id.toString() === id);
    if (!libro) {
        setError('El libro no se encontró');
        return <div>{error && <p>Error: {error}</p>}</div>;
    }
    
       
    const urlApi = `http://localhost:3000/delete/${id}`;

    const token = usuario.accessToken;

    useEffect(() =>{
        const borrar = async (e) => {
            try{  
                const confirmDelete = window.confirm("¿Está seguro de que desea eliminar este libro?");
                if(confirmDelete){
                    const response = await fetch(urlApi, {
                        method: 'DELETE', 
                        headers: {
                            'Authorization': `Bearer ${token}`, 
                            'Content-Type': 'application/json', 
                        }
                    });
                    if(response.ok){
                        navigate("/");
                        setError(null)
                    }
                    else {
                        setError('Error al eliminar el libro');
                    }
                }
               
            }
            catch(err){
                console.log(err)
                setError('Error al eliminar el libro', err);
            }
        }
        borrar();

    }, []) 
    
    return(
        <div>
        {error && <p>Error: {error}</p>}
        </div>
    )
}

export default DeleteBook;