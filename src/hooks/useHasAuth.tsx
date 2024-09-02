const useHasAuth = () => {
    const token = localStorage.getItem('token');
    if (token){
        window.location.href = '/'; 
    } else {
        return;
    }
};

export default useHasAuth;