import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { getUser } from '../../actions/user';

const AccountBlocked = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getUser();
      if ('error' in response) return;
      if (response.status != 'blocked') navigate('/')
    })()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#dc3545', mb: 2 }}>
        Conta Bloqueada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#6c757d' }}>
        Sua conta foi bloqueada por um administrador. Se você acredita que isso é um erro, entre em contato com o suporte.
      </Typography>
    </Box>
  );
};

export default AccountBlocked;
