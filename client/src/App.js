import MainRouter from "./MainRouter";
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from "./context/authProvider";

function App() {
  return (
    <AuthProvider>
    <Router>
     <MainRouter/>
    </Router>
    </AuthProvider>
  );
}

export default App;
