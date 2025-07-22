// AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ListView } from '../pages/ListView';
import EditCard from './EditCard';
import AuthForm from '../pages/Login';
import Home from '../pages/Home';
import AddCard from './AddCard';
import { CardProvider } from '../contexts/CardProvider';

export const AppRoutes = () => {
    return (
        <CardProvider>
            <Routes>
                <Route path="/login" element={<AuthForm initialMode="login" />} />
                <Route path="/register" element={<AuthForm initialMode="register" />} />

                <Route element={<Home />}>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<ListView />} />
                        <Route path="/create" element={<AddCard />} />
                        <Route path="/edit/:id" element={<EditCard />} />
                    </Route>
                </Route>
            </Routes>
        </CardProvider>
    );
};