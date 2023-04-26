import React from 'react';
import {useTelegram} from "../../hooks/useTelegram.js";
import './Header.css';

const Header = () => {
    const {tg, user, onClose} = useTelegram();

    return (
        <div className={'header'}>
            <span className={'username'}>
                {/*{"Привет," + tg.initDataUnsafe.user.first_name + " " + tg.initDataUnsafe.user.last_name + "!"}*/}
            </span>
        </div>
    );
};

export default Header;