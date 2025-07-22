import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/AuthForm.css";
import { useAuth } from "../contexts";

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
        // Limpiar error al escribir
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
                <h2>{isLoginMode ? "Iniciar Sesión" : "Registrarse"}</h2>

                <form onSubmit={handleSubmit}>
                    {!isLoginMode && (
                        <div className="form-group">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Nombre completo"
                                disabled={isLoading}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Contraseña"
                            disabled={isLoading}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    {!isLoginMode && (
                        <div className="form-group">
                            <input
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirmar contraseña"
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <span className="error">{errors.confirmPassword}</span>
                            )}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Procesando..." : isLoginMode ? "Iniciar Sesión" : "Registrarse"}
                    </button>
                </form>

                <button type="button" onClick={toggleMode} className="toggle-button">
                    {isLoginMode
                        ? "¿No tienes cuenta? Regístrate"
                        : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;