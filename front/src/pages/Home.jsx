import { Link } from "react-router-dom";


const Home = ({data}) => {

  return (
    <>
      <h2>Lista de datos</h2>
      <ul className="home">
        {data.map(item => (
          <li key={item._id}>
            <Link to={`/${item._id} `}>
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
