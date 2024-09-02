import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

import { resetPassword } from '../../../../actions/user';
import { ResetPasswordStepProps } from '../../types';
import useAction from '../../../../hooks/useAction';

const Reset: React.FC<ResetPasswordStepProps> = ({ state }) => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
            password: data.get('password') as string,
        };

        useAction({
            action: async () =>  await resetPassword({ ...state, ...form }),
            callback: () => navigate('/dashboard'),
            toastMessages: {
                pending: 'Redefinindo senha',
                success: 'Senha redefinida com sucesso',
                error: 'Erro ao redefinir a senha',
            }
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h4" align="center" gutterBottom>
                                Nova Senha
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                                Insira sua nova senha abaixo.
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Nova Senha"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar Senha"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    sx={{ mb: 3 }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ mt: 2 }}
                                >
                                    Redefinir Senha
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Reset;
