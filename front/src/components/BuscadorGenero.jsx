import { useState, useContext, useEffect} from "react";
import { LibrosContext } from '../hooks/LibrosContext';
import { Link } from "react-router-dom";


function BuscadorGenero({onSearchGenero, mostrarResultados, handleReset }){

  const [generosUnicos, setGenerosUnicos] = useState([]);
  const [resultados, setResultados ] = useState([]);
  const { BuscarGenero } = useContext(LibrosContext);
  const { BuscarLibrosGenero } = useContext(LibrosContext);
  const [genero, setGenero] = useState('');
  const [ reslibros, setReslibros ] = useState([]);
  const [ mensaje, setMensaje] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
        const data = await BuscarGenero();
        setResultados(data[0]);
        };

        fetchData();
    }, [BuscarGenero]);
    useEffect(() => {
        if (resultados.length > 0) {
        const obtenerGenerosUnicos = () => {
            const generosUnicosSet = new Set();
            resultados.forEach(resultado => {
            if (resultado && resultado.genero) { 
                const generos = resultado.genero.split(',').map(genero => genero.trim()); 
                generos.forEach(genero => generosUnicosSet.add(genero.toLowerCase()));
            }
            });
            const generosUnicosArray = Array.from(generosUnicosSet);
            setGenerosUnicos(generosUnicosArray);
        };

        obtenerGenerosUnicos();
        }
    }, [resultados]);

    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
        setMensaje(false); 
    };

    useEffect(() =>{ 
        const buscar = async () => {
            const data = await BuscarLibrosGenero(genero);
            setReslibros(data);
            console.log('rels', reslibros)
            if (data && data.length > 0) {
                onSearchGenero(data);
                setGenero('');
            } else {
                setMensaje(true); 
            }
        }
        if (genero !== '') {
            buscar();
        }
    },[genero])
  


    return (
        <>
        <select value={genero} onChange={handleGeneroChange}>
                <option value="">Selecciona un género</option>
                {generosUnicos.map((genero, index) => (
                <option key={index} value={genero}>
                    {genero}
                </option>
                ))}
        </select>

        { mostrarResultados  &&  reslibros.length > 0 ?
                <>
                <ul>
                    {reslibros[0].map((res, i) => (
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
        
    );
}

export default BuscadorGenero;