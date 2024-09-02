import { TextField, Button, Grid, Typography, MenuItem, Avatar, Dialog, DialogContent } from "@mui/material";
import { useState, useEffect } from "react";

import { IUserData, updateUser } from "../../actions/user";
import DashboardLayout from "../../components/layout";
import useUserStore from "../../store/user";
import ProfileModal from "./components/modal";
import useAction from "../../hooks/useAction";

const Profile = () => {
    const [editUser, setEditUser] = useState<IUserData | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const { user } = useUserStore(x => x);

    const handleUpdateUser = () => useAction({
        action: async () =>  await updateUser(editUser as IUserData),
        toastMessages:                 {
            pending: 'Atualizando usuário',
            success: 'Usuário atualizado',
            error: 'Erro ao atualizar',
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUser({
            ...editUser!,
            [e.target.name]: e.target.value,
        });
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    useEffect(() => {
        setEditUser(user);
    }, [user]);

    useEffect(() => {
        if (editUser?.images != user?.images) handleUpdateUser();
    },[editUser?.images])

    return (
        <DashboardLayout title="PERFIL">
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                    {editUser ? (
                        <>
                            <Grid container direction="column" alignItems="center" style={{ marginBottom: '25px' }}>
                                <Avatar
                                    src={editUser?.images?.avatar || undefined}
                                    style={{ width: 80, height: 80, marginBottom: '10px' }}
                                    onClick={handleOpenModal}
                                >
                                    {!editUser?.images?.avatar && editUser.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                                </Avatar>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    value={editUser.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={editUser.email}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="ID"
                                    name="ID"
                                    value={editUser._id}
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
                                    value={editUser.role}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
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
                                    value={editUser.status}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
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
                                    disabled
                                    value={new Date(editUser.createAt).toISOString().split('T')[0]}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                />
                            </Grid>
                            {
                                editUser.approvedAt && (
                                    <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                        <TextField
                                            label="Data de Aprovação"
                                            name="createAt"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            value={new Date(editUser.approvedAt).toISOString().split('T')[0]}
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
                                    value={editUser.contact || ''}
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
                                    value={editUser.description || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Espaços"
                                    name="spaces"
                                    value={editUser.spaces.map(space => space.name).join(', ')}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} md={6}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdateUser}
                                        fullWidth
                                    >
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
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogContent>
                    <ProfileModal handleCloseModal={handleCloseModal} onHandleLink={(link) => {
                        handleCloseModal();
                        setEditUser(prev => prev ? { ...prev, images: { ...prev.images, avatar: link as string }} : null);
                    }}/>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default Profile;
