import { Box, CircularProgress, Typography } from '@mui/material';

import { LoadingProps } from './types';

const Loading = ({ showSpinner = true, message = "Loading..." } : LoadingProps) => {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
        zIndex: 2,
        left: 0,
        top: 0,
      }}
    >
      {showSpinner && <CircularProgress />}
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;