import { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
}
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
        <div className="relacionados">
             <h2>Otros libros de {generos[0]} </h2>
             {relacionadosgenero && relacionadosgenero.length > 0 ? (
                <Slider {...settings}>
                    {relacionadosgenero[0].slice(1, 10).map((elem, i) => (
                         <div key={i} className="card">
                            <Link to={`/${elem.id}`}>
                                <img src={elem.imagen} alt={elem.titulo} />
                            </Link>
                         </div>
                    ))}
                </Slider>
            )
            :                
            <p>No se han encontrado libros del mismo género</p>
            }
        </div>
        <div className="relacionados">
             <h2>Otros libros del autor </h2>
             {relacionadosautor && relacionadosautor.length > 0 ?
             (
                <Slider {...settings}>
                   {relacionadosautor[0].map((elem, i) =>(
                        <div key={i} className="card">
                            <Link to={`/${elem.id}`}>
                                <img src={elem.imagen} alt={elem.titulo} />
                            </Link>
                        </div>
                ))}
                </Slider>
             )
                :
                <p>No se han encontrado libros del mismo autor</p>
             }
        </div>
        </>
    )
}

export default Relacionados;