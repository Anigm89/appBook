import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext'
import { useContext, useState, useEffect, useRef } from "react";
import BuscadorTitulo from "../components/BuscadorTitulo";
import BuscadorGenero from "../components/BuscadorGenero";
import BuscadorKeyWords from "../components/BuscadorKeyWords";
import ReactPaginate from 'react-paginate';


const Home = () => {

  const { fetchData } = useContext(LibrosContext);
  const [books, setBooks] = useState([]);
  const [buscadosT, setBuscadosT]  = useState([]);
  const [resultadosGenero, setResultadosGenero] = useState([]);
  const [resultKW, setResultKW ] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const resultsPerPage = 5; 
  const pageCount = Math.ceil(books.length / resultsPerPage);
  const offset = pageNumber * resultsPerPage;
  const currentPageBooks = books.slice(offset, offset + resultsPerPage);
  


  const divRef = useRef(null)

  useEffect(() => {
    const fetchBooks = async () => {
        try {
            const books = await fetchData();
            if (books) {
                setBooks(books);
            }
        } catch (error) {
            console.error("Error fetching leidos:", error);
        }
    };
    fetchBooks();
    
  }, []);

  const onSearchT =  (searchResults) => {
    setBuscadosT(searchResults);
    divRef.current.style.display = 'none';
  };

  const onSearchGenero = async (searchResultsG) => {
    setResultadosGenero(searchResultsG);
    divRef.current.style.display = 'none'
  };

  const onSearchKw = async (searchResultsKW) => {
    setResultKW(searchResultsKW);
    divRef.current.style.display = 'none'
  };
 
  const handleReset = () => {
    setBuscadosT([]);
    setResultadosGenero([]);
    setResultKW([]);
    divRef.current.style.display = 'block'

  };

  return (
    <>
     <div>
      <BuscadorTitulo onSearchT={onSearchT} />
      <BuscadorGenero onSearchGenero={onSearchGenero} />
      <BuscadorKeyWords onSearchKw={onSearchKw} />
    </div>
     <div className="todos" ref={divRef}>
       <h2>Lista de libros</h2>
        <ul className="home">
        {
           currentPageBooks.map(item => (
              <li key={item.id}>
                <Link to={`/${item.id}`}>
                  <div className="card">
                    <h2>{item.titulo}</h2>
                    <p>{item.autor}</p>
                    <img src={item.imagen} alt={item.titulo} />
                  </div>
                </Link>
              </li>
            ))
        }
        </ul>
      
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
      </div>
      <div className="resultadosTitulo">
        { buscadosT  &&  buscadosT.length > 0 ?
              <>
              <ul>
                  {buscadosT[0].map((res, i) => (
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
        {buscadosT && buscadosT[0] == 0 && <p>No se han encontrado resultados</p>}
      </div>
      <div>
        { resultadosGenero  &&  resultadosGenero.length > 0 ?
          <>
          <ul>
              {resultadosGenero[0].map((res, i) => (
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
        {resultadosGenero && resultadosGenero[0] === 0 && <p>No se han encontrado resultados</p>}
      </div>
      <div>
        { resultKW  &&  resultKW.length > 0 ?
          <>
          <ul>
              {resultKW[0].map((res, i) => (
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
       {resultKW && resultKW[0] === 0 && <p>No se han encontrado resultados</p>}
      
      </div>
    </>
  )
};

export default Home;
