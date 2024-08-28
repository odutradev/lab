import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import React from 'react';

import { requestResetPassword } from '../../../../actions/user';
import { ResetPasswordStepProps } from '../../types';

const Request: React.FC<ResetPasswordStepProps> = ({ state, setState }) => {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const form: { email: string } = {
            email: data.get('email') as string,
        };
        const send = async () => {
            const result = await requestResetPassword(form);
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }        
            setInterval(() => setState({ ...state, step: 'validate' }), 500);
        };
        await toast.promise(
            send(),
            {
                pending: 'Enviando solicitação',
                success: 'Solicitação enviada',
                error: 'Erro na solicitação',
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
                                Redefinição de Senha
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                                Insira seu email para receber um código de redefinição de senha.
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
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
                                    Enviar Código
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Request;
