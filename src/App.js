import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram.js";
import Header from "./components/header/Header.jsx";


function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
        },[])

    return (
        <div className="App">
           <Header />
            <button onClick={onToggleButton}>toggle</button>
        </div>
    );
}

export default App;