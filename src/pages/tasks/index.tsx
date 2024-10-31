import { Button, Card, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { getAllTasks, ITaskAndSubs } from "../../actions/task";
import DashboardLayout from "../../components/layout";
import useAction from "../../hooks/useAction";

const Tasks = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [ tasks, setTasks ] = useState<ITaskAndSubs[]>([]);

    const getTasks = async () => {
        const response = await getAllTasks();
        if ('error' in response) return;
        setTasks(response);
    };

    const handleCreateSpace = () => useAction({
        action: async () =>  {},
        callback: () => {
            
        },
        toastMessages:  {
            pending: 'Criando task',
            success: 'Task criada',
            error: 'Erro ao criar',
        }
    });

    const filteredTasks = tasks.filter((task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getTasks();
    }, [])

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
                <Button variant="contained" color="primary" sx={{ width: '15%' }}> Criar Tarefa </Button>
            </Grid>
            <Grid container justifyContent="center"  alignItems="center" flexDirection="column">
                {
                    filteredTasks && filteredTasks.map((task) => (
                        <div style={{ padding: '20px'}}>
                            {task.identificator} - {task.description}<br/>
                            {task.priority}<br/>
                            {task.status}
                        </div>
                    ))
                }

            </Grid>
        </DashboardLayout>
    );
};

export default Tasks;
