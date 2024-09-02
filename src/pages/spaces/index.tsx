import { Box, Grid, Typography, Card, CardContent, Tabs, Tab, Chip } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import DashboardLayout from "../../components/layout";
import useMenuStore from "../../store/menu";

const Spaces = () => {
    const { menu } = useMenuStore(x => x);
    const [tabValue, setTabValue] = useState<number>(0);
    const navigate = useNavigate();
    const theme = useTheme();

    const handleTabChange = (newValue: number) => {
        setTabValue(newValue);
    };

    const handleCardClick = (id: string) => {
        navigate(`/dashboard/edit-space/${id}`);
    };

    const handleCreateSpace = () => {
        navigate('/dashboard/create-space');
    };

    const mySpaces = menu.spaces.filter(space => space.invite === false || space.invite === undefined);
    const invitations = menu.spaces.filter(space => space.invite === true);

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
                            {mySpaces.length > 0 ? (
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
                                            onClick={handleCreateSpace}
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
                        invitations.length > 0 ? (
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
        </DashboardLayout>
    );
};

export default Spaces;
