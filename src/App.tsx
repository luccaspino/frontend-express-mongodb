import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { getToken } from "./Auth/auth";
import type { JSX } from 'react';
import './App.css';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  return getToken() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;