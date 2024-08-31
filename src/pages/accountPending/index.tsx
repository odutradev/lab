import { Box, Typography } from '@mui/material';

const AccountPending = () => {

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
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ffc107', mb: 2 }}>
        Solicitação em Análise
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#6c757d' }}>
        Sua solicitação de acesso ao sistema está sendo analisada. Você receberá um e-mail assim que sua conta for aprovada ou reprovada.
      </Typography>
    </Box>
  );
};

export default AccountPending;
