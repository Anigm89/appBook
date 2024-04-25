import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext} from "react";
import { Link, useParams } from "react-router-dom";



const ItemDetailPage = ({item}) => {
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();


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
          <Link to={`/deleteBook/${item.id}`}> <button>Eliminar</button></Link>
        </div>
      )}
      
    </>
 
  );
};

export default ItemDetailPage;
