import React, { useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import type { LoginData, RegisterData, User } from '../types/userTypes';
import { userApi } from '../services/userServices';
import { AuthContext } from './authContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // Lógica para verificar token
                }
            } catch {
                localStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (data: LoginData) => {
        setIsLoading(true);
        try {
            const userData = await userApi.login(data);
            setUser(userData);
            localStorage.setItem('token', userData.token);
            toast.success('¡Bienvenido!');
            navigate('/');
        } catch (error) {
            toast.error('Credenciales incorrectas');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        try {
            const userData = await userApi.register(data);
            setUser(userData);
            localStorage.setItem('token', userData.token);
            toast.success('¡Registro exitoso!');
            navigate('/');
        } catch (error) {
            toast.error('Error al registrarse');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        toast.success('Sesión cerrada');
        navigate('/login');
    };

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};