import { useContext, useState } from "react";
import { AuthContext } from "../hooks/AuthContext.jsx";


function InputCreate () {

    const { usuario } = useContext(AuthContext);

    const [titulo, setTitulo] = useState('');
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState('');

    const urlApi = 'http://localhost:3000/create'

    const token =  usuario.accessToken;
        console.log('userTok', token);

    const send = async (e) => {
        e.preventDefault();
        setNewTask('');
        try{
            if(titulo.trim() !== ''){
                const response = await fetch(urlApi, {
                    method: 'POST', 
                    headers: {
                      'Authorization': `Bearer ${token}`, 
                      'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({titulo}), 
                });
                if(response.ok){
                    const tarea = await response.json()    
                    setNewTask(tarea.titulo);
                    setTitulo('')
                    setError(null)
                }
                else{
                    setError('algo ha fallado')
                }
            }
            else{
                setError('introduce una tarea')
            }
        }
        catch(err){
            console.log(err)
            setError(err)
        }
    }
    
    return (
        <>
            <form onSubmit={send}>
                <input type="text" placeholder="añade una tarea" value={titulo} onChange={e => setTitulo(e.target.value)} />
                <button type="submit">Añadir</button>
            </form>
            <p>Se ha enviado la tarea: {newTask} </p>
        </>
    )
}

export default InputCreate;