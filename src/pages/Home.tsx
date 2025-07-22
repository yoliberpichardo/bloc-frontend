import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Home = () => {
    return (
        <div className="app-container">
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Home;