import { Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
 import RegisterForm from '../components/auth/RegisterForm';

export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Typography>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </Paper>
    </Container>
  );
}