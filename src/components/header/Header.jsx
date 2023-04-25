import React from 'react';
import {useTelegram} from "../../hooks/useTelegram.js";
import './Header.css';
const Header = () => {
    const {user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <span className={'username'}>
                {"Привет," + user?.username + "!"}
            </span>
        </div>
    );
};

export default Header;