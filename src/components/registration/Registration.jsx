import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import City from "../city/City.jsx";

const Registration = () => {
    const [city, setCity] = useState('')
    const [car, setCar] = useState('')

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {

        const data = {
            city,
            car,
            action: "REGISTRATION"
        }
        tg.sendData(JSON.stringify(data));
    }, [car])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Зарегистрироваться"
        })
    }, [])

    useEffect(() => {
        if (!car || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [car, city])

    const handleCity = (e) => {
        setCity(e)
    }
    const handleCar = (e) => {
        setCar(e)
    }

    return (
        <div className={"registration"}>
            <h3>Добро пожаловать! Давай пройдем простую
                регистрацию: {car}</h3>
            <Car handleCar={handleCar}/>
            <City handleCity={handleCity}/>
        </div>
    );
};

export default Registration;
