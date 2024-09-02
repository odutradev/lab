import { Box, Grid, Typography, Card, CardContent, Tabs, Tab, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { useState } from "react";

import DashboardLayout from "../../components/layout";
import { createSpace } from "../../actions/space";
import useMenuStore from "../../store/menu";
import useUserStore from "../../store/user";

const Spaces = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [spaceName, setSpaceName] = useState<string>('');
    const { menu } = useMenuStore(x => x);
    const { user } = useUserStore(x => x);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleTabChange = (newValue: number) => {
        setTabValue(newValue);
    };

    const handleCardClick = (id: string) => {
        navigate(`/dashboard/edit-space/${id}`);
    };

    const handleCreateSpace = async () => {
        const send = async () => {
            const result = await createSpace({ name: spaceName });
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }
        };
        await toast.promise(
            send(),
            {
                pending: 'Criando espaço',
                success: 'Espaço criado',
                error: 'Erro ao criar',
            }
        );
        setOpenModal(false);
        setSpaceName('');
    };

    const mySpaces = user?.spaces.filter(space => space.invite === false || space.invite === undefined);
    const invitations = user?.spaces.filter(space => space.invite === true);

    return (
        <DashboardLayout title="ESPAÇOS">
            <Box textAlign="center" p={2}>
                <Tabs value={tabValue} onChange={(e, value) => {
                    handleTabChange(value)
                    typeof e
                    }} centered>
                    <Tab label="Meus Espaços" />
                    <Tab label="Convites" />
                </Tabs>
                <Box p={2} marginTop='25px'>
                    {tabValue === 0 ? (
                        <Grid container spacing={2} justifyContent="center">
                            { mySpaces && mySpaces.length > 0 ? (
                                <>
                                    {mySpaces.map(space => (
                                        <Grid item key={space.id} xs={12} sm={6} md={4} lg={3}>
                                            <Card
                                                onClick={() => handleCardClick(space.id)}
                                                style={{
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '200px',
                                                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                    borderRadius: 8
                                                }}
                                            >
                                                <CardContent style={{ textAlign: 'center' }}>
                                                    <Typography variant="h6">{space.name}</Typography>
                                                    {space.id === menu.selectedSpace && (
                                                        <Chip
                                                            color="primary"
                                                            icon={<CheckCircleOutlineIcon />}
                                                            size="small"
                                                            label="selecionado"
                                                            style={{ marginTop: 8 }}
                                                        />
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            onClick={() => setOpenModal(true)}
                                            style={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '200px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                borderRadius: 8
                                            }}
                                        >
                                            <CardContent style={{ textAlign: 'center' }}>
                                                <AddIcon style={{ fontSize: 70, color: theme.palette.primary.main }} />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </>
                            ) : (
                                <Typography variant="h6">Você não tem nenhum espaço.</Typography>
                            )}
                        </Grid>
                    ) : (
                        invitations && invitations.length > 0 ? (
                            <Grid container spacing={2} justifyContent="center">
                                {invitations.map(space => (
                                    <Grid item key={space.id} xs={12} sm={6} md={4} lg={3}>
                                        <Card
                                            onClick={() => handleCardClick(space.id)}
                                            style={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '200px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                                                borderRadius: 8
                                            }}
                                        >
                                            <CardContent style={{ textAlign: 'center' }}>
                                                <Typography variant="h6">{space.name}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="h6">Você não tem nenhum convite.</Typography>
                        )
                    )}
                </Box>
            </Box>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Criar Novo Espaço</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome do Espaço"
                        fullWidth
                        value={spaceName}
                        onChange={(e) => setSpaceName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleCreateSpace} color="primary">
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
        </DashboardLayout>
    );
};

export default Spaces;
