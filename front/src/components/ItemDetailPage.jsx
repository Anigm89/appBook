import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext ,useState} from "react";


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
      {usuario.email ? 
       usuario.email === 'asd@asd.es' ?
       <>
        <div>
          <button>Editar</button>
          <button>Eliminar</button>
        </div>
       </>
        :
        null
        :null
      }
    </>
 
  );
};

export default ItemDetailPage;
