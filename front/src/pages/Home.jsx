import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext'
import { useContext, useState, useEffect } from "react";
import BuscadorTitulo from "../components/BuscadorTitulo";
import { useRef } from "react";


const Home = () => {

  const { fetchData } = useContext(LibrosContext);
  const [books, setBooks] = useState([]);
  const [buscados, setBuscados]  = useState([]);
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

  const onSearch = async (searchResults) => {
    setBuscados(searchResults);
    divRef.current.style.display = 'none'
  };
  const handleReset = () => {
    setBuscados([]);
    divRef.current.style.display = 'block'

  };

  return (
    <>
      <BuscadorTitulo onSearch={onSearch} mostrarResultados={buscados.length > 0} handleReset={handleReset} />
      <h2>Lista de libros</h2>
     <div className="todos" ref={divRef}>
      <ul className="home">
      { books.map(item => (
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
    </>
    
  )
};

export default Home;
