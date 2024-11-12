import { TextField, Button, Grid, MenuItem, Avatar, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


import { defaultCreateTask } from "../tasks/modals/create/defaultValues";          
import { createTask, ITaskCreate } from "../../actions/task";
import useQueryParams from "../../hooks/useQueryParams";
import DashboardLayout from "../../components/layout";
import useAction from "../../hooks/useAction";
import { CreateTaskParams } from "./types";

const CreateTask = () => {
    const [task, setTask] = useState<ITaskCreate>(defaultCreateTask);

    const { status, order } = useQueryParams<CreateTaskParams>();
    const navigate = useNavigate();

    const handleCreateTask = () => useAction({
        action: async () => createTask({...task, status, order: Number(order) }),
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
        });
    };

    return (
        <DashboardLayout title="CRIAR TAREFA" disableGetUser>
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                    <Grid container direction="row" alignItems="center" justifyContent="center" gap={"10px"} style={{ marginBottom: '25px' }}>
                        <Avatar
                            src={task.images?.avatar || undefined}
                            style={{ width: 80, height: 80, marginBottom: '10px' }}
                        >
                            {!task.images?.avatar && task.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                        </Avatar>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width={40}
                            height={40}
                            borderRadius="50%"
                            bgcolor="red"
                            boxShadow={1}
                            onClick={handleDeleteUser}
                            style={{ cursor: 'pointer' }}
                        >
                            <DeleteIcon style={{ fontSize: 20, color: '#fafafa' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Nome"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Email"
                            name="email"
                            value={task.email}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="ID"
                            name="ID"
                            value={task._id}
                            onChange={handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            select
                            label="Cargo"
                            name="role"
                            value={task.role}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="admin">Administrador</MenuItem>
                            <MenuItem value="normal">Normal</MenuItem>
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
                            <MenuItem value="logged">Logado</MenuItem>
                            <MenuItem value="registered">Registrado</MenuItem>
                            <MenuItem value="blocked">Bloqueado</MenuItem>
                            <MenuItem value="pending">Pendente</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Data de Criação"
                            name="createAt"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={new Date(task.createAt).toISOString().split('T')[0]}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    {
                        task.approvedAt && (
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Data de Aprovação"
                                    name="createAt"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={new Date(task.approvedAt).toISOString().split('T')[0]}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                        )
                    }
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Contato"
                            name="contact"
                            value={task.contact || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Descrição"
                            name="description"
                            multiline
                            rows={4}
                            value={task.description || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                        <TextField
                            label="Espaços"
                            name="spaces"
                            value={task.spaces.map(space => space.name).join(', ')}
                            disabled
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
                                Atualizar Usuário
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default CreateTask;
