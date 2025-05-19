import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { getTasks, createTask } from '../../api/tasks';

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (title: string, description: string) => {
    await createTask(title, description);
    setIsCreating(false);
    fetchTasks();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">My Tasks</Typography>
        <Button variant="contained" onClick={() => setIsCreating(true)}>
          Add Task
        </Button>
      </Box>

      {isCreating && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {tasks.length === 0 && !isCreating ? (
        <Typography>No tasks yet. Create your first task!</Typography>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task._id} task={task} onUpdate={fetchTasks} />
        ))
      )}
    </Box>
  );
}