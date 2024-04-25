import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';



const ItemDetailPage = ({item}) => {
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null); 


  const { eliminarLibro } = useContext(LibrosContext);

  const handleDelete = async () =>{
    try {
      await eliminarLibro(item.id, usuario.accessToken);
      navigate('/');
    } catch (error) {
      setError('No se ha podido eliminar el libro');
    }
  }

  return (
    <>
    <h1> idlibro:{item.id} </h1>
      <h2>{item.titulo} </h2>
      <h3>{item.subtitulo} </h3>
      <h4>{item.autor} </h4>
      <img src={item.imagen} alt="" />
      <p>{item.sinopsis} </p>
      <p>{item.paginas} </p>
      <p>{item.genero} </p>
      <p>{item.keywords} </p>

      {usuario && usuario.email === 'admin@ejemplo.es' && (
        <div>
          <Link to={`/editBook/${item.id}`}> <button>Editar</button></Link>
          <button onClick={handleDelete}>Eliminar</button>
          {error && <p>Error: {error}</p>}
        </div>
      )}
      
    </>
 
  );
};

export default ItemDetailPage;
