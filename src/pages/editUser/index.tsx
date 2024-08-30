import { TextField, Button, Grid, Typography, MenuItem, Avatar } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "../../components/layout";
import { getUserById, updateUserById } from "../../actions/admin";
import { IUserData } from "../../actions/user";

const EditUser = () => {
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

    const handleUpdateUser = async () => {
        if (user) {
            const send = async () => {
                const result = await updateUserById(userID as string, user);
                if (result && typeof result === 'object' && 'error' in result) {
                    toast.warning(result.error);
                    throw new Error(result.error);
                }        
                setTimeout(() => navigate(-1), 500)
            };
            await toast.promise(
                send(),
                {
                    pending: 'Atualizando usuario',
                    success: 'Usuario atualizado',
                    error: 'Erro o atualizar',
                }
            );
        }
    };

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
        <DashboardLayout loading={loading} title="EDITAR USUÁRIO">
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                    {user ? (
                        <>
                            <Grid container direction="column" alignItems="center" style={{ marginBottom: '25px' }}>
                                <Avatar
                                    style={{ width: 80, height: 80, marginBottom: '10px' }}
                                >
                                    {user.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                                </Avatar>
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

export default EditUser;
