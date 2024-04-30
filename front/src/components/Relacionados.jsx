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
            
          }, []);

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
          }, []);
   
    
    return(
        <>
        <div>
             <h2>Otros libros de {generos[0]} </h2>
             {relacionadosgenero && relacionadosgenero.length > 0 ?
             (
                relacionadosgenero[0].map((elem, i) =>(
                    <li key={i}>
                        <img src={elem.imagen} alt={elem.titulo} />
                    </li>
                )))
                :
                <p>No se han encontrado libros del mismo género</p>
             }
          
        </div>
        <div>
             <h2>Otros libros del autor </h2>
             {relacionadosautor && relacionadosautor.length > 0 ?
             (
                relacionadosautor[0].map((elem, i) =>(
                    <li key={i}>
                        <img src={elem.imagen} alt={elem.titulo} />
                    </li>
                )))
                :
                <p>No se han encontrado libros del mismo género</p>
             }
        </div>
        </>
    )
}

export default Relacionados;