import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LibrosContext } from '../hooks/LibrosContext';



function InputCreate ({token}) {

    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [ subtitulo, setSubtitulo ] = useState('');
    const [ autor, setAutor ] = useState('');
    const [ sinopsis, setSinopsis ] = useState('');
    const [ imagen, setImagen] = useState('');
    const [ paginas, setPaginas] = useState('');
    const [ genero, setGenero] = useState('');
    const [ keywords, setKeywords] = useState('');
    const [ error, setError] = useState(null);


    const { addBook } = useContext(LibrosContext);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        try{  
            await addBook(titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords, token);    
            navigate('/')           
        }
        catch(err){
            console.log(err)
            setError('Ha ocurrido un error', err)
        }
    }
    
    return (
        <>
            <h3>Añade un libro</h3>
            <form onSubmit={handleSubmit}>
                <label>Título:</label>
                <input type="text" placeholder="titulo" value={titulo} onChange={e => setTitulo(e.target.value)}  required />
                <label>Subtítulo: </label>
                <input type="text" placeholder="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
                <label>Autor:</label>
                <input type="text" placeholder="autor" value={autor} onChange={e => setAutor(e.target.value)} required />
                <label>Sinopsis:</label>
                <textarea type="text" value={sinopsis} onChange={e => setSinopsis(e.target.value)} /> 
                <label>Imagen:</label>
                <input type="text" placeholder="subtitulo" value={imagen} onChange={e => setImagen(e.target.value)} />
                <label>Nº de Páginas:</label>
                <input type="number" placeholder="nº de páginas" value={paginas} onChange={e => setPaginas(e.target.value)} />
                <label>Género:</label>
                <input type="text" placeholder="genero" value={genero} onChange={e => setGenero(e.target.value)} required />
                <label>Palabras Clave:</label>
                <textarea type="text" placeholder="tesoro, viaje ..." value={keywords} onChange={e => setKeywords(e.target.value)} />

                <button type="submit">Añadir</button>
            </form>
            
            {error && <p>Error: {error}</p>}

        </>
    )
}

export default InputCreate;