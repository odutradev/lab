import { useState } from 'react';

import Validate from './components/validate';
import { ResetPasswordState } from './types';
import Request from './components/request';
import Reset from './components/reset';

const ResetPassword = () => {
    const [state, setState] = useState<ResetPasswordState>({ email: '', step: 'request', password: '', code: ''});

    switch(state.step){
        case'request':
            return <Request state={state} setState={setState}/>
        case'validate':
            return <Validate state={state} setState={setState}/>
        case'reset':
            return <Reset state={state} setState={setState}/>
    }
};

export default ResetPassword;