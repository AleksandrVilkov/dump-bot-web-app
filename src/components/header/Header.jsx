import React from 'react';
import Button from "../button/Button.jsx";

const Header = () => {
    const tg = window.Telegram.WebApp

    //Кнопка, закрывающая приложение
    const onClose = () => {
        tg.close()
    }
    return (
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataType?.user?.username}
            </span>
        </div>
    );
};

export default Header;