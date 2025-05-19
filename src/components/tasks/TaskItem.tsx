import { useState } from 'react';
import { Card, CardContent, Typography, Checkbox, IconButton, Box, CardActions } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import TaskForm from './TaskForm';
import { updateTask, deleteTask } from '../../api/tasks';

interface TaskItemProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
  };
  onUpdate: () => void;
}

export default function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = async () => {
    await updateTask(task._id, { completed: !task.completed });
    onUpdate();
  };

  const handleUpdate = async (title: string, description: string) => {
    await updateTask(task._id, { title, description });
    setIsEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    onUpdate();
  };

  if (isEditing) {
    return (
      <TaskForm
        initialTitle={task.title}
        initialDescription={task.description || ''}
        onSubmit={handleUpdate}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </Typography>
          <CardActions>
            <IconButton onClick={() => setIsEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </CardActions>
        </Box>
        {task.description && (
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}