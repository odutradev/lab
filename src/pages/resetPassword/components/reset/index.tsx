import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import React from 'react';

import { resetPassword } from '../../../../actions/user';
import { ResetPasswordStepProps } from '../../types';
import useUserStore from '../../../../store/user';

const Reset: React.FC<ResetPasswordStepProps> = ({ state }) => {
    const { setUser } = useUserStore(x => x);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form = {
            email: state.email,
            password: data.get('password') as string,
        };
        const send = async () => {
            const result = await resetPassword({ ...state, ...form });
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }
            setUser(result);
        };
        await toast.promise(
            send(),
            {
                pending: 'Redefinindo senha',
                success: 'Senha redefinida com sucesso',
                error: 'Erro ao redefinir a senha',
            }
        );
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
