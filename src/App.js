import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram.js";
import Header from "./components/header/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Menu from "./components/menu/Menu.jsx";
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
            <Header/>
            <Routes>
                <Route index element={<Menu/>}/>
                <Route path={'sale'} element={<Sale/>}/>
                <Route path={'registration'} element={<Registration/>}/>
                <Route path={'search'} element={<Search/>}/>
            </Routes>
        </div>
    );
}

export default App;