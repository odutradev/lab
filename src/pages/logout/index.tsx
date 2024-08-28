import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Loading from '../../components/loading';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            localStorage.clear();
            navigate('/')
        }, 750)
    },[])
    return (
       <Loading message='Deslogando usuario.'/>
    )
}

export default Logout