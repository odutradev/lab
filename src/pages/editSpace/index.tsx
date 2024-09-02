import { TextField, Button, Grid, Typography, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Modal } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react";

import { getSpaceById, ISpaceData, updateSpaceById, deleteSpaceById, getSpaceUsersById, inviteUser, leaveSpace } from "../../actions/space";
import DashboardLayout from "../../components/layout";
import { IUserData } from "../../actions/user";
import useAction from "../../hooks/useAction";
import useUserStore from "../../store/user";

const EditSpace = () => {
    const [spaceUsers, setSpaceUsers] = useState<IUserData[] | null>(null);
    const [openInviteModal, setOpenInviteModal] = useState<boolean>(false);
    const [emailToInvite, setEmailToInvite] = useState<string>('');
    const [space, setSpace] = useState<ISpaceData | null>(null);
    const [hasMember, setHasMember] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { spaceID } = useParams();
    const { user } = useUserStore();
    const navigate = useNavigate();

    const getParamsSpace = async () => {
        setLoading(true);
        var [responseSpace, responseUsers] = await Promise.all([
            getSpaceById(spaceID as string),
            getSpaceUsersById(spaceID as string)
        ]);
        const userSpace = user?.spaces.find(x => x.id == spaceID);
        setHasMember(userSpace?.invite == true || userSpace?.invite == false)
        setLoading(false);
        if ('error' in responseSpace) return;
        setSpace(responseSpace);
        if ('error' in responseUsers) return;
        setSpaceUsers(responseUsers);
    };

    const handleUpdateSpace = () => useAction({
        action: async () =>  await updateSpaceById(spaceID as string, space as ISpaceData),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Atualizando espaço',
            success: 'Espaço atualizado',
            error: 'Erro ao atualizar',
        }
    });
    
    const handleInvite = () => useAction({
        action: async () =>  await inviteUser(spaceID as string, emailToInvite),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Enviando convite',
            success: 'Convite enviado',
            error: 'Erro ao convidar',
        }
    });

    const handleDeleteUser = () => useAction({
        action: async () =>  await deleteSpaceById(spaceID as string),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Apagando espaço',
            success: 'Espaço apagado',
            error: 'Erro ao apagar',
        }
    });

    const handleLeaveSpace = () => useAction({
        action: async () =>  await leaveSpace(spaceID as string, user?._id as string),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Saindo do espaço',
            success: 'Você saiu do espaço',
            error: 'Erro ao sair',
        }
    });

    const handleBack = () => {
        navigate(-1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpace({
            ...space!,
            [e.target.name]: e.target.value,
        });
    };

    const openModal = () => {
        setOpenInviteModal(true);
    };

    const closeModal = () => {
        setOpenInviteModal(false);
    };

    useEffect(() => {
        if (!user?.spaces.find(x => x.id == spaceID)) return handleBack();
        getParamsSpace();
    }, [spaceID]);

    return (
        <DashboardLayout loading={loading} title="EDITAR ESPAÇO" disableGetUser>
            <Grid container justifyContent="center" style={{ marginTop: '25px' }}>
                <Grid item xs={12} md={8} style={{ maxWidth: '80vw' }}>
                    {space ? (
                        <>
                            <Grid container direction="row" alignItems="center" justifyContent="center" gap={"10px"} style={{ marginBottom: '25px' }}>
                                <Avatar
                                    src={space.images?.avatar || undefined}
                                    style={{ width: 80, height: 80, marginBottom: '10px' }}
                                >
                                    {!space.images?.avatar && space.name.split(' ').map(name => name[0]).join('').toUpperCase()}
                                </Avatar>
                                {
                                    !hasMember && (
                                        <>                              
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
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                width={40}
                                                height={40}
                                                borderRadius="50%"
                                                bgcolor=""
                                                boxShadow={1}
                                                onClick={openModal}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <PersonAddAlt1Icon style={{ fontSize: 20, color: '#fafafa' }} />
                                            </Box>
                                        </>
                                    )
                                }
                                {
                                    hasMember && (
                                        <>                              
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                width={40}
                                                height={40}
                                                borderRadius="50%"
                                                bgcolor="red"
                                                boxShadow={1}
                                                onClick={handleLeaveSpace}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <LogoutIcon style={{ fontSize: 20, color: '#fafafa' }} />
                                            </Box>
                                        </>
                                    )
                                }
                            </Grid>
                            <Modal open={openInviteModal} onClose={closeModal}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    width={'40vw'}
                                    p={4}
                                    bgcolor="#363636"
                                    borderRadius={4}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        outline: 'none'
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        Convidar Usuário
                                    </Typography>
                                    <TextField
                                        label="E-mail do Usuário"
                                        value={emailToInvite}
                                        onChange={(e) => setEmailToInvite(e.target.value)}
                                        fullWidth
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <Button variant="contained" color="primary" onClick={handleInvite}>
                                        Enviar Convite
                                    </Button>
                                </Box>
                            </Modal>

                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    value={space.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="ID"
                                    name="ID"
                                    value={space._id}
                                    onChange={handleChange}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Data de Criação"
                                    name="createAt"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={new Date(space.createAt).toISOString().split('T')[0]}
                                    InputProps={{ readOnly: true }}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Descrição"
                                    name="description"
                                    multiline
                                    rows={4}
                                    value={space.description || ''}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>

                            {spaceUsers && spaceUsers.length > 0 && (
                                <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                    <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                        Usuários Participantes
                                    </Typography>
                                    <List>
                                        {spaceUsers.map((user) => {
                                                    const userSpace = user?.spaces.find(x => x.id == spaceID);
                                                    const hasSpaceMember = userSpace?.invite == false;
                                                    const hasSpaceInvited = userSpace?.invite == true;
                                            return (
                                                <Box key={user._id}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar src={user.images?.avatar} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={user.name + `${hasSpaceMember ? ' (membro)' : ''}` + `${hasSpaceInvited ? ' (convidado)' : ''}`}
                                                            secondary={`${user.email} - ${user.role}`}
                                                        />
                                                    </ListItem>
                                                </Box>
                                            )
                                        })}
                                    </List>
                                </Grid>
                            )}

                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} md={6}>
                                    <Button variant="outlined" onClick={handleBack} fullWidth>
                                        Voltar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateSpace} fullWidth>
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="h5" color="textSecondary">
                            Espaço não encontrado
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default EditSpace;
