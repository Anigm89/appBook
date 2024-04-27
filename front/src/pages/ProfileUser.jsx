import { useEffect ,useState, useContext} from "react";
import LibrosPendientes from "../components/LibrosPendientes.jsx";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';

 function Profileuser({uid}){

    const { librosLeidos  } = useContext(LibrosContext); 
    const [leidos, setLeidos] = useState([]);


    useEffect(() => {
    const fetchLeidos = async () => {
        try {
            const leidosData = await librosLeidos(uid);
            if (leidosData) {
                setLeidos(leidosData);
            }
        } catch (error) {
            console.error("Error fetching leidos:", error);
        }
    };
    fetchLeidos();
    }, [uid]);
         
    console.log('leidoddd', leidos)

  
/*
    const actualizarLeidos = async (uid) => {
        try {
            
            const urlLeidos = `http://localhost:3000/leidos/${uid}`;
            const response = await fetch(urlLeidos);
            const resData = await response.json();
            setLeidos(resData);
        } catch (error) {
            console.log(error);
        }
    };
    */
    return(
        <>
            <h3>Hola  </h3>
            <div>
                <h1>Mis libros leídos</h1>
                {leidos && leidos.length > 0 ?
                (
                    <ul>
                    {
                        leidos.map((leido, index) =>(
                            <li key={index}>
                               <Link to={`/${leido.id_libro}`}>
                               <h3> {leido.titulo} </h3>
                               <h4>{leido.subtitulo} </h4>
                               <p>{leido.autor} </p>
                               <img src={leido.imagen} alt={leido.titulo} />
                               </Link>
                            </li>
                        ))
                    }
                    </ul>
                )
                :
                (<p>No has marcado ningún libro como leído</p>) }
            </div>
            <div>
                <h1>Libros que quiero leer</h1>
                <LibrosPendientes uid={uid}  />
            </div>
        </>
      
    )
}

export default Profileuser;

