import { useEffect, useContext ,useState, useRef} from "react";
//import { AuthContext } from "../hooks/AuthContext.jsx";
//import LibrosPendientes from "../components/LibrosPendientes.jsx";


function Profileuser({uid}){

    //const { usuario } = useContext(AuthContext);
    const [ leidos, setLeidos] = useState([]);

    //const uid = usuario.uid;

    useEffect(() =>{
        const librosLeidos = async () => {
            const urlLeidos = `http://localhost:3000/leidos/${uid}`;
            try{
                const response = await fetch(urlLeidos);
                const resData = await response.json();
                setLeidos(resData)
                console.log('leidos', resData)
            }
            catch(error){
                console.log(error)
            }
        }
        librosLeidos();
    }, [uid]);

    return(
        <>
            <h3>Hola  </h3>
            <div>
                <h1>Mis libros leídos</h1>
                {leidos.length > 0 ?
                (
                    <ul>
                    {
                        leidos.map((leido, index) =>(
                            <li key={index}>
                               <h3> {leido.titulo} </h3>
                               <h4>{leido.subtitulo} </h4>
                               <p>{leido.autor} </p>
                               <img src={leido.imagen} alt={leido.titulo} />
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
            </div>
        </>
      
    )
}

export default Profileuser;

