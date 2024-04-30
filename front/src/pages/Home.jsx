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

  const onSearchT = async (searchResults) => {
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
      <BuscadorTitulo onSearchT={onSearchT} mostrarResultados={buscadosT.length > 0} handleReset={handleReset} />
      <BuscadorGenero onSearchGenero={onSearchGenero} mostrarResultados={resultadosGenero.length > 0} handleReset={handleReset} />
      <BuscadorKeyWords onSearchKw={onSearchKw} mostrarResultados={resultKW.length > 0} handleReset={handleReset} />
    </div>
     <div className="todos" ref={divRef}>
       <h2>Lista de libros</h2>
        <ul className="home">
        {// books.map(item => (
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
    </>
    
  )
};

export default Home;
