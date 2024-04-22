import { useEffect, useContext ,useState} from "react";
import { AuthContext } from "../hooks/AuthContext.jsx";
//import { withRouter } from "react-router";


function Profileuser(){

    const { usuario } = useContext(AuthContext);
 /*   const [nombre, setnombre] = useState(null)

    useEffect(() => {
        
      

        usuario ?
        usuario.displayName?
        setnombre(usuario.displayName)
        :
        setnombre(usuario.email)
        :
        setnombre(null)
       
    }, [usuario]);
*/

//console.log('tokenFront', usuario.accessToken)
    return(
        <p>perfil usu {usuario.email} </p>
    )
}

export default Profileuser;

