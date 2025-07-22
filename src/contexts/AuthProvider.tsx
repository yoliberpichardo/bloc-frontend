import { useState, useEffect, type ReactNode, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "./authContext";
import type { LoginData, RegisterData, User } from "../types/userTypes";
import { userApi } from "../services/userServices";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async (): Promise<void> => {
            try {
                const token: string | null = localStorage.getItem("token");
                if (token) {
                    const userData: User = await userApi.verifyToken(token);
                    setUser(userData);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error("Error verifying token:", error.message);
                }
                localStorage.removeItem("token");
            } finally {
                setIsLoading(false);
            }
        };

        void checkAuth();
    }, []);

    const login = async (data: LoginData): Promise<void> => {
        setIsLoading(true);
        try {
            const response: { user: User; token: string } = await userApi.login(data);
            setUser(response.user);
            localStorage.setItem("token", response.token);
            toast.success("¡Bienvenido!");
            navigate("/");
        } catch (error: unknown) {
            let errorMessage = "Credenciales incorrectas";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData): Promise<void> => {
        setIsLoading(true);
        try {
            const response: { user: User; token: string } = await userApi.register(data);
            setUser(response.user);
            localStorage.setItem("token", response.token);
            toast.success("¡Registro exitoso!");
            navigate("/");
        } catch (error: unknown) {
            let errorMessage = "Error al registrarse";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = (): void => {
        setUser(null);
        localStorage.removeItem("token");
        toast.success("Sesión cerrada");
        navigate("/login");
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};