import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, clearToken } from '../Auth/auth';
import toast from 'react-hot-toast';
import './Dashboard.css';

const API_URL = 'http://localhost:3000';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch {
      toast.error('Erro ao buscar tarefas');
    }
  };

  const createTask = async () => {
    if (!newTask) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ 
          title: newTask,
          description: newDescription 
        }),
      });
      if (res.ok) {
        toast.success('Tarefa criada');
        setNewTask('');
        setNewDescription('');
        fetchTasks();
      } else {
        toast.error('Erro ao criar tarefa');
      }
    } catch {
      toast.error('Erro inesperado');
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === taskId);
      if (!taskToUpdate) return;

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          ...taskToUpdate,
          completed: !taskToUpdate.completed
        }),
      });

      if (res.ok) {
        fetchTasks(); // Recarrega todas as tarefas
        toast.success('Status da tarefa atualizado!');
      } else {
        throw new Error('Falha na atualização');
      }
    } catch (error) {
      toast.error('Erro ao atualizar tarefa');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.ok) {
        toast.success('Tarefa removida');
        fetchTasks();
      }
    } catch {
      toast.error('Erro ao deletar tarefa');
    }
  };

  const logout = () => {
    clearToken();
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="header">
          <h1 className="dashboard-title">Minhas Tarefas</h1>
          <button onClick={logout} className="logout-btn">Sair</button>
        </div>

        <div className="task-section">
          <h2 className="task-count">Total de Tarefas: {tasks.length}</h2>
          
          <div className="new-task-form">
            <input
              placeholder="Título da tarefa"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="task-input"
            />
            <textarea
              placeholder="Descrição"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="description-input"
            />
            <button onClick={createTask} className="add-task-btn">
              Adicionar Tarefa
            </button>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => toggleTaskCompletion(task._id)}
                    className={`complete-btn ${task.completed ? 'completed' : ''}`}
                  >
                    {task.completed ? '✓' : 'Marcar'}
                  </button>
                  <button 
                    onClick={() => deleteTask(task._id)}
                    className="delete-btn"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}