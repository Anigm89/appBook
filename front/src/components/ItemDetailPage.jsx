import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext} from "react";
import { Link } from "react-router-dom";


const ItemDetailPage = ({item}) => {
  const { usuario } = useContext(AuthContext);

  return (
    <>
    <h1>mi uid {/*usuario.uid*/} idlibro:{item.id} </h1>
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

          <button>Eliminar</button>
        </div>
      )}
      
    </>
 
  );
};

export default ItemDetailPage;
