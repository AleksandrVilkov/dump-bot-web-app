import React, {useEffect} from 'react';
import './Menu.css';

const Menu = () => {

    return (
        <div className={"menu"}>
            <h3>Ты находишься в главном меню</h3>
            <button>Найти</button>
            <button>Продать</button>
            <button>Правила</button>
        </div>
    );
};

export default Menu;