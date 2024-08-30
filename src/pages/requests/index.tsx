import { Card, CardContent, Typography, Grid, IconButton, Box } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAllPendingUsers, approveUser, disapproveUser } from "../../actions/admin";
import DashboardLayout from "../../components/layout";
import { IUserData } from "../../actions/user";

const Request = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUserData[]>([]);

    const getCurrentUsers = async () => {
        setLoading(true);
        const response = await getAllPendingUsers();
        setLoading(false);
        if ('error' in response) return;
        setUsers(response);
    };

    const handleApprove = async (userId: string) => {
        const send = async () => {
            const result = await approveUser(userId);
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }        
            getCurrentUsers();
        };
        await toast.promise(
            send(),
            {
                pending: 'Aprovando usuario',
                success: 'Usuario aprovado',
                error: 'Erro o aprovar',
            }
        );
    };

    const handleDisapprove = async (userId: string) => {
        const send = async () => {
            const result = await disapproveUser(userId);
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }        
            getCurrentUsers();
        };
        await toast.promise(
            send(),
            {
                pending: 'Desaprovando usuario',
                success: 'Usuario desaprovado',
                error: 'Erro ao desaprovar',
            }
        );
    };

    useEffect(() => {
        getCurrentUsers();
    }, []);

    return (
        <DashboardLayout loading={loading} title="SOLICITAÇÕES">
            <Grid container spacing={3} justifyContent="center" style={{ marginTop: '25px'}}>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Grid item key={user._id} xs={12} sm={10} md={8}>
                            <Card style={{ borderRadius: '15px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
                                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px' }}>
                                    <Box>
                                        <Typography variant="h6" style={{ fontWeight: 600 }}>
                                            {user.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {user.email}
                                        </Typography>
                                    </Box>
                                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton 
                                            onClick={() => handleApprove(user._id)} 
                                            style={{ color: 'green' }}
                                        >
                                            <CheckCircle fontSize="large" />
                                        </IconButton>
                                        <IconButton 
                                            onClick={() => handleDisapprove(user._id)} 
                                            style={{ color: 'red' }}
                                        >
                                            <Cancel fontSize="large" />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
                        Nenhum usuário pendente.
                    </Typography>
                )}
            </Grid>
        </DashboardLayout>
    );
};

export default Request;
