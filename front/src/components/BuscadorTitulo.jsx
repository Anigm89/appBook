import { useEffect, useState, useContext } from "react";
import { LibrosContext } from '../hooks/LibrosContext';

function BuscadorTitulo({onSearch}){

    const [titulo, setTitulo] = useState('');
    const [resultados, setResultados ] = useState([]);
    const { Buscartitulo } = useContext(LibrosContext);
    const [ mensaje, setMensaje] = useState(false)


    const handleSearch = async (e) => {
        e.preventDefault();
       
        const data = await Buscartitulo(titulo);
        setResultados(data);
        if (data && data.length > 0) {
            onSearch(data);
        } else {
            setMostrarMensaje(true); 
        }
    }

    

    return (
        <>
        <form >
          <input type="text" placeholder="Busca por titulo"  value={titulo} onChange={e => setTitulo(e.target.value)} required />
          <button onClick={handleSearch}>Buscar</button>
        </form>
       { resultados &&  resultados.length > 0 ?
            (<ul>
                {resultados[0].map((res, i) => (
                    <li key={i}><img src={res.imagen} alt={res.titulo} /> </li>
                ))}
            </ul>)
            : null
       }
       {mensaje && resultados.length === 0 && <p>No se han encontrado resultados</p>}
      
        </>

    )
   
}

export default BuscadorTitulo;