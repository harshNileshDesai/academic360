import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.auth);
    
    useEffect(() => {
        if (!auth) {
            navigate('/', { replace: true });
        }
    }, [auth]);

    return jwtDecode(auth);
}