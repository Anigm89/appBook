import { useState, useContext} from "react";
import { LibrosContext } from '../hooks/LibrosContext';
import { Link } from "react-router-dom";


function BuscadorGenero({onSearchGenero, mostrarResultados, handleReset }){

    const [genero, setGenero] = useState('');
    const [resultados, setResultados ] = useState([]);
    const { BuscarGenero } = useContext(LibrosContext);
    const [ mensaje, setMensaje] = useState(false);


    const handleSearchG = async (e) => {
        e.preventDefault();
       
        const data = await BuscarGenero(genero);
        setResultados(data);
        if (data && data.length > 0) {
            onSearchGenero(data);
            setGenero('');
        } else {
            setMostrarMensaje(true); 
        }
    }
    return (
        <>
        <form >
          <input type="text" placeholder="aventuras, ficción..."  value={genero} onChange={e => setGenero(e.target.value)} required />
          <button onClick={handleSearchG} >Buscar</button>
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

export default BuscadorGenero;