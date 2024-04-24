import { createContext, useState, useEffect } from "react";

export const LibrosContext = createContext();

export const LibrosProvider = ({children}) => {
    const [libros, setLibros] = useState([]);
    const urlApi = 'http://localhost:3000';

    
    const  fetchData = async () =>{
        try{
            const response = await fetch(urlApi)
            const resData = await response.json();
            setLibros(resData);
            console.log('libro', resData)
        }
        catch(error){
            console.log(error)
        }
    }
  
    useEffect(() => {
        fetchData()
    }, [libros])
    return(
        <LibrosContext.Provider value={{libros}} >
            {children}
        </LibrosContext.Provider>
    )
    
}

export default LibrosContext;
