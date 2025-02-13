import { useState } from 'react';

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { LoginPage,SignupPage,ActivationPage } from './routes/Routes' 

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/activation/:Activation_Token" element={<ActivationPage />} />
            </Routes>
        </>
    );
}

export default App;
