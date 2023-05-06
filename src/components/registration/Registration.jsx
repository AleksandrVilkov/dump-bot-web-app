import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css';
// import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import City from "../city/City.jsx";

const Registration = () => {

    // const {tg} = useTelegram()
    //
    // const onSendData = useCallback(() => {
    //     const data = {
    //         concern,
    //         brand,
    //         model,
    //         action: "SALE"
    //     }
    //     tg.sendData(JSON.stringify(data));
    // }, [concern, brand, model, engine])
    //
    // useEffect(() => {
    //     tg.onEvent("mainButtonClicked", onSendData)
    //     return () => {
    //         tg.offEvent("mainButtonClicked", onSendData)
    //     }
    // }, [onSendData])
    //
    // useEffect(() => {
    //     tg.MainButton.setParams({
    //         text: "Зарегистрироваться"
    //     })
    // }, [])

    return (
        <div className={"registration"}>
            <h3>Добро пожаловать! Давай пройдем простую регистрацию: </h3>
            <Car></Car>
            <City></City>
        </div>
    );
};

export default Registration;
