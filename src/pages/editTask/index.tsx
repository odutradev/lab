import { TextField, Button, Grid, MenuItem, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { getTaskById, ITaskAndSubs, updateTaskById } from "../../actions/task";
import DashboardLayout from "../../components/layout";      
import useAction from "../../hooks/useAction";

const EditTask = () => {
    const [task, setTask] = useState<ITaskAndSubs | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { taskID } = useParams();
    const navigate = useNavigate();

    const getParamsTask = async () => {
        setLoading(true);
        const response = await getTaskById(taskID as string);
        setLoading(false);
        if ('error' in response) return;
        setTask(response);
    };

    const handleUpdateTask = () => useAction({
        action: async () => {
            if (taskID && task) updateTaskById(taskID, task);
        },
        callback: handleBack,
        toastMessages: {
          pending: "Atualizando tarefa",
          success: "Tarefa atualizada com sucesso",
          error: "Erro ao atualizar tarefa",
        },
    });

    const handleBack = () => {
        navigate(-1); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task!,
            [e.target.name]: e.target.value,
            order: e.target.name === "status" ? undefined : task?.order
        });
    };

    useEffect(() => {
        getParamsTask();
    }, [taskID]);

    return (
        <DashboardLayout loading={loading} title="EDITAR TAREFA" disableGetUser>
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                {task ? (
                        <>
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
                                    onChange={(value: any) => setTask({ ...task!, content: value || '' })}
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
                                    fullWidth
                                >
                                    <MenuItem value="active">Ativa</MenuItem>
                                    <MenuItem value="inactive">Inativa</MenuItem>
                                    <MenuItem value="completed">Finalizada</MenuItem>
                                    <MenuItem value="pending">Pendente</MenuItem>
                                    <MenuItem value="blocked">Bloqueada</MenuItem>
                                </TextField>
                            </Grid>
                            {task.lastUpdate && (
                                <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                    <TextField
                                        label="Ultima alteração"
                                        name="lastUpdate"
                                        type="date"
                                        value={task.lastUpdate}
                                        InputLabelProps={{ shrink: true }}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                            )}
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
                            {task.startIn && (
                                <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                    <TextField
                                        label="Data de inicio"
                                        name="startIn"
                                        type="date"
                                        value={task.startIn}
                                        InputLabelProps={{ shrink: true }}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                            )}
                            {task.endIn && (
                                <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                    <TextField
                                        label="Data de finalização"
                                        name="endIn"
                                        type="date"
                                        value={task.endIn}
                                        InputLabelProps={{ shrink: true }}
                                        disabled
                                        fullWidth
                                    />
                                </Grid>
                            )}
                        </>
                    ) : (
                        <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
                            Tarefa não encontrada.
                        </Typography>
                    )}
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Button variant="outlined" onClick={handleBack} fullWidth>
                                Voltar
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button variant="contained" color="primary" onClick={handleUpdateTask} fullWidth>
                                Salvar Tarefa
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default EditTask;