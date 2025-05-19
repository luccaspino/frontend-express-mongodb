import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './RegisterForm.css';

const API_URL = 'http://localhost:3000';

export default function RegisterForm() {
  const [form, setForm] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    toast.loading('Criando conta...');

    try {
      // Validação básica
      if (!form.username || !form.email || !form.password) {
        throw new Error('Preencha todos os campos');
      }

      if (form.password.length < 6) {
        throw new Error('Preencha a senha');
      }

      // URL CORRETA: /users/register
      const res = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro no cadastro');
      }

      toast.success('Cadastro realizado ');
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no registro:', error);
      toast.error(error.message || 'Erro ao cadastrar. ');
    } finally {
      toast.dismiss();
      setIsSubmitting(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register-wrapper">
      <div className="form-container">
        <h1 className="form-title">Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Usuário"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            minLength={3}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Senha (mínimo 6 caracteres)"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <button 
            type="submit" 
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </div>
      <div className="login-link">
        <span>Já tem uma conta? </span>
        <button onClick={goToLogin} className="login-redirect-button">
          Faça login
        </button>
      </div>
    </div>
  );
}