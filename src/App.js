import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram.js";
import {Route, Routes} from "react-router-dom";
import Sale from "./components/sale/Sale.jsx";
import Registration from "./components/registration/Registration.jsx";
import Search from "./components/search/Search.jsx";


function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <div className="App">
            <Routes>
                <Route path={'sale'} element={<Sale/>}/>
                <Route path={'registration'} element={<Registration/>}/>
                <Route path={'search'} element={<Search/>}/>
            </Routes>
        </div>
    );
}

export default App;