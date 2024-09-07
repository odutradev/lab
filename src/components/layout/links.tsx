import { Logout, AccountCircle, PersonSearch, Home, Checklist, Apps, List } from '@mui/icons-material';
import { MenuLink } from './types';

export const defaultLinks: MenuLink[] = [
    [<Home />, 'Visão Geral', '/dashboard'],
    [<Apps />, 'Espaços', '/dashboard/spaces'],
];
export const routineLinks: MenuLink[] = [
    [<List />, 'Tarefas', '/dashboard/tasks'],
];

export const settingsLinks: MenuLink[] = [
    [<AccountCircle />, 'Minha conta', '/dashboard/profile'],
    [<Logout />, 'Sair', '/logout'],
];

export const adminLinks: MenuLink[] = [
    [<Checklist />, 'Solicitações', '/dashboard/admin/requests'],
    [<PersonSearch />, 'Usuários', '/dashboard/admin/users'],
];