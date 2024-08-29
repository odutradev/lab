import { Logout, AccountCircle, PersonSearch, Home } from '@mui/icons-material';

import { MenuLink } from './types';

export const defaultLinks: MenuLink[] = [
    [<Home />, 'Visão Geral', '/dashboard'],
];

export const settingsLinks: MenuLink[] = [
    [<AccountCircle />, 'Minha conta', '/dashboard/profile'],
    [<Logout />, 'Sair', '/logout'],
];

export const adminLinks: MenuLink[] = [
    [<PersonSearch />, 'Usuários', '/dashboard/admin/users'],
];