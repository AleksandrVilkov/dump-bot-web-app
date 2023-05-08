import React, {useCallback, useEffect, useState} from 'react';
import './Registration.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import City from "../city/City.jsx";

const Registration = () => {
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [concern, setConcern] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [engine, setEngine] = useState('')

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            concern,
            brand,
            model,
            engine,
            country,
            city,
            action: "REGISTRATION"
        }
        tg.sendData(JSON.stringify(data));
    }, [concern, brand, model, engine, country, city])

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
        if (!concern || !brand || !model || !engine || !country || !city) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [concern, brand, model, engine, country, city])
    const handleConcern = (concern) => {
        setConcern(concern);
    }

    const handleBrand = (e) => {
        setBrand(e)
    }

    const handleModel = (e) => {
        setModel(e)
    }
    const handleEngine = (e) => {
        setEngine(e)
    }
    const handleCountry = (e) => {
        setCountry(e)
    }

    const handleCity = (e) => {
        setCity(e)
    }
    return (
        <div className={"registration"}>
            <h3>Добро пожаловать! Давай пройдем простую
                регистрацию: {concern} {brand} {model} {engine} {city} {country}</h3>
            <Car handleConcern={handleConcern}
                 handleBrand={handleBrand}
                 handleModel={handleModel}
                 handleEngine={handleEngine}/>
            <City handleCountry={handleCountry} handleCity={handleCity}/>
        </div>
    );
};

export default Registration;
