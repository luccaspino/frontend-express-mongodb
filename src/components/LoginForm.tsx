import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../Auth/auth';
import toast from 'react-hot-toast';
import './LoginForm.css';

const API_URL = 'http://localhost:3000';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading('Entrando...');
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: form.username, password: form.password }),
        redirect: 'manual'
      });
      const data = await res.json();
      toast.dismiss();
      if (res.ok) {
        setToken(data.token);
        toast.success('Login feito!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Erro no login');
      }
    } catch {
      toast.dismiss();
      toast.error('Erro ');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Usuário"
            type="text"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Senha"
            type="password"
            onChange={handleChange}
            required
          />
          <button className="login-button">Entrar</button>
        </form>
      </div>
      <div className="register-link">
        <span>Cadastre-se. </span>
        <button onClick={goToRegister} className="register-button">
          Cadastre-se
        </button>
      </div>
    </div>
  );
}