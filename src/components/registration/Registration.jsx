import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import City from "../city/City.jsx";

const Registration = () => {
    const [cityId, setCityId] = useState('')
    const [carId, setCarId] = useState('')

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {

        const data = {
            cityId,
            carId,
            action: "REGISTRATION"
        }
        tg.sendData(JSON.stringify(data));
    }, [carId, cityId])

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
        if (!cityId || !carId) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [carId, cityId])

    const handleCityId = (e) => {
        setCityId(e)
    }
    const handleCarId = (e) => {
        setCarId(e)
    }

    return (
        <div className={"registration"}>
            <h3>Добро пожаловать! Давай пройдем простую
                регистрацию: {cityId} {carId}</h3>
            <Car handleCarId={handleCarId}/>
            <City handleCityId={handleCityId}/>
        </div>
    );
};

export default Registration;
