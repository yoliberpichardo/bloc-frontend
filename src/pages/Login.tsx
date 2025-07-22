import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts";
import "../styles/AuthForm.css";

interface FormData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    password?: string;
    name?: string;
    confirmPassword?: string;
}

const AuthForm = ({ initialMode = "login" }: { initialMode?: "login" | "register" }) => {
    const [isLoginMode, setIsLoginMode] = useState(initialMode === "login");
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const navigate = useNavigate();
    const { isAuthenticated, login, register, isLoading } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = "Email es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email no válido";
        }

        if (!formData.password) {
            newErrors.password = "Contraseña es requerida";
        } else if (formData.password.length < 6) {
            newErrors.password = "Mínimo 6 caracteres";
        }

        if (!isLoginMode) {
            if (!formData.name) {
                newErrors.name = "Nombre es requerido";
            }
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Las contraseñas no coinciden";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (isLoginMode) {
                await login({ email: formData.email, password: formData.password });
                toast.success("Bienvenido de vuelta!");
            } else {
                await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
                toast.success("Cuenta creada con éxito!");
            }
        } catch (error) {
            let errorMessage = "Error al autenticar";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setFormData({
            email: "",
            password: "",
            name: "",
            confirmPassword: ""
        });
        setErrors({});
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">
                        {isLoginMode ? "Iniciar Sesión" : "Crear Cuenta"}
                    </h2>
                    <p className="auth-subtitle">
                        {isLoginMode ? "Accede a tu cuenta" : "Únete a nuestra comunidad"}
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <div className="form-group">
                            <input
                                name="name"
                                type="text"
                                autoComplete="name"
                                required={!isLoginMode}
                                className="form-input"
                                placeholder="Nombre completo"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="form-input"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            name="password"
                            type="password"
                            autoComplete={isLoginMode ? "current-password" : "new-password"}
                            required
                            className="form-input"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    {!isLoginMode && (
                        <div className="form-group">
                            <input
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required={!isLoginMode}
                                className="form-input"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <span className="error">{errors.confirmPassword}</span>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner" aria-hidden="true"></span>
                                {isLoginMode ? "Iniciando sesión..." : "Creando cuenta..."}
                            </>
                        ) : (
                            isLoginMode ? "Iniciar Sesión" : "Registrarse"
                        )}
                    </button>

                    <div className="auth-footer">
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="auth-toggle"
                        >
                            {isLoginMode
                                ? "¿No tienes cuenta? Regístrate aquí"
                                : "¿Ya tienes cuenta? Inicia sesión aquí"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;