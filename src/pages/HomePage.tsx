import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Task Manager
        </Typography>
        <Typography variant="h5" gutterBottom>
          Manage your tasks efficiently
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/login"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
