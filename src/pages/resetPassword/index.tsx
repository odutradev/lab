import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';


import useUserStore from '../../store/user';
import Request from './components/request';
import { ResetPasswordState } from './types';
import Validade from './components/validate';
import Reset from './components/reset';

const ResetPassword = () => {
    const [state, setState] = useState<ResetPasswordState>({ email: '', step: 'request', password: '', code: ''});

    const { setUser } = useUserStore(x => x);
    const navigate = useNavigate();

    switch(state.step){
        case'request':
            return <Request state={state} setState={setState}/>
        case'validate':
            return <Validade state={state} setState={setState}/>
        case'reset':
            return <Reset state={state} setState={setState}/>
    }
};

export default ResetPassword;