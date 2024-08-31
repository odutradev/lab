import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DashboardLayout from "../../components/layout";
import { getAllUsers } from "../../actions/admin";
import { IUserData } from "../../actions/user";

const Users = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUserData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const navigate = useNavigate();

    const getCurrentUsers = async () => {
        setLoading(true);
        const response = await getAllUsers();
        setLoading(false);
        if ('error' in response) return;
        setUsers(response);
    };

    const handleRowClick = (userId: string) => {
        navigate('/dashboard/admin/edit-user/' + userId);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        getCurrentUsers();
    }, []);

    return (
        <DashboardLayout loading={true} title="USUÁRIOS" disableGetUser positionRequired="admin">
            <Grid container justifyContent="center" style={{ marginTop: '25px', marginBottom: '25px' }}>
                <TextField
                    label="Pesquisar por nome ou email"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ maxWidth: '80vw' }}
                />
            </Grid>
            <Grid container justifyContent="center">
                {filteredUsers.length > 0 ? (
                    <TableContainer component={Paper} style={{ maxWidth: '80vw' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Cargo</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Data de Criação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow 
                                        key={user._id} 
                                        hover 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => handleRowClick(user._id)}
                                    >
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        <TableCell>{new Date(user.createAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="h6" align="center" color="textSecondary" style={{ marginTop: '20px' }}>
                        Nenhum usuário encontrado.
                    </Typography>
                )}
            </Grid>
        </DashboardLayout>
    );
};

export default Users;