export interface ResetPasswordState {
    step: 'request' | 'validate' | 'reset';
    password?: string;
    email: string;
    code?: string;
};