import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { IndexPage } from "./pages/IndexPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
