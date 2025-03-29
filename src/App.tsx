import './App.css';
import AppRoutes from './routes/app_routes';
import { UserProvider } from "./contexts/user/UserContext";

function App() {
  return (
    <UserProvider >
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
