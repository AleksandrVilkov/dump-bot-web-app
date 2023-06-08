import React, {useCallback, useEffect, useState} from 'react';
import './Sale.css';
import {useTelegram} from "../../hooks/useTelegram.js";
import Car from "../car/Car.jsx";
import Description from "../description/Description.jsx";

const Sale = () => {
    const [cars, setCars] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    const handlePrice = (e) => {
        setPrice(e)
    }
    const handleDescription = (e) => {
        setDescription(e)
    }

    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            cars,
            price,
            description,
            action: "SALE"
        }
        tg.sendData(JSON.stringify(data));
    }, [cars, price, description])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Продать"
        })
    }, [])

    const handleCars = (e) => {
        setCars(e)
    }
    //Валидация кнопки
    useEffect(() => {
        if (!price || !description || !cars) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }

    }, [cars, price, description])

    return (
        <div className={"sale"}>
            <h3>Заявка на продажу заппчасти:</h3>
            <Car handleCars={handleCars}/>
            <Description needPrice={true} handlePrice={handlePrice} handleDescription={handleDescription}/>
        </div>
    );
};

export default Sale;