import { useState, useContext} from "react";
import { LibrosContext } from '../hooks/LibrosContext';
import { Link } from "react-router-dom";


function BuscadorKeyWords({onSearchKw, mostrarResultados, handleReset }){
    const [palabra, setPalabra] = useState('');
    const [resultados, setResultados ] = useState([]);
    const { BuscarKeywords } = useContext(LibrosContext);
    const [ mensaje, setMensaje] = useState(false);


    const handleSearchKW = async (e) => {
        e.preventDefault();
       
        const data = await BuscarKeywords(palabra);
        setResultados(data);
        if (data && data.length > 0) {
            onSearchKw(data);
            setPalabra('');
        } else {
            setMostrarMensaje(true); 
        }
    }
    return (
        <>
        <form >
          <input type="text" placeholder="tesoro, viaje..."  value={palabra} onChange={e => setPalabra(e.target.value)} required />
          <button onClick={handleSearchKW} >Buscar</button>
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

export default BuscadorKeyWords;