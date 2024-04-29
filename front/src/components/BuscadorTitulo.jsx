import { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';

function BuscadorTitulo({onSearchT, mostrarResultados, handleReset }){

    const [titulo, setTitulo] = useState('');
    const [resultados, setResultados ] = useState([]);
    const { Buscartitulo } = useContext(LibrosContext);
    const [ mensaje, setMensaje] = useState(false);


    const handleSearch = async (e) => {
        e.preventDefault();
       
        const data = await Buscartitulo(titulo);
        setResultados(data);
        if (data && data.length > 0) {
            onSearchT(data);
            setTitulo('');
        } else {
            setMostrarMensaje(true); 
        }
    }
    return (
        <>
        <form >
          <input type="text" placeholder="Busca por titulo"  value={titulo} onChange={e => setTitulo(e.target.value)} required />
          <button onClick={handleSearch} >Buscar</button>
        </form>
       { mostrarResultados  &&  resultados.length > 0 ?
            <>
            <ul>
                {resultados[0].map((res, i) => (
                    <li key={i}>
                       <Link to={`/${res.id}`}>
                            <img src={res.imagen} alt={res.titulo} /> 
                            <p>Ver</p>
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={handleReset}>Reset</button>
            </>
            : null
       }
       {mensaje && resultados.length === 0 && <p>No se han encontrado resultados</p>}
      
        </>

    )
   
}

export default BuscadorTitulo;