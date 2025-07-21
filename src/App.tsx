// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ListView } from './components/ListView';
import Navbar from './components/NavBar';
import EditCard from './components/EditCard';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ListView />} />
                <Route 
                    path="/edit/:id" 
                    element={<EditCard />} 
                />
            </Routes>
        </Router>
    );
}

export default App;