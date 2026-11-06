
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    loginUser,
    registerUser,
    logoutUser,
    getProfile
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check logged-in user
    const checkAuth = async () => {
        try {
            const response = await getProfile();
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (userData) => {
        const response = await loginUser(userData);
        setUser(response.data);
        return response;
    };

    // Register
    const register = async (userData) => {
        const response = await registerUser(userData);
        return response;
    };

    // Logout
    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};
