import { useNavigate } from "react-router-dom";

const useHasAuth = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    if (token){
        navigate('/');
    } else {
        return;
    }
};

export default useHasAuth;