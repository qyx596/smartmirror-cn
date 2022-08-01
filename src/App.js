import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Dev from "./pages/Dev";


function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/dev"} element={<Dev />}/>
        </Routes>
    );
}

export default App;
