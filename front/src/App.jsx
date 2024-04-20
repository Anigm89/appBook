import RoutesApp from "./routes/RoutesApp";
import './App.css'; // Archivo de estilos CSS
import { AuthProvider } from "./hooks/AuthContext.jsx";

const App = () => {

return(

  <AuthProvider>
     <RoutesApp />  
  </AuthProvider>

)
  
};

export default App;
