import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ListView } from './ListView';
import { CardProvider } from '../contexts/CardProvider';
import EditCard from './EditCard';
import AuthForm from './Login';

export const AppRoutes = () => {
    return (
        <CardProvider>
            <Routes>
                <Route path="/login" element={<AuthForm initialMode="login" />} />
                <Route path="/register" element={<AuthForm initialMode="register" />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<ListView />} />
                    <Route path="/edit/:id" element={<EditCard />} />
                </Route>
            </Routes>
        </CardProvider>
    );
};