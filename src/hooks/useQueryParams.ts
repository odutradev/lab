import { useLocation } from "react-router-dom";

const useQueryParams = <T extends Record<string, string>>() => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    return Object.fromEntries(params) as T;
};

export default useQueryParams;
