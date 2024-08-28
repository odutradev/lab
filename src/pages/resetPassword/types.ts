import { Dispatch, SetStateAction } from 'react';

export interface ResetPasswordState {
    step: 'request' | 'validate' | 'reset';
    password?: string;
    email: string;
    code?: string;
};

export interface ResetPasswordStepProps {
    setState: Dispatch<SetStateAction<ResetPasswordState>>; 
    state: ResetPasswordState;
};
