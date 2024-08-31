import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#fafafa' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, color: '#6c757d' }}>
        Oops! Página não encontrada
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{
          backgroundColor: '#007bff',
          '&:hover': {
            backgroundColor: '#0056b3',
          },
        }}
      >
        Voltar para o início
      </Button>
    </Box>
  );
};

export default Error;
