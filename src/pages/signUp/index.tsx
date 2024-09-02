import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect} from 'react';

import { BackgroudCover, Image, FormContainer, CustomPaper, FullHeightGrid } from './styles';
import { ISignUpData, signUp } from '../../actions/user';
import useHasAuth from '../../hooks/useHasAuth';
import cover from '../../assets/imgs/cover.png';
import lite from '../../assets/imgs/lite.svg';
import useAction from '../../hooks/useAction';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form: ISignUpData = {
      email: data.get('email') as string,
      name: data.get('name') as string,
      password: data.get('password') as string,
    };

    useAction({
      action: async () => await signUp(form),
      callback: () => {
        const checkToken = setInterval(() => {
          const token = localStorage.getItem('token');
          if (token) {
            clearInterval(checkToken);
            navigate('/dashboard');
          }
        }, 500);
      },
      toastMessages: {
        pending: 'Efetuando autenticação',
        success: 'Autenticação bem-sucedida',
        error: 'Erro na autenticação'
      }
    });
  };

useEffect(() => {
  useHasAuth();
},[])

  return (
    <FullHeightGrid>
      <Grid container component="main" sx={{ height: '100%' }}>
        <Grid item xs={false} md={7}>
          <BackgroudCover src={cover} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={CustomPaper} elevation={6} square>
          <FormContainer>
            <Image src={lite} />
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="nome"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                CADASTRAR
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="signin" variant="body2">
                    {"Já tem uma conta? Entre!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </FormContainer>
        </Grid>
      </Grid>
    </FullHeightGrid>
  );
};

export default SignUp;