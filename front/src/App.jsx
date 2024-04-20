import RoutesApp from "./routes/RoutesApp";
import './App.css'; // Archivo de estilos CSS
import { UserProvider } from "./hooks/UserContext";

const App = () => {

return(

  <UserProvider>
     <RoutesApp />  
  </UserProvider>

)
  
};

export default App;
