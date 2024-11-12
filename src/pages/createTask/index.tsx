import { TextField, Button, Grid, Typography, MenuItem, Avatar, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getUserById, updateUserById, deleteUser } from "../../actions/admin";
import DashboardLayout from "../../components/layout";
import { IUserData } from "../../actions/user";
import useAction from "../../hooks/useAction";

const CreateTask = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUserData | null>(null);
    const { userID } = useParams();
    const navigate = useNavigate();

    const getParamsUser = async () => {
        setLoading(true);
        const response = await getUserById(userID as string);
        setLoading(false);
        if ('error' in response) return;
        setUser(response);
    };

    const handleUpdateUser = () => useAction({
        action: async () =>  await updateUserById(userID as string, user as IUserData),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Atualizando usuário',
            success: 'Usuário atualizado',
            error: 'Erro ao atualizar',
        }
    });

    const handleDeleteUser = () => useAction({
        action: async () =>  await deleteUser(userID as string),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Apagando usuário',
            success: 'Usuário apagado',
            error: 'Erro ao apagar',
        }
    });

    const handleBack = () => {
        navigate(-1); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user!,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        getParamsUser();
    }, [userID]);

    return (
        <DashboardLayout loading={loading} title="CRIAR TAREFA" disableGetUser>
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                    {user ? (
                        <>
                            <Grid container direction="row" alignItems="center" justifyContent="center" gap={"10px"} style={{ marginBottom: '25px' }}>
                                <Avatar
                                    src={user.images?.avatar || undefined}
                                    style={{ width: 80, height: 80, marginBottom: '10px' }}
                                >
                                    {!user.images?.avatar && user.name.split(' ').map(name => name[0]).join('').toUpperCase()}
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
                                    value={user.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="ID"
                                    name="ID"
                                    value={user._id}
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
                                    value={user.role}
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
                                    value={user.status}
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
                                    value={new Date(user.createAt).toISOString().split('T')[0]}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            {
                                user.approvedAt && (
                                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                        <TextField
                                            label="Data de Aprovação"
                                            name="createAt"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={new Date(user.approvedAt).toISOString().split('T')[0]}
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
                                    value={user.contact || ''}
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
                                    value={user.description || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Espaços"
                                    name="spaces"
                                    value={user.spaces.map(space => space.name).join(', ')}
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
                                    <Button variant="contained" color="primary" onClick={handleUpdateUser} fullWidth>
                                        Atualizar Usuário
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
                            Usuário não encontrado.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default CreateTask;
