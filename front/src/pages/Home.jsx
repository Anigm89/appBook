import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext'
import { useContext, useState, useEffect } from "react";
import BuscadorTitulo from "../components/BuscadorTitulo";


const Home = () => {

  const { fetchData } = useContext(LibrosContext);
  const [books, setBooks] = useState([]);
  const [buscados, setBuscados]  = useState([]);

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
  };
  const handleReset = () => {
    setBuscados([]);
  };

  return (
    <>
      <BuscadorTitulo onSearch={onSearch} mostrarResultados={buscados.length > 0} />
      <h2>Lista de libros</h2>
     
      <ul className="home">
      {buscados.length > 0 ? (
          buscados.map(item => (
            <li key={item.id}>
              <Link to={`/${item.id}`}>
                <div className="card">
                  <h2>{item.titulo}</h2>
                  <p>{item.autor}</p>
                  <img src={item.imagen} alt={item.titulo} />
                </div>
              </Link>
              <button onClick={handleReset}>Reset</button>
            </li>
          ))
        ) : (
          books.map(item => (
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
        )}
      </ul>
    </>
  )
};

export default Home;
