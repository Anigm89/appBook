import { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContext.jsx";


function InputCreate () {

    const { usuario } = useContext(AuthContext);

    const [titulo, setTitulo] = useState('');
    const [ subtitulo, setSubtitulo ] = useState('');
    const [ autor, setAutor ] = useState('');
    const [ sinopsis, setSinopsis ] = useState('');
    const [ imagen, setImagen] = useState('');
    const [ paginas, setPaginas] = useState('');
    const [ genero, setGenero] = useState('');
    const [ keywords, setKeywords] = useState('');
    const [ error, setError] = useState(null);
    const [ mensaje, setMensaje] = useState('')

    const urlApi = 'http://localhost:3000/create'

    const token =  usuario.accessToken;
        console.log('userTok', token);

    const send = async (e) => {
        e.preventDefault();
        try{  
            const response = await fetch(urlApi, {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({titulo, subtitulo, autor, sinopsis, imagen, paginas, genero, keywords}), 
            });
            if(response.ok){
                const libro = await response.json()    
                setTitulo('');
                setSubtitulo('');
                setAutor('');
                setSinopsis('');
                setImagen('');
                setGenero('');
                setPaginas('');
                setKeywords('')
                setError(null);
                setMensaje('Se ha añadido el libro')
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
    
    return (
        <>
            <h3>Añade un libro</h3>
            <form onSubmit={send}>
                <label>Título:</label>
                <input type="text" placeholder="titulo" value={titulo} onChange={e => setTitulo(e.target.value)}  required />
                <label>Subtítulo: </label>
                <input type="text" placeholder="subtitulo" value={subtitulo} onChange={e => setSubtitulo(e.target.value)} />
                <label>Autor:</label>
                <input type="text" placeholder="autor" value={autor} onChange={e => setAutor(e.target.value)} required />
                <label>Sinopsis:</label>
                <input type="text" placeholder="" value={sinopsis} onChange={e => setSinopsis(e.target.value)} />
                <label>Imagen:</label>
                <input type="text" placeholder="subtitulo" value={imagen} onChange={e => setImagen(e.target.value)} />
                <label>Nº de Páginas:</label>
                <input type="number" placeholder="nº de páginas" value={paginas} onChange={e => setPaginas(e.target.value)} />
                <label>Género:</label>
                <input type="text" placeholder="genero" value={genero} onChange={e => setGenero(e.target.value)} required />
                <label>Palabras Clave:</label>
                <input type="text" placeholder="tesoro, viaje ..." value={keywords} onChange={e => setKeywords(e.target.value)} />

                <button type="submit">Añadir</button>
            </form>
            <p> {mensaje} </p>
        </>
    )
}

export default InputCreate;