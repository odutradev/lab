import { Box, Button, Container, Grid, TextField, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import React, { useRef } from 'react';

import { validateResetPassword } from '../../../../actions/user';
import { ResetPasswordStepProps } from '../../types';

const Validate: React.FC<ResetPasswordStepProps> = ({ state, setState }) => {
    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: { code: string } = {
            code: inputRefs.map(ref => ref.current?.value || '').join('')
        };
        const send = async () => {
            const result = await validateResetPassword({...state, ...form});
            if (result && typeof result === 'object' && 'error' in result) {
                toast.warning(result.error);
                throw new Error(result.error);
            }        
            setTimeout(() => setState({ ...state, ...form, step: 'reset' }), 500);
        };
        await toast.promise(
            send(),
            {
                pending: 'Validando código',
                success: 'Código validado',
                error: 'Erro na validação',
            }
        );
    };

    const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d?$/.test(value)) {
            if (value.length === 1 && index < inputRefs.length - 1) {
                inputRefs[index + 1].current?.focus();
            } else if (value.length === 0 && index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        }
    };

    const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && !inputRefs[index].current?.value) {
            inputRefs[index - 1].current?.focus();
        }
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
                                Validação de Código
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                                Insira o código de 4 dígitos que foi enviado para o seu email.
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    {inputRefs.map((ref, index) => (
                                        <TextField
                                            key={index}
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            type="text"
                                            inputProps={{
                                                maxLength: 1,
                                                style: { textAlign: 'center' },
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*'
                                            }}
                                            sx={{ width: '60px', mx: 1 }}
                                            onChange={handleInputChange(index)}
                                            onKeyDown={handleKeyDown(index)}
                                            inputRef={ref}
                                        />
                                    ))}
                                </Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ mt: 2 }}
                                >
                                    Validar Código
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Validate;
