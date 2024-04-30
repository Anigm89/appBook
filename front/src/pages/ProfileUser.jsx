import { useEffect ,useState, useContext} from "react";
import LibrosPendientes from "../components/LibrosPendientes.jsx";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';
import ReactPaginate from 'react-paginate';


 function Profileuser({uid, token}){

    const { librosLeidos  } = useContext(LibrosContext); 
    const [leidos, setLeidos] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const resultsPerPage = 6; 
    const pageCount = Math.ceil(leidos.length / resultsPerPage);
    const offset = pageNumber * resultsPerPage;
    const currentPageBooks = leidos.slice(offset, offset + resultsPerPage);
    
  


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
         
    const actualizarLeidos = async () => {
        try {
            const nuevosLeidos = await librosLeidos(uid);
            setLeidos(nuevosLeidos);
        } catch (error) {
            console.error("Error actualizando leidos:", error);
        }
    };
    return(
        <>
            <div>
                <h1>Mis libros leídos</h1>
                {leidos && leidos.length > 0 ?
                (
                    <ul>
                    {
                        currentPageBooks.map((leido, index) =>(
                            <li key={index}>
                               <Link to={`/${leido.id_libro}`}>
                               
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
            <ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => setPageNumber(selected)}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
            <div>
                <h1>Libros que quiero leer</h1>
                <LibrosPendientes uid={uid} actualizarLeidos={actualizarLeidos} token={token} />
            </div>
        </>
      
    )
}

export default Profileuser;

