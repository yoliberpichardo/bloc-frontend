import React, { useState, useEffect, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { userApi } from '../services/userServices';
import type { RegisterData } from '../types/userTypes';
import { useAuth } from '../contexts/useAuth';

interface AuthFormProps {
    initialMode?: 'login' | 'register';
}

const AuthForm: FC<AuthFormProps> = ({ initialMode = 'login' }) => {
    const [isLoginMode, setIsLoginMode] = useState(initialMode === 'login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({ email: formData.email, password: formData.password });
            toast.success('¡Inicio de sesión exitoso!');
            navigate('/');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            const userData: RegisterData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            await userApi.register(userData);
            toast.success('¡Registro exitoso! Iniciando sesión...');
            await login({ email: formData.email, password: formData.password });
            navigate('/');
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            const errorMessage = err.response?.data?.message || 'Error al registrarse';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = isLoginMode ? handleLogin : handleRegister;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">
                        {isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}
                    </h2>
                    <p className="auth-subtitle">
                        {isLoginMode ? 'Accede a tu cuenta' : 'Únete a nuestra comunidad'}
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <div className="form-group">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required={!isLoginMode}
                                className="form-input"
                                placeholder="Nombre completo"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="form-input"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete={isLoginMode ? "current-password" : "new-password"}
                            required
                            className="form-input"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="form-group">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required={!isLoginMode}
                                className="form-input"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="auth-button"
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner" aria-hidden="true"></span>
                                {isLoginMode ? 'Iniciando sesión...' : 'Creando cuenta...'}
                            </>
                        ) : (
                            isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'
                        )}
                    </button>

                    <div className="auth-footer">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="auth-toggle"
                        >
                            {isLoginMode
                                ? '¿No tienes cuenta? Regístrate aquí'
                                : '¿Ya tienes cuenta? Inicia sesión aquí'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;