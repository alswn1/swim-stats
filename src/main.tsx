import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserLogProvider } from './contexts/UserLogContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <UserLogProvider>
        <App />
      </UserLogProvider>
    </AuthProvider>
  </BrowserRouter>
);
