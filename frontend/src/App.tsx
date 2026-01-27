import React from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  );
}

export default App;