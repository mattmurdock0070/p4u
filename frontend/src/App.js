// dependencies
import { BrowserRouter as Router } from "react-router-dom";

// components
import AnimatedRoutes from "./Components/AnimatedRoutes.js";
import { UserProvider } from './contexts/usercontext';

function App() {
  return (
    <Router>
    <UserProvider>
      <main className='App'>
        <AnimatedRoutes />
      </main>
      </UserProvider>
    </Router>
  );
}

export default App;
