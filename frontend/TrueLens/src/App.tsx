import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Dashboard from "./pages/dashboard";
import Prediction from "./pages/prediction";
import History from "./pages/history";
import About from "./pages/about";
import Profile from "./pages/profile";
import Signin from "./pages/sign_in";
import Signup from "./pages/sign_up";

import "./App.css";

function MainLayout() {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
}

function App() {
    return (
        <Routes>

            {/* Authentication Pages */}
            <Route path="/" element={<Signin />} />
            <Route path="/sign_in" element={<Signin />} />
            <Route path="/sign_up" element={<Signup />} />

            {/* Pages with Navbar & Footer */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/prediction" element={<Prediction />} />
                <Route path="/history" element={<History />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

        </Routes>
    );
}

export default App;