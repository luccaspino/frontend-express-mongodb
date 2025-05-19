import { Container } from '@mui/material';
import TaskList from '../components/tasks/TaskList';

import Navbar from '../components/Navbar';

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <TaskList />
      </Container>
    </>
  );
}