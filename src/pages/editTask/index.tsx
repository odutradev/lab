import { TextField, Button, Grid, MenuItem, Typography, IconButton, Menu, MenuItem as MUIMenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import { getTaskById, ITaskAndSubs, updateTaskById, deleteTaskById } from "../../actions/task";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardLayout from "../../components/layout";      
import useAction from "../../hooks/useAction";

const EditTask = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

    const handleDeleteTask = () => useAction({
        action: async () => {
            if (taskID) deleteTaskById(taskID);
        },
        callback: handleBack,
        toastMessages: {
          pending: "Apagando tarefa",
          success: "Tarefa apagada com sucesso",
          error: "Erro ao apagar tarefa",
        },
    });

    const handleBack = () => navigate(-1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({
            ...task!,
            [e.target.name]: e.target.value,
            order: e.target.name === "status" ? undefined : task?.order
        });
    };

    const handleCopy = (text: string) => navigator.clipboard.writeText(text);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const formatDateForInput = (date: string | Date): string => {
        return new Date(date).toISOString().slice(0, 16);
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
                            <Grid container justifyContent="flex-end">
                                <IconButton onClick={handleMenuOpen} style={{ margin: "20px 0"}}>
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MUIMenuItem onClick={() => handleCopy(taskID as string)}>
                                        Copiar ID
                                    </MUIMenuItem>
                                    <MUIMenuItem onClick={() => handleCopy(window.location.href)}>
                                        Copiar URL
                                    </MUIMenuItem>
                                    <MUIMenuItem onClick={handleDeleteTask}>
                                        Apagar Tarefa
                                    </MUIMenuItem>
                                </Menu>
                            </Grid>
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
                            <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Agendar inicio da tarefa"
                                        name="scheduling"
                                        type="date"
                                        value={task.scheduling ? new Date(task.scheduling).toISOString().split("T")[0] : undefined}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange} 
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Data Limite"
                                        name="deadline"
                                        type="date"
                                        value={task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : undefined}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={handleChange} 
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                                {task.lastUpdate && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Ultima alteração"
                                            name="lastUpdate"
                                            type="datetime-local"
                                            value={formatDateForInput(task.lastUpdate)}
                                            InputLabelProps={{ shrink: true }}
                                            disabled
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                                {task.createAt && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Data de criação"
                                            name="createAt"
                                            type="datetime-local"
                                            value={formatDateForInput(task.createAt)}
                                            InputLabelProps={{ shrink: true }}
                                            disabled
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                                {(task.startIn || task.endIn) && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Data de inicio"
                                            name="startIn"
                                            type={task.startIn ? "datetime-local" : "date"}
                                            value={task.startIn ? formatDateForInput(task.startIn) : undefined}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                )}
                                {(task.endIn || task.startIn) && (
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Data de finalização"
                                            name="endIn"
                                            type={task.endIn ? "datetime-local" : "date"}
                                            value={task.endIn ? formatDateForInput(task.endIn) : undefined}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={handleChange}
                                            fullWidth
                                            disabled
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
                            Tarefa não encontrada.
                        </Typography>
                    )}
                    <Grid container spacing={2} justifyContent="center" style={{ marginTop: 15}}>
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