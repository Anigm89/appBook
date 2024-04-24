import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext'
import { useContext } from "react";


const Home = () => {

  const { libros } = useContext(LibrosContext);

  return (
    <>
      <h2>Lista de datos</h2>
      <ul className="home">
        {libros.map(item => (
          <li key={item.id}>
            <Link to={`/${item.id} `}>
              <>
              <div className="card">
                <h2> {item.titulo} </h2>
                <p>{item.autor} </p>
                <img src={item.imagen} alt={item.titulo} />
              </div>
              </>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
};

export default Home;
