import { Logout, AccountCircle, PersonSearch, Home, Checklist, Apps } from '@mui/icons-material';
import { MenuLink } from './types';

export const defaultLinks: MenuLink[] = [
    [<Home />, 'Visão Geral', '/dashboard'],
];

export const settingsLinks: MenuLink[] = [
    [<AccountCircle />, 'Minha conta', '/dashboard/profile'],
    [<Apps />, 'Espaços', '/dashboard/spaces'],
    [<Logout />, 'Sair', '/logout'],
];

export const adminLinks: MenuLink[] = [
    [<Checklist />, 'Solicitações', '/dashboard/admin/requests'],
    [<PersonSearch />, 'Usuários', '/dashboard/admin/users'],
];