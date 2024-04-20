import { useState } from "react";

function InputCreate () {

    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [newTask, setNewTask] = useState('');

    const urlApi = 'http://localhost:3000/create'

    const send = async (e) => {
        e.preventDefault();
        setNewTask('');
        try{
            if(title.trim() !== ''){
                const response = await fetch(urlApi, {
                    method: 'POST', 
                    headers: {
                    'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({title}), 
                });
                if(response.ok){
                    const tarea = await response.json()    
                    setNewTask(tarea.title);
                    setTitle('')
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
                <input type="text" placeholder="añade una tarea" value={title} onChange={e => setTitle(e.target.value)} />
                <button type="submit">Añadir</button>
            </form>
            <p>Se ha enviado la tarea: {newTask} </p>
        </>
    )
}

export default InputCreate;