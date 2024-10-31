import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllTasks, ITaskAndSubs } from "../../actions/task";
import DashboardLayout from "../../components/layout";
import useAction from "../../hooks/useAction";
import Task from "./components/task";

const Tasks = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [tasks, setTasks] = useState<ITaskAndSubs[]>([]);

    const getTasks = async () => {
        const response = await getAllTasks();
        if ('error' in response) return;
        setTasks(response);
    };

    const handleCreateTask = () => useAction({
        action: async () => {},
        callback: () => {},
        toastMessages:  {
            pending: 'Criando task',
            success: 'Task criada',
            error: 'Erro ao criar',
        }
    });

    const filteredTasks = tasks.filter((task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const statusCategories = ['active', 'inactive', 'completed', 'pending', 'blocked'];
    const tasksByStatus = statusCategories.map(status => ({
        status,
        tasks: filteredTasks.filter(task => task.status === status)
    }));

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <DashboardLayout title="TAREFAS">
            <Grid container justifyContent="center" gap="1rem" style={{ marginTop: '25px', marginBottom: '25px' }}>
                <TextField
                    label="Pesquisar tarefa"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '80%' }}
                />
                <Button variant="contained" color="primary" sx={{ width: '15%' }} onClick={handleCreateTask}>Criar Tarefa</Button>
            </Grid>
            <Grid container spacing={2} justifyContent="space-around">
                {tasksByStatus.map(({ status, tasks }) => (
                    <Grid item xs={12} sm={6} md={2.4} key={status}>
                        <Typography variant="h6" align="center" gutterBottom>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Typography>
                        <Card variant="outlined" sx={{ padding: '10px', minHeight: '300px' }}>
                            {tasks.length > 0 ? (
                                tasks.map((task) => <Task task={task}/>)
                            ) : (
                                <Typography variant="body2" align="center" color="textSecondary">
                                    Sem tarefas
                                </Typography>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </DashboardLayout>
    );
};

export default Tasks;
