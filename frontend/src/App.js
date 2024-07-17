// dependencies
import { BrowserRouter as Router } from "react-router-dom";

// components
import AnimatedRoutes from "./Components/AnimatedRoutes.js";
import { UserProvider } from './contexts/usercontext';
import ChatbaseChatbotEmbed from './Components/ChatbaseChatbotEmbed';
function App() {
  return (
    <Router>
    <UserProvider>
      <main className='App'>
        <AnimatedRoutes />
        <ChatbaseChatbotEmbed />
      </main>
      </UserProvider>
    </Router>
  );
}

export default App;
