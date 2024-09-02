import { TextField, Button, Grid, Typography, Avatar, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { getSpaceById, ISpaceData, updateSpaceById, deleteSpaceById, getSpaceUsersById } from "../../actions/space";
import DashboardLayout from "../../components/layout";

const EditSpace = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [space, setSpace] = useState<ISpaceData | null>(null);
    const { spaceID } = useParams();
    const navigate = useNavigate();

    const getParamsSpace = async () => {
        setLoading(true);
        const response = await getSpaceById(spaceID as string);
        setLoading(false);
        if ('error' in response) return;
        setSpace(response);
    };

    const handleUpdateSpace = async () => {
        if (space) {
            const send = async () => {
                const result = await updateSpaceById(spaceID as string, space);
                if (result && typeof result === 'object' && 'error' in result) {
                    toast.warning(result.error);
                    throw new Error(result.error);
                }        
                setTimeout(() => navigate(-1), 500);
            };
            await toast.promise(
                send(),
                {
                    pending: 'Atualizando espaço',
                    success: 'Espaço atualizado',
                    error: 'Erro ao atualizar',
                }
            );
        }
    };

    const handleBack = () => {
        navigate(-1); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSpace({
            ...space!,
            [e.target.name]: e.target.value,
        });
    };

    const handleDeleteUser = async () => {
        if (space) {
            const send = async () => {
                const result = await deleteSpaceById(spaceID as string);
                if (result && typeof result === 'object' && 'error' in result) {
                    toast.warning(result.error);
                    throw new Error(result.error);
                }        
                setTimeout(() => navigate(-1), 500);
            };
            await toast.promise(
                send(),
                {
                    pending: 'Apagando espaço',
                    success: 'Espaço apagado',
                    error: 'Erro ao apagar',
                }
            );
        };
    };

    useEffect(() => {
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
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} md={6}>
                                    <Button variant="outlined" onClick={handleBack} fullWidth>
                                        Voltar
                                    </Button>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Button variant="contained" color="primary" onClick={handleUpdateSpace} fullWidth>
                                        Atualizar Espaço
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
                            Espaço não encontrado.
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </DashboardLayout>
    );
};

export default EditSpace;
