
import Home from "./Home/Home.jsx";
import Order from "./Order/Order.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/order" element={<Order />}/>
        </Routes>
    </BrowserRouter>
    );
}

export default App;