import { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';


function Relacionados({genero, autor}){
    const { BuscarLibrosGenero, BuscarLibrosAutor  } = useContext(LibrosContext); 
    const [relacionadosgenero, setRelacionadosgenero] = useState([]);
    const [ relacionadosautor, setRelacionadosautor] = useState([]);

    const generos= genero.split(',').map(palabra => palabra.trim().toLowerCase());
        useEffect(() => {
            const fetch = async () => {
                try {
                    const relacionadosgenero = await BuscarLibrosGenero(generos[0]);
                    if (relacionadosgenero) {
                        setRelacionadosgenero(relacionadosgenero);
                    }
                } catch (error) {
                    console.error("Error fetching leidos:", error);
                }
            };
            fetch();
            
          }, [generos]);

          useEffect(() => {
            const fetchAutor = async () => {
                try {
                    const relacionadosautor = await BuscarLibrosAutor(autor);
                    if (relacionadosautor) {
                        setRelacionadosautor(relacionadosautor);
                    }
                } catch (error) {
                    console.error("Error fetching leidos:", error);
                }
            };
            fetchAutor();
          }, [autor]);
   
    
    return(
        <>
        <div>
             <h2>Otros libros de {generos[0]} </h2>
             <ul className="relacionados">
             {relacionadosgenero && relacionadosgenero.length > 0 ?
             (
                relacionadosgenero[0].slice(2,10).map((elem, i) =>(
                    <li key={i} className="card">
                        <Link to={`/${elem.id}`}>
                            <img src={elem.imagen} alt={elem.titulo} />
                        </Link>
                    </li>
                )))
                :
                <p>No se han encontrado libros del mismo género</p>
             }
             </ul>
        </div>
        <div>
             <h2>Otros libros del autor </h2>
             <ul className="relacionados">
             {relacionadosautor && relacionadosautor.length > 0 ?
             (
                relacionadosautor[0].map((elem, i) =>(
                    <li key={i} className="card">
                        <Link to={`/${elem.id}`}>
                            <img src={elem.imagen} alt={elem.titulo} />
                        </Link>
                    </li>
                )))
                :
                <p>No se han encontrado libros del mismo género</p>
             }
             </ul>
        </div>
        </>
    )
}

export default Relacionados;