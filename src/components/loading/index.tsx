import { CircularProgress, Typography } from '@mui/material';

import { LoadingProps } from './types';
import { Container } from './styles';

const Loading = ({ showSpinner = true, message = "Loading..." } : LoadingProps) => {
  return (
    <Container>
      {showSpinner && <CircularProgress />}
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Container>
  );
};

export default Loading;