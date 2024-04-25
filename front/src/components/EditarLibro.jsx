import { LibrosContext } from '../hooks/LibrosContext';
import { AuthContext } from "../hooks/AuthContext.jsx";
import { useContext, useState} from "react";
import { useParams } from 'react-router-dom';


const EditarLibro = () => {

    const { libros } = useContext(LibrosContext);
    const { usuario } = useContext(AuthContext);
    const { id } = useParams();

    const libro = libros.find(libro => libro.id.toString() === id);


    if(!libro){
        return <p>El libro no existe</p>;
    }
    
console.log('l',libro.id)


const [titulo, setTitulo] = useState(libro.titulo);
const [ subtitulo, setSubtitulo ] = useState(libro.subtitulo);
const [ autor, setAutor ] = useState(libro.autor);
const [ sinopsis, setSinopsis ] = useState(libro.sinopsis);
const [ imagen, setImagen] = useState(libro.imagen);
const [ paginas, setPaginas] = useState(libro.paginas);
const [ genero, setGenero] = useState(libro.genero);
const [ keywords, setKeywords] = useState(libro.keywords);
const [ error, setError] = useState(null);
const [ mensaje, setMensaje] = useState('')

const urlApi = `http://localhost:3000/edit/${id}`;

const token =  usuario.accessToken;
    console.log('userTok', token);

const updated = async (e) => {
    e.preventDefault();
    try{  
        const response = await fetch(urlApi, {
            method: 'PUT', 
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords}), 
        });
        if(response.ok){
            const updatedBoook = await response.json()    
            setTitulo('');
            setSubtitulo('');
            setAutor('');
            setSinopsis('');
            setImagen('');
            setGenero('');
            setPaginas('');
            setKeywords('')
            setError(null);
            setMensaje('Se ha actualizado el libro correctamente')
        }
        else{
            setError('algo ha fallado')
        }
    }
    catch(err){
        console.log(err)
        setError(err)
    }
}


return(
    <>
    <h3>Edita este libro</h3>
    <form onSubmit={updated}>
        <label>Título:</label>
        <input type="text" placeholder="titulo" value={titulo} onChange={e => setTitulo(e.target.value)}  required />
        <label>Subtítulo: </label>
        <input type="text" placeholder="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
        <label>Autor:</label>
        <input type="text" placeholder="autor" value={autor} onChange={e => setAutor(e.target.value)} required />
        <label>Sinopsis:</label>
        <input type="text" placeholder="" value={sinopsis} onChange={e => setSinopsis(e.target.value)} />
        <label>Imagen:</label>
        <input type="text" placeholder="imagen" value={imagen} onChange={e => setImagen(e.target.value)} />
        <label>Nº de Páginas:</label>
        <input type="number" placeholder="nº de páginas" value={paginas} onChange={e => setPaginas(e.target.value)} />
        <label>Género:</label>
        <input type="text" placeholder="genero" value={genero} onChange={e => setGenero(e.target.value)} required />
        <label>Palabras Clave:</label>
        <input type="text" placeholder="tesoro, viaje ..." value={keywords} onChange={e => setKeywords(e.target.value)} />

        <button type="submit">Guardar</button>
    </form>
    <p> {mensaje} </p>
</>
)

};

export default EditarLibro;