import { TextField, Button, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { createTask, ITaskCreate } from "../../actions/task";
import useQueryParams from "../../hooks/useQueryParams";
import DashboardLayout from "../../components/layout";
import { defaultCreateTask } from "./defaultValues";
import useAction from "../../hooks/useAction";
import { CreateTaskParams } from "./types";

const CreateTask = () => {
    const [task, setTask] = useState<ITaskCreate>(defaultCreateTask);

    const { status, order } = useQueryParams<CreateTaskParams>();
    const navigate = useNavigate();

    const handleCreateTask = () => useAction({
        action: async () => createTask(task),
        callback: handleBack,
        toastMessages: {
          pending: "Criando tarefa",
          success: "Tarefa criada com sucesso",
          error: "Erro ao criar tarefa",
        },
    });

    const handleBack = () => {
        navigate(-1); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task!,
            [e.target.name]: e.target.value,
            order: e.target.name === "status" ? undefined : task.order
        });
    };

    useEffect(() => {
        setTask({
            ...task,
            status,
            order: Number(order)
        });
    }, [status, order]);

    return (
        <DashboardLayout title="CRIAR TAREFA" disableGetUser>
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Descrição"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <MDEditor
                            value={task.content || ''}
                            onChange={(value) => setTask({ ...task!, content: value || '' })}
                            height={200}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            select
                            label="Prioridade"
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="high">Alta</MenuItem>
                            <MenuItem value="medium">Média</MenuItem>
                            <MenuItem value="low">Baixa</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            select
                            label="Status"
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                            defaultValue={status}
                            fullWidth
                        >
                            <MenuItem value="active">Ativa</MenuItem>
                            <MenuItem value="inactive">Inativa</MenuItem>
                            <MenuItem value="completed">Finalizada</MenuItem>
                            <MenuItem value="pending">Pendente</MenuItem>
                            <MenuItem value="blocked">Bloqueada</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Agendar inicio da tarefa"
                            name="scheduling"
                            type="date"
                            value={task.scheduling}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange} 
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Data Limite"
                            name="deadline"
                            type="date"
                            value={task.deadline}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange} 
                            fullWidth
                        />
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button variant="outlined" onClick={handleBack} fullWidth>
                                Voltar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color="primary" onClick={handleCreateTask} fullWidth>
                                Criar Tarefa
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default CreateTask;
