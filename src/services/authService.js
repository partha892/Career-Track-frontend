import api from "./api";

// Register
export const registerUser = async (userData) => {
    const response = await api.post("/user/signup", userData);
    return response.data;
};

// Login
export const loginUser = async (userData) => {
    const response = await api.post("/user/login", userData);
    return response.data;
};

// Logout
export const logoutUser = async () => {
    const response = await api.get("/user/logout");
    return response.data;
};

// Get Profile
export const getProfile = async () => {
    const response = await api.get("/user/profile");
    return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
    const response = await api.post("/user/forgot", { email });
    return response.data;
};

// Reset Password
export const resetPassword = async (token, password) => {
    const response = await api.post(`/user/reset/${token}`, { password });
    return response.data;
};