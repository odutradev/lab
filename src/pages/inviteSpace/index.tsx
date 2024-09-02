import { TextField, Button, Grid, Typography, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getSpaceById, ISpaceData, acceptInvite, denyInvite, getSpaceUsersById } from "../../actions/space";
import DashboardLayout from "../../components/layout";
import { IUserData } from "../../actions/user";
import useUserStore from "../../store/user";
import useAction from "../../hooks/useAction";

const InviteSpace = () => {
    const [spaceUsers, setSpaceUsers] = useState<IUserData[] | null>(null);
    const [space, setSpace] = useState<ISpaceData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useUserStore(x => x);
    const { spaceID } = useParams();
    const navigate = useNavigate();

    const getParamsSpace = async () => {
        setLoading(true);
        var [responseSpace, responseUsers] = await Promise.all([
            getSpaceById(spaceID as string),
            getSpaceUsersById(spaceID as string)
        ]);
        setLoading(false);
        if ('error' in responseSpace) return;
        setSpace(responseSpace);
        if ('error' in responseUsers) return;
        setSpaceUsers(responseUsers);
    };

    const handleAccept = () => useAction({
        action: async () =>  await acceptInvite(spaceID as string, user?._id as string),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Aceitando convite',
            success: 'Convite aceito',
            error: 'Erro ao aceito',
        }
    });
    const handleDeny = () => useAction({
        action: async () =>  await denyInvite(spaceID as string, user?._id as string),
        callback: () => navigate(-1),
        toastMessages: {
            pending: 'Negando convite',
            success: 'Convite negado',
            error: 'Erro ao negar',
        }
    });

    useEffect(() => {
        if (!user?.spaces.find(x => x.id == spaceID)) return navigate(-1);
        getParamsSpace();
    }, [spaceID]);

    return (
        <DashboardLayout loading={loading} title="AVALIAR CONVITE" disableGetUser>
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
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="Nome"
                                    name="name"
                                    value={space.name}
                                    fullWidth
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                <TextField
                                    label="ID"
                                    name="ID"
                                    value={space._id}
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
                                    fullWidth
                                    disabled
                                />
                            </Grid>

                            {spaceUsers && spaceUsers.length > 0 && (
                                <Grid item xs={12} style={{ marginBottom: '15px' }}>
                                    <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                        Usuários Participantes
                                    </Typography>
                                    <List>
                                    {spaceUsers.map((spaceUser) => {
                                                    const userSpace = spaceUser?.spaces.find(x => x.id == spaceID);
                                                    const hasSpaceMember = userSpace?.invite == false;
                                                    const hasSpaceInvited = userSpace?.invite == true;
                                            return (
                                                <Box key={spaceUser._id}>
                                                    <ListItem alignItems="flex-start">
                                                        <ListItemAvatar>
                                                            <Avatar src={spaceUser.images?.avatar} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={spaceUser.name + `${hasSpaceMember ? ' (membro)' : ''}` + `${hasSpaceInvited ? ' (convidado)' : ''}`}
                                                            secondary={`${spaceUser.email} - ${spaceUser.role}`}
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
                                    <Button variant="outlined" onClick={handleDeny} fullWidth>
                                        Negar convite
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" color="primary" onClick={handleAccept} fullWidth>
                                        Aceitar convite
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

export default InviteSpace;
